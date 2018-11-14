import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Redirect, withRouter } from 'react-router-dom'
import { handleAddQuestion, handleSetAuthedUser } from '../actions'
// import serializeForm from "form-serialize";

class Login extends Component {
  state = {
    selectedUser: ''
  }

  handleChangeOption = (e) => {
    e.preventDefault()
    const selectedUser = e.target.value
    this.setState(() => ({
      selectedUser
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(handleSetAuthedUser(this.state.selectedUser)) 
  }

  render() {
    const { users, authedUser } = this.props
    const dropdownOptions = (name, id) => (
      <option key={id} value={id}>{name}</option>
    )

    return (
      <div className='page-container'>
        <div className='card-container'>
          <div className='card-top'>
            <div><span><h3><i>Would You Rather</i> App</h3>Sign-in to continue</span></div>
          </div>
          <div className='card-main'>
            <div className='card-content-full'>
              <div style={{fontStyle: 'italic', padding: '7px 0'}}>Would you rather... sign-in?</div>
              <form onSubmit={this.handleSubmit}>
                <select className='select-login-picker' defaultValue={"default"} onChange={this.handleChangeOption}>
                  <option value="default" disabled={true}>Select One</option>
                  {users && Object.keys(users).map(user => (
                    dropdownOptions(users[user].name, users[user].id)
                  ))}
                </select> 
                <button className='btn' type='submit' disabled={!this.state.selectedUser}>Sign-in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(Login)