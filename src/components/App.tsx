import * as reactRedux from 'react-redux';
import * as React from 'react';
import { IPMState } from '../reducers';
import UserHeader from './UserHeader/UserHeader';
import Problems from './Problems/Problems';
import { Problem } from '../model';

interface IPMAppOwnProps {}
interface IPMAppProps extends IPMAppOwnProps {}

const PMApplication = ({}: IPMAppProps): React.ReactElement => {
  return (
    <div className="container">
      <UserHeader />
      <Problems />
    </div>
  );
};

function mapStateToProps(state: IPMState) {
  return {};
}
export const App = reactRedux.connect(mapStateToProps)(PMApplication);
