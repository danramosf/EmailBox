import React, { Component } from 'react'

class Email extends Component {
  render() {
    return (
      <div>
        <div>
          Subject: {this.props.email.subject} , Sent By:  ({this.props.email.sentBy})
        </div>
      </div>
    )
  }
}

export default Email