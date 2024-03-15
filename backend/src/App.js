import React from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Routes
} from "react-router-dom";

import './App.css';
import Header from './components/Header';
import NotePage from './pages/NotePage';
import NotesListPage from './pages/NotesListPage';


function App() {
  return (    
      <Router>
        <div className="container dark">
          <div className ="app">
          <Header />
          <Routes>
            <Route path='/' exact element={<NotesListPage />} />        
            <Route path='/note/:id'  element={<NotePage />} />   
          </Routes>
        </div>
        </div>
      </Router>
  );
}

export default App;
