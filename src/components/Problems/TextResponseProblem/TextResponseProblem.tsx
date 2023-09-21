import * as React from 'react';
import { connect } from 'react-redux';
import ProblemDescription from '../ProblemDescription';
import update from 'immutability-helper';
import { CodeEditor } from '../../CodeEditor';
import { IPMState } from '../../../reducers';
import { Dispatch } from 'redux';
import { IProblem, ExampleDoc } from '../../../model';
import PuzzleDocInstance from '../../../createdoc';

interface ITextResponseProblemOwnProps {
  problem: IProblem;
}
interface ITextResponseProblemProps extends ITextResponseProblemOwnProps {
  response: string;
  isAdmin: boolean;
  claimFocus: boolean;
  dispatch: Dispatch<any>;
  problemsDoc: ExampleDoc;
  index: number;
}

const TextResponseProblem = ({
  problem,
  response,
  problemsDoc,
  dispatch,
  isAdmin,
  index
}: ITextResponseProblemProps) => {
  return (
    <>
      <ProblemDescription index={index} problem={problem} />
    </>
  );
};
function mapStateToProps(state: IPMState, ownProps) {
  const { users } = state;
  const { isAdmin } = users;
  const { problem } = ownProps;
  const problemsDoc = PuzzleDocInstance.get('problems');

  return update(ownProps, {
    $merge: { isAdmin, problemsDoc }
  });
}
export default connect(mapStateToProps)(TextResponseProblem);
