import { expect } from 'chai';
import { Square, generateSquares } from '../Square';
import SIZE from '../config/size';

describe('Square', () => {
  describe('instance', () => {
    let square;
    beforeEach(() => {
      square = new Square();
    });

    describe('properties', () => {
      it('should have a walls, glyph, and connector property', () => {
        expect(square).to.have.keys('row', 'col', 'walls', 'glyph', 'connector');
      });

      it('should have a default glyph value of null', () => {
        expect(square.glyph).to.equal(null);
      });

      it('should have a default connector value of null', () => {
        expect(square.connector).to.equal(null);
      });
    });

    describe('#modifyWall', () => {
      it('should set a wall to true', () => {
        square.modifyWall('top', true);
        expect(square.walls.top).to.equal(true);
      });

      it('should remove a wall', () => {
        square.modifyWall('top', true);
        square.modifyWall('top', false);
        expect(square.walls).to.not.have.key('top');
      });

      it('should not modify a wall if given undefined', () => {
        square.modifyWall('bottom', true);
        square.modifyWall('bottom', undefined);
        expect(square.walls.bottom).to.equal(true);
      });

      it('should not modify a wall if given an invalid wall', () => {
        square.modifyWall('carrot', true);
        expect(square.walls).to.not.have.key('carrot');
      });
    });

    describe('#modifyWalls', () => {
      it('should add multiple walls', () => {
        square.modifyWalls({ left: true, right: true });
        expect(square.walls).to.to.deep.equal({ left: true, right: true });
      });

      it('should remove multiple walls', () => {
        square.modifyWalls({ top: true, bottom: true, left: true });
        square.modifyWalls({ top: false, bottom: false });
        expect(square.walls).to.deep.equal({ left: true });
      });
    });
  });

  describe('generation', () => {
    const squares = generateSquares();

    it('should have size * 2 rows and size * 2 columns', () => {
      expect(squares).to.have.lengthOf(SIZE * 2);
      expect(squares[0]).to.have.lengthOf(SIZE * 2);
    });

    it('should have generate Squares that are instance of Square', () => {
      expect(squares[0][0]).to.be.an.instanceOf(Square);
    });

    it('should have generate squares with a border top wall', () => {
      squares[0].forEach(square => expect(square.walls.top).to.be.true);
    });

    it('should have generate squares with a border bottom wall', () => {
      squares[(SIZE * 2) - 1].forEach(square => expect(square.walls.bottom).to.be.true);
    });

    it('should have generate squares with a border left wall', () => {
      squares.forEach(row => expect(row[0].walls.left).to.be.true);
    });

    it('should have generate squares with a border right wall', () => {
      squares.forEach(row => expect(row[(SIZE * 2) - 1].walls.right).to.be.true);
    });
  });
});

