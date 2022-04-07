import React from 'react';
import Nav from './components/Nav';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <main>
        <Login></Login>
        <Signup></Signup>
      </main>
    </div>
  );
}

export default App;
