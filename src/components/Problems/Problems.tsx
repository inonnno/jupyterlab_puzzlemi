import { connect } from 'react-redux';
import * as React from 'react';
import { addTextResponseProblem } from '../../actions/sharedjson_actions';
import { IPMState } from '../../reducers';
import { Problem } from '../../model';
import { CodeEditor } from '../CodeEditor';
import { PuzzleDocModel } from '../../model';

interface IProblemsOwnProps {}
interface IProblemsProps extends IProblemsOwnProps {
  isAdmin: boolean;
  dispatch: React.Dispatch<any>;
  problems: Problem[];
}

const Problems = ({
  isAdmin,
  dispatch,
  problems
}: IProblemsProps): React.ReactElement => {
  const doAddTextResponseProblem = (): void => {
    dispatch(addTextResponseProblem());
    console.log('doAddTextResponseProblem');
  };

  const AdminPage = (
    <div>
      <button
        className="btn btn-outline-success btn-sm"
        onClick={doAddTextResponseProblem}
      >
        <i className="fas fa-plus"></i> Text Response Question
      </button>
    </div>
  );
  const DisplayProblems = () => (
    <div>
      {problems.map((problem, index) => (
        <div key={index}>
          {!isAdmin ? (
            <div>
              {problem.question}
              <CodeEditor value="*type in answer here*" />
            </div>
          ) : (
            <div>
              <CodeEditor value="*type in question here*" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
  const NoneAdminPage = <div></div>;

  return (
    <div className="container">
      <div className="problems">
        {problems && problems.length ? (
          <DisplayProblems />
        ) : (
          <div className="container no-problems">
            (no problems yet)
            <DisplayProblems />
          </div>
        )}
      </div>
      {isAdmin ? <div>{AdminPage}</div> : <div>{NoneAdminPage}</div>}
    </div>
  );
};

const mapStateToProps = (state: IPMState) => {
  return {
    isAdmin: state.users.isAdmin,
    PuzzleDoc: state.shareJSONDocs.PuzzleDoc,
    problems: state.shareJSONDocs.PuzzleDoc.get('problems')
  };
};
export default connect(mapStateToProps)(Problems);
