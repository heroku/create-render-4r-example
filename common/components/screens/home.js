import React, { Component, PropTypes } from 'react'
import Radium from 'radium';
import { connect } from 'react-redux'
import Counter from '../counter'
import * as CounterActions from '../../actions/counter'

function mapStateToProps(state) {
  return {
    counter: state.counter.get('value')
  }
}

class Home extends Component {

  static fetchData(dispatch, props) {
    return dispatch(CounterActions.get());
  }

  componentDidMount() {
    this.props.dispatch(CounterActions.subscribe());
  }

  componentWillUnmount() {
    this.props.dispatch(CounterActions.unsubscribe());
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

export default connect(mapStateToProps)(Radium(Home))
