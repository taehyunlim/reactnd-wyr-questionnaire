import React from "react";
import { NavLink } from "react-router-dom";
import ProfileWidget from "./ProfileWidget";

export const Nav = props => {
  return (
    <div className="nav-container">
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leaderboard
            </NavLink>
          </li>
          <li>
            {props.authedUser ? (
              <NavLink
                to={`/profile/${props.authedUser}`}
                activeClassName="active"
              >
                <ProfileWidget />
              </NavLink>
            ) : (
              <NavLink to={"/"} activeClassName="inactive">
                <ProfileWidget />
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};
