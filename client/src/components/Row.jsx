import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import styles from '../styles/Row.css';

const Row = props => (
  <div className={styles.row}>
    {props.squares.map(square => <Square square={square} key={square.col} />)}
  </div>
);

Row.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Row;
