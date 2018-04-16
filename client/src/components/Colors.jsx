import React from 'react';
import PropTypes from 'prop-types';
import ColorContainer from '../containers/ColorContainer';
import styles from '../styles/Colors.css';

const Colors = ({ colors, row, col }) => (
  <div className={styles.colors}>
    { colors.map(c => <ColorContainer color={c} row={row} col={col} key={c} />) }
  </div>
);

Colors.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
};

export default Colors;
