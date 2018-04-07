import { expect } from 'chai';
import generateGlyphs from '../generators/Glyph';
import COLORS from '../config/colors';
import DESIGNS from '../config/glyphDesigns';

describe('Glyph Generation', () => {
  const glyphs = generateGlyphs();

  it('should have one glyph for every color/design combination, plus one for all', () => {
    expect(glyphs).to.have.lengthOf((COLORS.length * DESIGNS.length) + 1);
  });

  it('should generate glyphs with a color and design', () => {
    expect(glyphs[0]).to.have.keys(['color', 'design']);
  });

  it('should generate glyphs with a name method', () => {
    expect(glyphs[0].getName).to.be.a('function');
  });

  it('should have generate glyphs with a color and design from config/color and config/design', () => {
    expect(glyphs[0].color).to.be.oneOf(COLORS);
    expect(glyphs[0].design).to.be.oneOf(DESIGNS);
  });
});
