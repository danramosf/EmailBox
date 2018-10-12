import React, { Component } from 'react'
import Email from './Email'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const FEED_QUERY = gql`
  {
    feed {
      emails {
        id      
        subject
        content
        sentBy
        sentTo {
          id
          emailAddress
        }
        read
      }
    }
  }
`

class EmailList extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
    
          const emailsToRender = data.feed.emails
    
          return (
            <div>
              {emailsToRender.map(email => <Email key={email.id} email={email} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default EmailList