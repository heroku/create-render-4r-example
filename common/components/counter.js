import React, { Component, PropTypes } from 'react'
import DocumentMeta from 'react-document-meta';

class Counter extends Component {

  render() {
    const { increment, decrement, counter } = this.props
    const metaData = {
      title: `Universal App: Counter #${counter}`
    };

    return (
      <p>
        <DocumentMeta {...metaData}/>

        Clicked: {counter} times
        {' '}
        <button onClick={increment}>+</button>
        {' '}
        <button onClick={decrement}>-</button>
      </p>
    )
  }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
}

export default Counter
