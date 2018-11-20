import React from 'react'
import './Header.css'

import logoIMG from '../../assets/ys4s_logo.svg'

const header = props => {
  const { user, isLoggedIn, handleLogout } = props
  let profileIMG = localStorage.getItem('profile_img')
  let button

  if (isLoggedIn) {
    button = (
      <button
        className="header_left" id="logout"
        onClick={ handleLogout }>
        <div
          style={{ backgroundImage: `url(${profileIMG || logoIMG})` }}            
          className="user_icon">
        </div>
        {`LOGOUT, ${ user.toUpperCase() }`}
      </button>
    )
  } else {
    button = (
      <div className="spacer" ></div>        
    )
  }

  const headerTop = (
    <div className="header-top">
      <div className="title"  />
      Your Stuff 4 $ale - Increase the reach of your second hand products
      {button}
    </div> 
  )
  const headerBottom = (
    <div className="header-bottom">
      PORTFOLIO - <a href="https://elegantsauce.xyz" target="blank">elegantsauce.xyz</a>
    </div>
  )

  return (
    <header className="Header">
      {headerTop}
      {headerBottom}
    </header>
  )
}

export default header
