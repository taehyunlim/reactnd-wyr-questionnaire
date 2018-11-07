import React, { Component } from 'react'
import { connect } from 'react-redux'

class Test extends Component {
  render() {
    // console.log(this.props)
    return (
      <div>
        <h3 className='center'>TEST</h3>
      </div>
    )
  }
}

// function mapStateToProps ({ tweets }) {
//   return {
//     testProp: "Just a string as a test prop",
//     tweetIds: Object.keys(tweets)
//       .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
//   }
// }

// export default connect(mapStateToProps)(Dashboard)

export default Test