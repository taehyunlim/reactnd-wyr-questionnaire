import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions'
// import serializeForm from "form-serialize";

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
    id: ''
  }
  handleChangeInput = (e) => {
    const value = e.target.value
    const name = e.target.name
    this.setState(() => ({
      [name]: value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOneText, optionTwoText } = this.state
    const { dispatch, authedUser } = this.props // From Redux Store
    const info = {
      optionOneText: optionOneText.trim(),
      optionTwoText: optionTwoText.trim(),
      authedUser 
    }
    dispatch(handleAddQuestion(info, (id) => {
      console.log(id)
      this.setState(() => ({
        toHome: true,
        id,
        optionOneText: '',
        optionTwoText: '',
      }))
    }))
  }

  render() {
    const { optionOneText, optionTwoText, toHome, id } = this.state
    if (toHome && id) {
      return <Redirect to={`/question/${id}`} />
    }

    // Only return page if authedUser is set
    return (
      (this.props.authedUser && 
        <div className='page-container'>
          <div className='card-container'>
            <div className='card-top'>
              <div>New Question</div>
            </div>
            <div className='card-main'>
              <div className='card-content-full'>
                <div style={{fontStyle: 'italic', padding: '7px 0'}}>Would you rather...</div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                  <label className='option-text'>
                    Option 1: <input type="text" name="optionOneText" placeholder="First Option" value={optionOneText} onChange={this.handleChangeInput} />
                  </label>
                  <label className='option-text'>
                    Option 2: <input type="text" name="optionTwoText" placeholder="Second Option" value={optionTwoText} onChange={this.handleChangeInput} />
                  </label>
                  <button className='btn' type='submit' disabled={!optionOneText || !optionTwoText}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)