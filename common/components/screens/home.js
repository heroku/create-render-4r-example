import React, { Component, PropTypes } from 'react'
import Radium from 'radium';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../counter'
import * as CounterActions from '../../actions/counter'

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

class Home extends Component {

  static fetchData(dispatch, props) {
    return dispatch(CounterActions.get());
  }

  render() {
    return (
      <Counter style={styles.flexItem} {...this.props} />
    );
  }
}

const styles = {
  flexItem: {
    flex: '1 1 0',
    width: '12rem',
    textAlign: 'center'
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Home))
