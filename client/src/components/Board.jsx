import React from 'react';
import PropTypes from 'prop-types';
import SquareContainer from '../containers/SquareContainer';
import styles from '../styles/Board.css';

const key = (row, col) => `${row}-${col}`;

const Board = props => (
  <div className={styles.board}>
    {
      Array(props.size * 2).fill(0).map((n, row) =>
        Array(props.size * 2).fill(0).map((m, col) =>
          <SquareContainer row={row} col={col} key={key(row, col)} />))
    }
  </div>
);

Board.propTypes = {
  size: PropTypes.number.isRequired,
};

export default Board;
