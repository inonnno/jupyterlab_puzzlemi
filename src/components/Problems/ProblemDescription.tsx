import * as React from 'react';
import { connect } from 'react-redux';
import * as showdown from 'showdown';
import { CodeEditor } from '../CodeEditor';
import update from 'immutability-helper';
import { IPMState } from '../../reducers';
import { IProblem, ExampleDoc } from '../../model';
import PuzzleDocInstance from '../../createdoc';
import * as Y from 'yjs';
import {
  updateProblemDescription,
  updateProblems
} from '../../actions/sharedjson_actions';

interface IProblemDescriptionOwnProps {
  problem: IProblem;
  index: number;
}
interface IProblemDescriptionProps extends IProblemDescriptionOwnProps {
  isAdmin: boolean;
  description: string;
  problemsDoc: ExampleDoc;
  dispatch: React.Dispatch<any>;
}
const index = -1;
const ProblemDescription = ({
  problem,
  isAdmin,
  description,
  dispatch,
  index
}: IProblemDescriptionProps): React.ReactElement => {
  index = index;
  const ydoc: Y.Doc = PuzzleDocInstance.getYdoc();
  const ymap = PuzzleDocInstance.getYmap();
  React.useEffect(() => {
    const problems = ymap.toJSON();
    const handleChange = event => {
      const descrip = PuzzleDocInstance.getProblemDescription(index);
      console.log('handleChange description descrip', description, descrip);
      dispatch(updateProblemDescription(descrip, index));
    };
    ymap.observe(handleChange);
    return () => {
      ymap.unobserve(handleChange);
    };
  }, []);
  if (isAdmin) {
    const provider = PuzzleDocInstance.getProvider();
    return (
      <div className="row">
        <div className="col problem-description">
          <div>{description}</div>
          <CodeEditor
            addproblemdescription={true}
            index={index}
            ydoc={ydoc}
            provider={provider}
            ymap={ymap}
          />
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
  const { problem, index } = givenProps;
  const { users, shareJSONDocs } = state;
  const { isAdmin } = users;
  const problemsDoc = shareJSONDocs.PuzzleDoc!;
  const problems = shareJSONDocs.problems!;
  let description = '';
  if (problems && index !== -1 && problems[index]) {
    description = problems[index].description;
  } else {
    description = problem.description;
  }

  return update(givenProps, {
    $merge: { isAdmin, problemsDoc, description } as any
  }) as IProblemDescriptionProps;
}

export default connect(mapStateToProps)(ProblemDescription);
