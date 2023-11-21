import React from 'react';
import './realstyle.css';
import 'semantic-ui-css/semantic.min.css'
import create from '../../../components/Trade/crud/create';
import { BrowserRouter as  Router, Route } from 'react-router-dom'
import read from '../../../components/Trade/crud/read';
import update from '../../../components/Trade/crud/update';


function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">React Crud Operations</h2>
        <div>
          <Route path='/create' Component={create} />
        </div>
        <div style={{ marginTop: 20 }}>
          <Route path='/read' Component={read} />
        </div>

        <Route path='/update' Component={update} />
      </div>
    </Router>
  );
}

export default App;