import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import styles from '../styles/Board.css';

const Board = props => (
  <div className={styles.board}>
    {props.squares.map(row => <Row squares={row} key={row[0].row} />)}
  </div>
);

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Board;
