import React, { Component } from 'react'
import './Demoer.css'

import Demo from './Demo/Demo'

import { sleep } from '../../helpers/helpers'

const demoMapper = (demo, i) => {
  let className = 'hidden'
  // if ( show === i ) className = ''
  const demoProps = {
    ...demo,
    key: i,
    className,
    id: `demo_${i}`,
  }
  return <Demo {...demoProps} />
}

// const demoMapper = show => (demo, i) => {
//   let className = 'hidden'
//   if ( show === i ) className = ''
//   const demoProps = {
//     ...demo,
//     key: i,
//     className,
//   }
//   return <Demo {...demoProps} />
// }

const initializeState = () => {
  return {
    count: 0,
    cancel: false,
  }
}

class Demoer extends Component {
  state = initializeState()
  unmounted = false

  componentDidMount() {
    const { ms = 7000 } = this.props
    this.updateCount(ms)
  }
  componentWillUnmount() {
    this.unmounted = true
  }

  forceCount = (dir = 1) => async e => {
    e && e.preventDefault()
    this.setState(prevState => {
      return {
        cancel: true,
        count: Number(prevState.count) + Number(dir),
      }
    }, () => {
      // this.updateCount()
      const all = document.getElementsByClassName('Demo')
      let show = Math.abs(this.state.count % all.length)
      Array.prototype.forEach.call(all, el => el.classList.add('hidden'))
      const showing = document.getElementById(`demo_${show}`)
      showing.classList.remove('hidden')
    })
  }
  updateCount = async ms => {
    if (this.state.cancel) {
      this.setState(prevState => ({ cancel: false }), async () => {
        await sleep(8000)
        if (this.unmounted) return
        this.updateCount(ms)
      })
      return
    }
    this.setState(prevState => ({ count: prevState.count += 1 }), async () => {

      const all = document.getElementsByClassName('Demo')
      let show = Math.abs(this.state.count % all.length)

      Array.prototype.forEach.call(all, el => el.classList.add('hidden'))
      const showing = document.getElementById(`demo_${show}`)
      showing.classList.remove('hidden')
      await sleep(ms)
      if (this.unmounted) return
      this.updateCount(ms)
    })
  }
  render() {
    // const { count } = this.state
    const { demos } = this.props
    // let show = count % demos.length
    let demoArr = demos.map(demoMapper)
    // let demoArr = demos.map(demoMapper(show))

    return (
      <div className="Demoer">
        {demoArr}
        <div className="buttons">
          <button className="left" onClick={this.forceCount(-1)}> {`<`} </button>
          <button className="right" onClick={this.forceCount(1)}>{`>`}</button>
        </div>
      </div>
    )
  }


}

export default Demoer
