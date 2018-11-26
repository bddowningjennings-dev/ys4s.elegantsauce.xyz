import React from 'react'
import './Modal.css'

import { aux as Aux } from '../../helpers/helpers'

import magicImg from '../../assets/tommy.svg'

const modal = ({ toggleModal, showModal }) => {
  let modalContent
  if (showModal) modalContent = <div id="modal">
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

  const modalIcon = <Aux>
    <div id="magic-shadow" />      
    <img
      id="magic-img"
      src={magicImg}
      alt='Tommy'
      onClick={toggleModal}
    />
  </Aux>
  
  return (
    <div className="Modal">
      {modalIcon}
      {modalContent}
    </div>
  )
}

export default modal
