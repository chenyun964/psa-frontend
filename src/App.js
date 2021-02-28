import React, { Fragment } from 'react';
import Routes from './routes.js';
import { ToastContainer} from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'sweetalert/dist/sweetalert.css';

function App() {
  return (
    <Fragment>
      <div className="App" id="app">
          <Routes/>
          <ToastContainer/>
      </div>
    </Fragment>
  );
}

export default App;
