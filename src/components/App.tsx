import * as reactRedux from 'react-redux';
import * as React from 'react';
import { setIsAdmin } from '../actions/users_actions';
import { addTextResponseProblem } from '../actions/sharedjson_actions';
import { IPMState } from '../reducers';
import { Problem } from '../model';
import { CodeEditor } from './CodeEditor';
import { PuzzleDocModel } from '../model';

interface IPMAppOwnProps {}
interface IPMAppProps extends IPMAppOwnProps {
  isAdmin: boolean;
  dispatch: React.Dispatch<any>;
  content: PuzzleDocModel;
  displayed_problems: Problem[];
}

const PMApplication = ({
  isAdmin,
  dispatch,
  content,
  displayed_problems
}: IPMAppProps): React.ReactElement => {
  const handleEditChange = (event: any) => {
    const checked = event.target.checked;
    dispatch(setIsAdmin(checked));
  };

  const doAddTextResponseProblem = (): void => {
    dispatch(addTextResponseProblem());
    console.log('doAddTextResponseProblem');
  };

  const editButton = (
    <div className="custom-control custom-switch">
      <input
        id="admin-mode"
        type="checkbox"
        className="custom-control-input"
        onChange={handleEditChange}
        checked={isAdmin}
      />
      <label htmlFor="admin-mode" className="custom-control-label">
        Admin Mode
      </label>
    </div>
  );
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
      {displayed_problems.map((problem, index) => (
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
      <span className="nav-item">{editButton}</span>
      <div className="problems">
        {displayed_problems && displayed_problems.length ? (
          <DisplayProblems />
        ) : (
          <div className="container no-problems">(no problems yet)</div>
        )}
      </div>
      {isAdmin ? <div>{AdminPage}</div> : <p>{NoneAdminPage}</p>}
    </div>
  );
};

const mapStateToProps = (state: IPMState) => {
  return {
    isAdmin: state.users.isAdmin,
    PuzzleDoc: state.shareJSONDocs.PuzzleDoc
  };
};
export const App = reactRedux.connect(mapStateToProps)(PMApplication);
