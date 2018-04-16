import { connect } from 'react-redux';
import Color from '../components/Color';
import boardSetQuadrant from '../actions/board';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setQuadrant: (row, col, color) => dispatch(boardSetQuadrant(row, col, color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Color);
