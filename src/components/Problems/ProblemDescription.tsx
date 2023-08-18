import * as React from 'react';
import { connect } from 'react-redux';
import * as showdown from 'showdown';
import { CodeEditor } from '../CodeEditor';
import update from 'immutability-helper';
import { IPMState } from '../../reducers';
import { Problem, ExampleDoc } from '../../model';

interface IProblemDescriptionOwnProps {
  problem: Problem;
  index: number;
}
interface IProblemDescriptionProps extends IProblemDescriptionOwnProps {
  isAdmin: boolean;
  description: string;
  problemsDoc: ExampleDoc;
}
const ProblemDescription = ({
  problem,
  isAdmin,
  description,
  index
}: IProblemDescriptionProps): React.ReactElement => {
  if (isAdmin) {
    const p = ['allProblems', problem.id, 'problemDetails', 'description'];
    return (
      <div className="row">
        <div className="col problem-description">
          <CodeEditor addproblemdescription={true} index={index} />
        </div>
      </div>
    );
  } else {
    const converter = new showdown.Converter();
    const problemDescription = { __html: converter.makeHtml(description) };
    return (
      <div className="row">
        <div className="col problem-description">
          <p dangerouslySetInnerHTML={problemDescription} />
        </div>
      </div>
    );
  }
};

function mapStateToProps(
  state: IPMState,
  givenProps: IProblemDescriptionOwnProps
): IProblemDescriptionProps {
  const { problem } = givenProps;
  const { users, shareJSONDocs } = state;
  const { isAdmin } = users;
  const problemsDoc = shareJSONDocs.PuzzleDoc!;
  const problems = shareJSONDocs.problems!;

  const description = problem.description;

  return update(givenProps, {
    $merge: { isAdmin, problemsDoc, description } as any
  }) as IProblemDescriptionProps;
}

export default connect(mapStateToProps)(ProblemDescription);
