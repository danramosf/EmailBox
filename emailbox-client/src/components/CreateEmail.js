import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const POST_MUTATION = gql`
  mutation post($subject: String!, $content: String!, $read: Boolean!, $sentBy: String) {
    post(
      subject: $subject,
      content: $content,
      read: $read,
      sentBy: $sentBy
    ) {
      id
      subject
    }
  }
`

class CreateEmail extends Component {
  state = {
    subject: '',
    content: '',
    read: false,
    sentBy: ''   
  }

  render() {
    const { subject, content, read, sentBy } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={subject}
            onChange={e => this.setState({ subject: e.target.value })}
            type="text"
            placeholder="A subject for the email"
          />
          <textarea
            className="mb2"
            value={content}            
            onChange={e => this.setState({ content: e.target.value })}
            placeholder="The Content for the email"
          >            
          </textarea>
          <input
            className="mb2"
            value={sentBy}
            onChange={e => this.setState({ sentBy: e.target.value })}
            type="email"
            placeholder="The sender email address"
          />
          
        </div>
        <Mutation mutation={POST_MUTATION} variables={{ subject, content, read, sentBy }}>
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    )
  }
}

export default CreateEmail