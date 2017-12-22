import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.js'

class ExampleLocalStates extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSomething = () => {
    this.setState({
    })
  }

  render() {
    return (<div>
      Example with Local States
    </div>)
  }
}

ExampleLocalStates.propTypes = {
}

export default ExampleLocalStates
