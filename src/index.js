import { render } from 'react-dom'
import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'
// import shuffle from 'lodash/shuffle'
import data from './data'
import './styles.css'

function App() {
  const [rows, set] = useState(data)
  // useEffect(() => {

  // });

  let height = 0
  const transitions = useTransition(rows.map(data => ({ ...data, y: (height += 50) - 50 })), d => d.name, {
    from: { height: 0, opacity: 0 },
    leave: { height: 0, opacity: 0 },
    enter: ({ y, height }) => ({ y, height, opacity: 1 }),
    update: ({ y, height }) => ({ y, height })
  })
  const shuffle = () => {
    rows.sort(function() {
      return 0.5 - Math.random()
    })
    set(Array.from(rows))
  }
  const sort = () => {
    // console.log('sort')
    const compareObjects = (object1, object2) => {
      const obj1 = object1.height
      const obj2 = object2.height

      if (obj1 < obj2) {
        return -1
      }
      if (obj1 > obj2) {
        return 1
      }
      return 0
    }
    rows.sort(compareObjects)
    // console.log(rows)
    console.log(transitions)
    set(Array.from(rows))
  }
  return (
    <div className="container">
      <nav className="shadow p-3 mb-5 bg-white rounded navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <button type="button" className="btn btn-outline-secondary" onClick={sort}>
            sort
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={shuffle}>
            shuffle
          </button>
        </div>
      </nav>
      <div className="list container" style={{ height }}>
        {transitions.map(({ item, props: { y, ...rest }, key }, index) => (
          <animated.div
            key={key}
            className="card-project"
            style={{
              width: `50px`,
              zIndex: data.length - index,
              transform: y.interpolate(y => `translate3d(${y}px,0,0)`),
              ...rest
            }}>
            <div className="cell">
              <div className="details" style={{ backgroundImage: item.css }} />
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
