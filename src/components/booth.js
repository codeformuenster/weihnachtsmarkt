// @format
import React from 'react'

class Booth extends React.Component {

  render() {
    if (!this.props.name) {
      throw new Error('Your booth should have a name')
    }

    return (
      <div className="booth">
        <div className="logo ">
          <i className="material-icons">map</i>
        </div>
        <div className="name truncate">{this.props.name}</div>
        <div className="market truncate">{this.props.market}</div>
        <div className="tags truncate">{this.showTags(this.props.tags)}</div>
      </div>
    )
  }

  showTags = tags => {
    return tags.join(', ')
  }
}

export default Booth
