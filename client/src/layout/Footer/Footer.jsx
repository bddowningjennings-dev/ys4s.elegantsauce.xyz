import React from 'react'
import './Footer.css'

import portfolioIMG from '../../assets/005-hot-drink.svg'
import linkedinIMG from '../../assets/002-linkedin.svg'
import githubIMG from '../../assets/003-github.svg'
import twitterIMG from '../../assets/001-twitter.svg'

 const footer = props => {
  return (
    <footer className="Footer">
      {/* <div className="footer-top" /> */}
      <div className="footer-bottom">
        <span className="" id="anchor_contact" />
        <div className="social_label">
            {/* <!-- <img src="assets/red_arrow.svg" alt="" srcSet="">   -->
            <!-- <h3>Here are some of my profiles...</h3> --> */}
        </div>
        <div className="social-links">
          <div className="spacer" />
          <a
            href="https://elegantsauce.xyz"
            target="blank"
            className="social-icon portfolio">
            <img alt="elegantsauce" src={portfolioIMG} />
          </a>
          <a
            href="https://github.com/bddowningjennings-dev"
            target="blank"
            className="social-icon github">
            <img alt="github" src={githubIMG} />
          </a>
          <a
            href="https://www.linkedin.com/in/bddowningjennings/"
            target="blank"
            className="social-icon">
            <img alt="linkedin" src={linkedinIMG} />
          </a>
          <a
            href="https://twitter.com/blahmountain"
            target="blank"
            className="social-icon">
            <img alt="twitter" src={twitterIMG} />
          </a>
          <div className="spacer" /> 
        </div>
      </div>
    </footer>
  )
}

export default footer

