import React from 'react'
import './Main.css'

import SignInPanel from '../../components/SignInPanel/SignInPanel'
import UserDashboard from '../../components/UserDashboard/UserDashboard'
import Demoer from '../../components/Demoer/Demoer'

import logoIMG from '../../assets/mountain_4.svg'
import demoIMG from '../../assets/new.png'

const main = props => {
  const { isLoggedIn } = props

  let content = <SignInPanel { ...props } />
  if ( isLoggedIn ) content = <UserDashboard { ...props } />

  const demoArr = [
    {
      demoImg: demoIMG,
      demoText: `
        The previos version of this web-app was fancier, at least in terms of functinoality on the back end.
        But nobody was looking at it (my fault for not having good documentation available)
        Available in the first version (but disabled for now from this newer version):
        - Admin/Client email receipts
        - Categorization of posted items' status
        - Admin view w/ all active posts
      `,
    },
    {
      demoImg: logoIMG,
      demoText: `
        React/Front-end re-work of previous YS4S.
        - New Social Account icons in the footer (attribution in the html)
        - This Demoer thing that manipulates the DOM/rendered Demos for transition effects
        - I used a spinner
        - Modal component "Tommy" to solicit... pity? (Not sure yet)
        - I'm really digging InkScape for making my own SVGs
        - Other stuff
      `,
    },
  ]
  return (
    <main className="Main">
      <img id="logo" onClick={() => alert('clicked')} src={logoIMG} alt="" />
      {content}
      {!isLoggedIn && <Demoer demos={demoArr} />}

      {/* <Demo demoImg={demoIMG} demoText={`Perfect thing`} /> */}
      {/* <div className="info">
        <div className="demo-img" style={{backgroundImage: `url(${demoImg})`}} />
        <div className="demo-info">Perfect thing</div>
      </div>
      <div className="info">
        <img className="demo-img" src={demoImg} alt="" srcset="" />
        <div className="demo-info">Perfect thing</div>
      </div> */}
    </main>
  )
}

export default main