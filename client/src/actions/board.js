import { determineQuadrant } from '../lib/Board';

const boardSetQuadrant = (row, col, color) => ({
  type: 'BOARD_SET_QUADRANT',
  color,
  quadrant: determineQuadrant(8, row, col),
});

export default boardSetQuadrant;
