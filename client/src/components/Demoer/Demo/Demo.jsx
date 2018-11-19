import React from 'react'

const infoLines = demoText => {
  let arr = demoText.split('\n')
  arr = arr.splice(1)
  return arr.map((line, i) => <p key={i}>{line}</p>)
}

const demo = ({ id, demoImg, demoText, className=`hidden` }) => {

  return (
    <div id={id} className={`Demo info ${className}`}>
      <div className="demo-img" style={{backgroundImage: `url(${demoImg})`}} />
      <div className="demo-info">{infoLines(demoText)}</div>
    </div>
  )

}

export default demo
