import generateBoard from '../lib/generators/Board';
import { setQuadrant } from '../lib/Board';

const board = (state = generateBoard(8), action) => {
  switch (action.type) {
    case 'BOARD_SET_QUADRANT':
      return setQuadrant(state, action.quadrant, action.color);
    default:
      return state;
  }
};

export default board;
