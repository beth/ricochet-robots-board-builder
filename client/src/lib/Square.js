const setWall = (square, wall) => square.setIn(['walls', wall], true);

const removeWall = (square, wall) => square.deleteIn(['walls', wall]);

const setGlyph = (square, glyph) => square.set('glyph', glyph);

const removeGlyph = square => square.set('glyph', null);

export {
  setWall,
  removeWall,
  setGlyph,
  removeGlyph,
};
