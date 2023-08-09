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
      height: 10,
      indentUnit: 4,
      lineNumbers: true,
      lineWrapping: true,
      mode: 'python',
      viewportMargin: 50,
      width: 10,
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

  constructor(props: any) {
    super(props);
    this.state = {
      code: this.props.value || ''
    };
  }

  componentDidMount(): void {
    this.codeMirror = CodeMirror(this.codeNode, this.props.options);
    this.codeMirror.setValue(this.state.code);
    this.codeMirror.setSize(
      this.props.options.width,
      this.props.options.height
    );
  }

  render(): React.ReactNode {
    return (
      <div>
        <textarea
          ref={(ref: HTMLTextAreaElement) => (this.codeNode = ref)}
          defaultValue="*type in here*"
          autoComplete="off"
        />
      </div>
    );
  }
}
