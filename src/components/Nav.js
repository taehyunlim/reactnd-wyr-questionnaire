import React from 'react'
import { NavLink } from 'react-router-dom'
import ProfileWidget from './ProfileWidget'

export const Nav = () => {
  return (
    <div className='nav-container'>
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leader-board' activeClassName='active'>
              Leader Board
            </NavLink>
          </li>
          <li>
            <NavLink to='/profile' activeClassName='active'>
              <ProfileWidget />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}