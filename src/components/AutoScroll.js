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
      <Shadow />
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
  position: relative;
  overflow: hidden;
  height: 4em;
`
const Line = styled.div`
  font-size: 2em;
  height: 1em;
  overflow: hidden;
  margin: 1em 0;
  animation: ${scroll} ${props => props.time || 10}s linear infinite;
`
const Shadow = styled.div`
  box-shadow:
    inset 0px 1em 0.5em #111,
    inset 0px -1em 0.5em #111;
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
`
