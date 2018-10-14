import React, { Component } from 'react'
import EmailList from './EmailList'
import CreateEmail from './CreateEmail'

class App extends Component {
  render() {
    return (
    <div>
    	<CreateEmail />
    	<EmailList />
    </div>
    )
  }
}

export default App