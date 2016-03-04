import React, { Component, PropTypes } from 'react'
import Radium from 'radium';
import DocumentMeta from 'react-document-meta';
import * as CounterActions from '../actions/counter'

class Counter extends Component {

  constructor(props) {
    super(props);
    this.incrementWithFormFallback = this.incrementWithFormFallback.bind(this);
    this.decrementWithFormFallback = this.decrementWithFormFallback.bind(this);
  }

  render() {
    const { counter } = this.props;
    const metaData = {
      title: `#${counter}`
    };

    return (
      <div>
        <DocumentMeta {...metaData}/>

        <h1 style={styles.counter}>{counter}</h1>

        <div style={styles.flexContainer}>

          <form
            action='/api/count/increment'
            method='POST'
            onSubmit={this.incrementWithFormFallback}
            style={styles.flexItem}>
            <button
              key='increment-button'
              style={styles.button}
              type='submit'>+</button>
          </form>

          <form
            action='/api/count/decrement'
            method='POST'
            onSubmit={this.decrementWithFormFallback}
            style={styles.flexItem}>
            <button
              key='decrement-button'
              style={styles.button}
              type='submit'>-</button>
          </form>

        </div>
      </div>
    )
  }

  incrementWithFormFallback(e) {
    e.preventDefault();
    this.props.dispatch(CounterActions.increment());
  }

  decrementWithFormFallback(e) {
    e.preventDefault();
    this.props.dispatch(CounterActions.decrement());
  }
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired
}

const styles = {
  counter: {
    textAlign: 'center'
  },
  flexContainer: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'no-wrap'
  },
  flexItem: {
    flex: '1 1 0',
    width: '12rem',
    textAlign: 'center'
  },

  // Button style rules (compatible w/ Radium Style)
  buttonCSS: {
    background: 'none',
    border: '0.5rem solid #FFF',
    color: '#FFF',
    verticalAlign: 'middle',
    textTransform: 'uppercase',
    display: 'inline',
    fontSize: '8rem',
    margin: 0,
    padding: '0.2rem 1rem 0.8rem 1rem',
    outlineOffset: 0,
    cursor: 'pointer',
    transition: '0.1s linear',
    width: '8rem',
    borderRadius: '1rem'
  },
  buttonHoverCSS: {
    background: '#FFF',
    color: '#333'
  }
}

// Add Radium enhanced rules for `button`
styles.button = Object.assign({}, styles.buttonCSS);
styles.button[':hover'] = styles.buttonHoverCSS;

export default Radium(Counter)
