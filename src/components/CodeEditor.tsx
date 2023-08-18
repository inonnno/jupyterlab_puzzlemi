import * as CodeMirror from 'codemirror';
import * as React from 'react';
import 'codemirror/lib/codemirror.css';
interface ICodeEditorProps {
  options?: any;
  value?: string;
  flag?: any;
  run?: () => void;
  refreshDoc?: any;
  focusOnMount?: boolean;
  selectOnFocus: boolean;
  captureTabs: boolean;
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
      height: 20,
      indentUnit: 4,
      lineNumbers: true,
      lineWrapping: true,
      mode: 'python',
      viewportMargin: 50,
      width: 300,
      onChangeCallback: null,
      readOnly: false,
      autoRefresh: true
    },
    value: '',
    selectOnFocus: false,
    captureTabs: true
  };
  private codeMirror!: CodeMirror.EditorFromTextArea;
  private codeNode!: HTMLTextAreaElement;

  constructor(props = CodeEditor.defaultProps) {
    super(props);
    this.state = {
      code: this.props.value || ''
    };
  }
  handleEditorChange(): void {
    console.log('editor changed');
  }
  componentDidMount(): void {
    this.codeMirror = CodeMirror(this.codeNode);
    //this.codeMirror.on('change', this.handleEditorChange);
  }

  render(): React.ReactNode {
    return (
      <div>
        <textarea
          ref={(ref: HTMLTextAreaElement) => (this.codeNode = ref)}
          defaultValue={this.props.value}
          autoComplete="off"
          style={{ width: '300px', height: '30px' }}
        />
      </div>
    );
  }
}
