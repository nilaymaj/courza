import React from 'react';
import './App.css';
import Button from './elements/button';
import Text from './elements/text';
import Sidebar from './components/sidebar';
import Card from './elements/card';

function App() {
  return (
    <div className="App">
      <div className="app-wrapper">
        <Sidebar></Sidebar>
        <div className="app-content">
          <Card>
            <span>Card content</span>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
