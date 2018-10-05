// @format
import React from 'react'

class Booth extends React.Component {
  //constructor(props) {
    //super(props)
  //}

  render() {
    //const { props } = this.props

    if (!this.props.name) {
      throw new Error('Your booth should have a name')
    }

    return (
      <div className="booth">
        <div className="logo">
          LOGO
        </div>
        <div className="name">
          <p style={{ margin: 0 }}>
            {this.props.name}
          </p>
        </div>
        <div className="market">
          {this.props.market}
        </div>
        <div className="tags">
          {this.showTags(this.props.tags)}
        </div>
      </div>
    )
  }

  showTags = (tags) => {
    return tags.join(', ');
  }
}

export default Booth
