import * as React from 'react';
import { connect } from 'react-redux';
import * as showdown from 'showdown';
import { CodeEditor } from '../CodeEditor';
import update from 'immutability-helper';
import { IPMState } from '../../reducers';
import { Problem, ExampleDoc } from '../../model';
import PuzzleDocInstance from '../../createdoc';
import * as Y from 'yjs';
import { updateProblemDescription } from '../../actions/sharedjson_actions';

interface IProblemDescriptionOwnProps {
  problem: Problem;
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
  const descrip = PuzzleDocInstance.getProblemDescription(index);
  React.useEffect(() => {
    console.log('useEffect', description);
    const handleChange = event => {
      if (descrip !== description)
        dispatch(updateProblemDescription(descrip, index));
    };
    ymap.observe(handleChange);
    return () => {
      ymap.unobserve(handleChange);
    };
  }, [ymap, description]);
  if (isAdmin) {
    const provider = PuzzleDocInstance.getProvider();
    return (
      <div className="row">
        <div className="col problem-description">
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
