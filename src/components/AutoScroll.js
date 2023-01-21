'use client'

import styled, { keyframes } from 'styled-components'

export default function AutoScroll({ items, time }) {
  const count = items.length
  const height = `${count * 2}em`

  return (
    <Window h={height}>
      {items.map((item, key) => (
        <Line key={key} time={time} h={height}>{item}</Line>
      ))}
      <Line time={time} h={height}>{items[0]}</Line>
    </Window>
  )
}

const scroll = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -40em, 0);
  }
`
const Window = styled.div`
  overflow: hidden;
  height: 3em;
`
const Line = styled.div`
  font-size: 2em;
  height: 1em;
  overflow: hidden;
  margin: 1em 0;
  animation: ${scroll} ${props => props.time || 10}s linear infinite;
`
