import React from 'react'
import './Modal.css'

import magicImg from '../../assets/tommy.svg'
const Aux = props => props.children

const modal = ({ toggleModal, showModal }) => {
  let modalContent = null
  if (showModal) modalContent = (
    <div id="modal">
      <div className="modal-content">
        You clicked Tommy, the ordinary Tomato with a name.
        <p>
          Though Tommy is simply an ordinary fruit with a name, I think if it had consiousness they would want you to consider me for a role I would be a good fit for - where I can solve challenges and be an important contributor to something special.
        </p>
        <p>
          Also, if you think about it they would probably like pizza (because, who doesn't?) but then they might find out the horrible secret of pizza sauce... and so it is probably for the best that Tommy isn't conscious and aware of pizza.
        </p>
        <p>Maybe still contact me though...</p>

      </div>
      <button onClick={toggleModal} className="close">x</button>
    </div>
  )
  let msg = (
    <div id="magic-msg">
      {/* <p>__</p>
      <p>__</p>
      <p>__</p> */}
    </div>
  )
  if (showModal) msg = (
    <Aux>
      <div id="magic-msg">
        {/* X */}
      </div>
    </Aux>
  )
  return (
    <div className="Modal">
      <div id="magic-shadow" />      
      <img
        id="magic-img"
        src={magicImg}
        onClick={toggleModal}
      />
        {msg}
      {modalContent}
    </div>
  )
}

export default modal
