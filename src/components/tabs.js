/* eslint-disable */
import React from 'react'
import ConnectedSearch from '../containers/Search/Search'

import './footer.css'

class Tab extends React.Component {
  onClick = () => {
    const { label, onClick } = this.props
    onClick(label)
  }

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this

    let className = 'material-icons tab-list-item'

    if (activeTab === label) {
      className += ' tab-list-active'
    }

    return (
      <i onClick={onClick} className={className}>
        {label}
      </i>
    )
  }
}

class Tabs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: this.props.children[0].props.label,
    }
  }

  onClickTabItem = tab => {
    this.setState({ activeTab: tab })
  }

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this

    return (
      <React.Fragment>
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '0',
            right: '0',
          }}
        >
          <ConnectedSearch />
        </div>
        <div className="layout-grid">
          <div
            style={{
              width: '100%',
              overflow: 'scroll',
            }}
          >
            {children.map(child => {
              if (child.props.label !== activeTab) return undefined
              return child.props.children
            })}
          </div>
        </div>
        <div
          style={{
            background: '#0C192E',
            marginBottom: '0rem',
            height: '80px',
          }}
        >
          <div
            className="footer"
            style={{
              margin: '0 auto',
              maxWidth: 960,
              padding: '1.45rem 1.0875rem',
            }}
          >
            <p style={{ margin: 0 }}>
              {children.map(child => {
                const { label } = child.props

                return (
                  <Tab
                    activeTab={activeTab}
                    key={label}
                    label={label}
                    onClick={onClickTabItem}
                  />
                )
              })}
            </p>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Tabs
