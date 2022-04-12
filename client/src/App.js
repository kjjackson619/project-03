import React from 'react';
import Nav from './components/Nav';
import Login from './components/Login';
import Signup from './components/Signup';
import SideNav from './components/SideNav';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <main>
        <Login></Login>
        <Signup></Signup>
        <div>
          <SideNav></SideNav>
        </div>
      </main>
    </div>
  );
}

export default App;
