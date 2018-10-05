// @format
import React from 'react'
import PropTypes from 'prop-types'

import './logo.css'

class Logo extends React.Component {
  static propTypes = {
    type: PropTypes.string,
  }

  render() {
    return <div className={'circle icon-' + this.props.type} />
  }
}

export default Logo
