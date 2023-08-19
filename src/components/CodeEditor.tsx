import * as CodeMirror from 'codemirror';
import * as React from 'react';
import 'codemirror/lib/codemirror.css';
import PuzzleDocInstance from '../createdoc';
import store from '../store';
import { CodemirrorBinding } from 'y-codemirror';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import uuid from '../utils/uuid';

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
  ydoc: any;
  provider: any;
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
    value: '*',
    selectOnFocus: false,
    captureTabs: true,
    addproblemdescription: false,
    index: -1,
    ydoc: null,
    provider: null
  };
  private codeMirror!: CodeMirror.EditorFromTextArea;
  private codeNode!: HTMLTextAreaElement;

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
    const ytext = this.props.ydoc.getText(this.props.index.toString());
    const binding = new CodemirrorBinding(
      ytext,
      this.codeMirror,
      this.props.provider.awareness
    );
  }
  editorcontent: string = PuzzleDocInstance.getProblemDescription(
    this.props.index
  );
  handleEditorChange = () => {
    this.editorcontent = this.codeMirror.getValue();
    if (this.props.addproblemdescription === true) {
      PuzzleDocInstance.submitProblemDescription(
        this.editorcontent,
        this.props.index
      );
    }
  };

  render(): React.ReactNode {
    const containerStyle = { border: '1px solid #000' };
    return (
      <div style={containerStyle}>
        <textarea
          ref={(ref: HTMLTextAreaElement) => (this.codeNode = ref)}
          defaultValue={this.editorcontent}
          autoComplete="off"
        />
      </div>
    );
  }
}
