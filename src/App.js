import React from 'react';
import Class from './screens/Class';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./screens/Home";
import Dashboard from './screens/Dashboard';
//import { Dashboard } from '@material-ui/icons';
function App() {
  return (
    <div className="App">   
  <Router>
  <Routes>
   <Route exact path="/" element={<Home />} /> 
   <Route exact path="/dashboard" element={<Dashboard />}>
    </Route>
   <Route exact path="/class/:id" element={<Class />}>
    </Route>
  </Routes>
  </Router>
 </div>
  );
}

export default App;