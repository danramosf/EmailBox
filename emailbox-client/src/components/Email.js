import React, { Component } from 'react'

class Email extends Component {
  render() {
  	//console.log(this.props);
  	if (!this.props.email.read) 
  	{
  		return (
  			<div>
        		<div>
        			<strong>Subject: {this.props.email.subject} , Sent By:  ({this.props.email.sentBy})</strong>
        		</div>
     		</div>
  		)
  	}
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