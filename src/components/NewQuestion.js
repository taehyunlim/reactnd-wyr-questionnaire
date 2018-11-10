import React, { Component } from 'react'
import { connect } from 'react-redux'
// import serializeForm from "form-serialize";

class NewQuestion extends Component {
  state = {
    textOptionOne: '',
    textOptionTwo: '',
  }
  handleChangeInput = (e) => {
    const value = e.target.value
    const name = e.target.name
    console.log("name: " + name + ", value: " + value)
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log("SUBMIT CLICKED.")
  }

  render() {
    // console.log(this.props)
    return (
      <div className='page-container'>
        <div className='card-container'>
          <div className='card-top'>
            <div>New Question</div>
          </div>
          <div className='card-main'>
            <div className='card-content-full'>
              <div style={{fontStyle: 'italic', padding: '7px 0'}}>Would you rather...</div>
              <form onSubmit={this.handleSubmit}>
                <label className='option-text'>
                  Option 1: <input type="text" name="textOptionOne" placeholder="First Option" value={this.props.textOptionOne} onChange={this.handleChangeInput} />
                </label>
                <label className='option-text'>
                  Option 2: <input type="text" name="textOptionOne" placeholder="Second Option" value={this.props.textOptionTwo} onChange={this.handleChangeInput} />
                </label>
                <button className='btn' type='submit' disabled={null}>Submit</button>
              </form>
            </div>
          </div>
        </div>
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

export default NewQuestion