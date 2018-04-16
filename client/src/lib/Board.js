import GLYPH_QUADRANTS from './config/glyphQuadrants';
import * as square from './Square';

/*
  BOARD HELPERS
*/
const determineQuadrant = (size, row, col) => {
  if (row <= size - 1 && col <= size - 1) {
    return 'TL';
  } else if (row <= size - 1) {
    return 'TR';
  } else if (col <= size - 1) {
    return 'BL';
  }
  return 'BR';
};

const glyphAllowedInColorQuadrant = (glyph, color) => GLYPH_QUADRANTS[glyph.getName()] === color;

const isConnector = (board, row, col) => Boolean(board.getIn(['squares', row, col, 'connector']));

const remainingQuadrant = board => board.get('quadrants').reduce((memo, color, quadrant) => (color ? memo : quadrant), null);

/*
  BOARD METHODS
*/
const setQuadrant = (board, quadrant, color) => {
  let newBoard = board;
  if (!board.get('remainingColors').has(color)) {
    return board;
  }
  const previousColor = board.getIn(['quadrants', quadrant]);
  if (previousColor) {
    newBoard = newBoard.update('remainingColors', remainingColors => remainingColors.add(previousColor));
  }
  newBoard = newBoard.setIn(['quadrants', quadrant], color);
  newBoard = newBoard.update('remainingColors', remainingColors => remainingColors.delete(color));
  if (newBoard.get('remainingColors').size === 1) {
    newBoard = setQuadrant(newBoard, remainingQuadrant(newBoard), newBoard.get('remainingColors').first());
  }
  return newBoard;
};

const setGlyph = (board, glyph, row, col) => {
  let newBoard = board;
  const quadrant = determineQuadrant(board.get('size'), row, col);
  if (!glyphAllowedInColorQuadrant(glyph, board.getIn(['quadrants', quadrant])) || isConnector(board, row, col)) {
    return newBoard;
  }
  const currentGlyph = board.getIn(['squares', row, col, 'glyph']);
  if (currentGlyph) {
    newBoard = newBoard.update('remainingGlyphs', remainingGlyphs => remainingGlyphs.add(currentGlyph));
  }
  newBoard = newBoard.updateIn(['squares', row, col], squareToUpdate => square.setGlyph(squareToUpdate, glyph));
  newBoard = newBoard.update('remainingGlyphs', remainingGlyphs => remainingGlyphs.delete(glyph));
  return newBoard;
};

export {
  determineQuadrant,
  glyphAllowedInColorQuadrant,
  isConnector,
  remainingQuadrant,
  setQuadrant,
  setGlyph,
};
