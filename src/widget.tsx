//widget.tsx
import { DocumentRegistry, DocumentWidget } from '@jupyterlab/docregistry';
import { Message } from '@lumino/messaging';
import { Signal } from '@lumino/signaling';
import { PuzzleDocModel } from './model';
import { ReactWidget } from '@jupyterlab/ui-components';
import React from 'react';
import { Provider } from 'react-redux';
import { Widget } from '@lumino/widgets';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { App } from './components/App';
import { setIsAdmin } from './actions/users_actions';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import store from './store';
/**
 * DocumentWidget: widget that represents the view or editor for a file type.
 */

export class PuzzleDocWidget extends DocumentWidget<
  PuzzlePanel,
  PuzzleDocModel
> {
  constructor(options: DocumentWidget.IOptions<PuzzlePanel, PuzzleDocModel>) {
    super(options);
  }

  /**
   * Dispose of the resources held by the widget.
   */
  dispose(): void {
    this.content.dispose();
    super.dispose();
  }
}

/**
 * Widget that contains the main view of the DocumentWidget.
 */
export class PuzzlePanel extends ReactWidget {
  /**
   * Construct a `ExamplePanel`.
   *
   * @param context - The documents context.
   */
  constructor(context: DocumentRegistry.IContext<PuzzleDocModel>) {
    super();
    this.addClass('jp-puzzlemi-canvas');

    this._model = context.model;
    this._isDown = false;
    this._clients = new Map<string, HTMLElement>();

    context.ready.then(value => {
      this._model.contentChanged.connect(this._onContentChanged);
      this._model.clientChanged.connect(this._onClientChanged);

      this._onContentChanged();

      this.update();
    });

    this._page = document.createElement('div');
    this._page.className = 'jp-puzzlemi';
    this._onContentChanged();
    this.node.appendChild(this._page);
  }
  //middleware = [thunkMiddleware];
  //store = createStore(rootReducer, applyMiddleware(...this.middleware));
  s = createStore(rootReducer);

  //dispatch = store.dispatch;
  render(): JSX.Element {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }

  /**
   * Dispose of the resources held by the widget.
   */
  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    this._model.contentChanged.disconnect(this._onContentChanged);
    Signal.clearData(this);
    super.dispose();
  }

  /**
   * Handle event messages sent to the widget.
   *
   * @param event Event on the widget
   */
  handleEvent(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Callback to listen for changes on the model. This callback listens
   * to changes on shared model's content.
   */
  private _onContentChanged = (): void => {
    this._page.innerText = this._model.content;
  };

  /**
   * Callback to listen for changes on the model. This callback listens
   * to changes on the different clients sharing the document.
   *
   * @param sender The DocumentModel that triggers the changes.
   * @param clients The list of client's states.
   */
  private _onClientChanged = (
    sender: PuzzleDocModel,
    clients: Map<number, any>
  ): void => {
    clients.forEach((client, key) => {
      if (this._model.clientId !== key) {
        const id = key.toString();

        if (client.mouse) {
          if (this._clients.has(id)) {
            const elt = this._clients.get(id)!;
            elt.style.left = client.mouse.x + 'px';
            elt.style.top = client.mouse.y + 'px';
          } else {
            const el = document.createElement('div');
            el.className = 'jp-example-client';
            el.style.left = client.mouse.x + 'px';
            el.style.top = client.mouse.y + 'px';
            el.style.backgroundColor = client.user.color;
            el.innerText = client.user.name;
            this._clients.set(id, el);
            this.node.appendChild(el);
          }
        } else if (this._clients.has(id)) {
          this.node.removeChild(this._clients.get(id)!);
          this._clients.delete(id);
        }
      }
    });
  };

  private _isDown: boolean;
  private _page: HTMLElement;
  private _clients: Map<string, HTMLElement>;
  private _model: PuzzleDocModel;
}
