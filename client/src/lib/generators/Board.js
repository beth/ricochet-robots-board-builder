import { fromJS, Set } from 'immutable';
import generateGlyphs from './Glyph';
import generateSquares from './Square';
import COLORS from '../config/colors';

const Board = size => ({
  size,
  squares: generateSquares(size),
  quadrants: {
    TL: null,
    TR: null,
    BL: null,
    BR: null,
  },
});

const generateBoard = (size) => {
  let board = fromJS(Board(size));
  board = board.set('remainingGlyphs', Set(generateGlyphs()));
  board = board.set('remainingColors', Set(COLORS));
  return board;
};

export default generateBoard;
