import * as React from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import TextResponseProblem from './TextResponseProblem/TextResponseProblem';
import { IPMState } from '../../reducers';
import { IProblem, IProblemType } from '../../model';

const Problem = ({ problem, dispatch, isAdmin, index }) => {
  const { problemType } = problem;

  const elementRef: React.Ref<HTMLDivElement> = React.createRef();

  const doDeleteProblem = () => {};
  const doHideProblem = () => {};
  const doShowProblem = () => {};
  const doMoveProblemUp = () => {};
  const doMoveProblemDown = () => {};

  let problemDisplay: JSX.Element | null = null;
  if (problemType === IProblemType.TextResponse) {
    problemDisplay = <TextResponseProblem index={index} problem={problem} />;
  }

  return <div>{problemDisplay}</div>;
};

function mapStateToProps(state: IPMState, ownProps) {
  const { users } = state;
  const { problem } = ownProps;
  const { isAdmin } = users;

  return update(ownProps, {
    $merge: {
      isAdmin
    }
  });
}
export default connect(mapStateToProps)(Problem);
