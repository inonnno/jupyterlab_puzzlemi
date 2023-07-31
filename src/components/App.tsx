import * as reactRedux from 'react-redux';
import * as React from 'react';
import { setIsAdmin } from '../actions/users_actions';
//import { addTextResponseProblem } from '../actions/sharedjson_actions';
import { IPMState } from '../reducers';
import { Problem } from '../model';

interface IPMAppOwnProps {}
interface IPMAppProps extends IPMAppOwnProps {
  isAdmin: boolean;
  dispatch: React.Dispatch<any>;
  content: string;
  problems: Problem[];
}

const PMApplication = ({
  isAdmin,
  dispatch,
  content,
  problems
}: IPMAppProps): React.ReactElement => {
  const handleEditChange = (event: any) => {
    const checked = event.target.checked;
    dispatch(setIsAdmin(checked));
  };

  const doAddTextResponseProblem = (): void => {
    //dispatch(addTextResponseProblem());
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

  const NoneAdminPage = <div>{problems[1].id}</div>;

  return (
    <div className="container">
      <span className="nav-item">{editButton}</span>
      {isAdmin ? <div>{AdminPage}</div> : <p>{NoneAdminPage}</p>}
    </div>
  );
};

const mapStateToProps = (state: IPMState) => {
  return {
    isAdmin: state.users.isAdmin
  };
};
export const App = reactRedux.connect(mapStateToProps)(PMApplication);
