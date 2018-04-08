import { connect } from 'react-redux';
import Square from '../components/Square';
import boardSetQuadrant from '../actions/board';

const mapStateToProps = (state, ownProps) => ({
  square: state.board.getIn(['squares', ownProps.row, ownProps.col]).toJS(),
});

const mapDispatchToProps = dispatch => ({
  setQuadrant: (row, col) => dispatch(boardSetQuadrant(row, col, 'RED')),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const props = Object.assign({}, stateProps, dispatchProps, ownProps);
  if (!props.square.connector) {
    props.setQuadrant = () => {};
  }
  return props;
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Square);
