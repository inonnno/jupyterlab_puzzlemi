import * as CodeMirror from 'codemirror';
import * as React from 'react';
import 'codemirror/lib/codemirror.css';
import PuzzleDocInstance from '../createdoc';
import store from '../store';
import { CodemirrorBinding } from 'y-codemirror';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import uuid from '../utils/uuid';
import { updateProblemDescription } from '../actions/sharedjson_actions';

export interface ICodeChangeEvent {
  value: string;
}
interface ICodeEditorProps {
  options?: any;
  value?: string;
  flag?: any;
  run?: () => void;
  onChange?: (e: ICodeChangeEvent) => void;
  refreshDoc?: any;
  focusOnMount?: boolean;
  selectOnFocus: boolean;
  captureTabs: boolean;
  addproblemdescription: boolean;
  index: number;
  ydoc: Y.Doc;
  provider: any;
  ymap: Y.Map<any>;
}

interface ICodeEditorState {
  code: string;
}
export class CodeEditor extends React.Component<
  ICodeEditorProps,
  ICodeEditorState
> {
  public static defaultProps: ICodeEditorProps = {
    options: {
      height: 60,
      indentUnit: 4,
      lineNumbers: false,
      lineWrapping: true,
      mode: 'python',
      viewportMargin: 50,
      width: 300,
      onChangeCallback: null,
      readOnly: false,
      autoRefresh: true
    },
    value: 'here is a new problem',
    selectOnFocus: false,
    captureTabs: true,
    addproblemdescription: false,
    index: -1,
    ydoc: PuzzleDocInstance.getYdoc(),
    provider: null,
    ymap: PuzzleDocInstance.getYmap()
  };
  private codeMirror!: CodeMirror.EditorFromTextArea;
  private codeNode!: HTMLTextAreaElement;
  private ytext: any;
  private binding: any;

  constructor(props = CodeEditor.defaultProps) {
    super(props);
    this.state = {
      code: this.props.value || ''
    };
  }

  componentDidMount(): void {
    this.codeMirror = CodeMirror.fromTextArea(
      this.codeNode,
      this.props.options
    );
    this.codeMirror.setSize(
      this.props.options.width,
      this.props.options.height
    );
    this.codeMirror.on('change', this.handleEditorChange);
    this.ytext = this.props.ydoc.getText(this.props.index.toString());
    this.binding = new CodemirrorBinding(
      this.ytext,
      this.codeMirror,
      this.props.provider.awareness
    );
    //this.props.ydoc.on('update', this.handleYDocUpdate);
  }
  editorcontent: string = PuzzleDocInstance.getProblemDescription(
    this.props.index
  );

  componentWillUnmount(): void {
    //this.props.ydoc.off('update', this.handleYDocUpdate);
    this.codeMirror.off('change', this.handleEditorChange);
  }

  handleEditorChange = () => {
    this.editorcontent = this.codeMirror.getValue();
    /*
    if (
      this.editorcontent !==
      PuzzleDocInstance.getProblemDescription(this.props.index)
    ) {
      store.dispatch(
        updateProblemDescription(this.editorcontent, this.props.index)
      );
    }
    */
    if (this.props.addproblemdescription === true) {
      PuzzleDocInstance.updateProblemDescription(
        this.editorcontent,
        this.props.index
      );
    }
    const descrip = this.props.ymap.get('problems');
    console.log('handleEditorChange', this.editorcontent, descrip);
  };
  /*
  handleYDocUpdate = (): void => {
    this.setState({ description: this.ytext.toString() });
  };
  */

  render(): React.ReactNode {
    const containerStyle = { border: '1px solid #000' };
    return (
      <div style={containerStyle}>
        <textarea
          ref={(ref: HTMLTextAreaElement) => (this.codeNode = ref)}
          defaultValue={this.state.code}
          autoComplete="off"
        />
      </div>
    );
  }
}
