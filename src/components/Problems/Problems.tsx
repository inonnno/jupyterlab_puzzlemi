import { connect } from 'react-redux';
import * as React from 'react';
import { addTextResponseProblem } from '../../actions/sharedjson_actions';
import { IPMState } from '../../reducers';
import { Problem } from '../../model';
import { CodeEditor } from '../CodeEditor';
import { PuzzleDocModel } from '../../model';
import ProblemDescription from './ProblemDescription';
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
  const problem = [];
  const doAddTextResponseProblem = (): void => {
    dispatch(addTextResponseProblem());
    console.log('doAddTextResponseProblem');
  };

  const DisplayProblems = () => (
    <div>
      {problems.map((problem, index) => (
        <div key={index}>
          <ProblemDescription problem={problem} index={index} />
        </div>
      ))}
    </div>
  );
  return (
    <div className="container">
      <div className="problems">
        {problems && problems.length ? (
          <div>
            <DisplayProblems />
          </div>
        ) : (
          <div className="container no-problems">(no problems yet)</div>
        )}
      </div>
      {isAdmin ? (
        <div>
          <button
            className="btn btn-outline-success btn-sm"
            onClick={doAddTextResponseProblem}
          >
            <i className="fas fa-plus"></i> Text Response Question
          </button>
        </div>
      ) : (
        <div></div>
      )}
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
