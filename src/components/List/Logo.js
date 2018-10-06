// @format
import React from 'react'
import PropTypes from 'prop-types'

import './Logo.css'

class Logo extends React.Component {
  static propTypes = {
    type: PropTypes.string,
  }

  render() {
    return (
      <div className={'circle icon-' + this.props.type}>
        <img
          src={require(`../../images/colored-icons/${this.props.type}.png`)}
        />
      </div>
    )
  }
}

export default Logo
