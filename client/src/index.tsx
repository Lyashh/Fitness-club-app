import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';


import ps from "./mst/stores/programsStore"
import { createRootStore } from "./mst/stores/rootStore" 
import { onPatch } from 'mobx-state-tree';

const store = createRootStore

onPatch(store, patch => {
  console.log(patch)
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
