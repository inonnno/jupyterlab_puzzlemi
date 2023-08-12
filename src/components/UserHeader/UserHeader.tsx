import { connect } from 'react-redux';
import * as React from 'react';
import { setIsAdmin } from '../../actions/users_actions';
import { IPMState } from '../../reducers';

interface IUserHeaderOwnProps {}

interface IUserHeaderProps extends IUserHeaderOwnProps {
  isAdmin: boolean;
  dispatch: React.Dispatch<any>;
}

const PMUserHeader = ({
  isAdmin,
  dispatch
}: IUserHeaderProps): React.ReactElement => {
  const handleEditChange = (event: any) => {
    const checked = event.target.checked;
    dispatch(setIsAdmin(checked));
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

  return (
    <div className="container">
      <span className="nav-item">{editButton}</span>
    </div>
  );
};

const mapStateToProps = (state: IPMState) => {
  return {
    isAdmin: state.users.isAdmin
  };
};
export default connect(mapStateToProps)(PMUserHeader);
