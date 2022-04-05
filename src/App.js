import React from 'react';
import Nav from './components/Nav';
import Account from './components/Account';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <main>
        <Account></Account>
      </main>
    </div>
  );
}

export default App;
