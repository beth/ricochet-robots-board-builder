import React from 'react';
import Board from './Board';
import BoardConstructor from '../lib/Board';

const board = new BoardConstructor(8);

const App = () => (
  <div>
    <Board squares={board.squares} />
  </div>
);

export default App;

