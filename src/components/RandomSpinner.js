'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import apiFetcher from '@lib/api'

import config from '@lib/config'

import AutoScroll from '@components/AutoScroll'
import Confetti from 'react-confetti'

import styled, { keyframes } from 'styled-components'

export default function RandomSpinner() {
  const limit = config.random.limit
  const [data, setData] = React.useState({})
  React.useEffect(() => {
    apiFetcher('records/random', { limit }, setData)
  }, [limit])

  const [records, setRecords] = React.useState([])
  const [text, setText] = React.useState([])
  const [time, setTime] = React.useState(timing.slow)
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    if(data.results && data.results.length) {
      const results = data.results
      const count = results.length
      const index = Math.floor(Math.random() * count)
      setRecords(results.map(r => r.narrative_1))
      console.log({index})
      setText(results[index].narrative_1)
    }
  }, [data])


  const handleClick = () => {
    setTime(timing.fast)
    setTimeout(() => {
      setTime(timing.slow)
      setOpen(true)
    }, timing.spin * 1000)
  }

  if(!records.length) return <></>

  return (
    <Container>
      <AutoScroll items={records} time={time} />
      <Button onClick={handleClick}>{`Go!`}</Button>
      <Result text={text} open={open} />
    </Container>
  )
}

function Result({ text, open }) {
  const router = useRouter()

  const handleRefresh = () => {
    if(window !== undefined) {
      window.location.reload()
    }
  }

  return (
    <>
    { open ? (
      <Modal>
        <Confetti />
        <Highlight>{text}</Highlight>
        <Button onClick={handleRefresh}>{`Again!`}</Button>
      </Modal>
    ):('')}
    </>
  )
}

const timing = {
  stop: 0,
  slow: 15,
  fast: 1,
  spin: 3,
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 600px;
  margin: 0 auto;
  padding: 3em;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`
const Button = styled.button`
  text-align: center;
  font-size: 2em;
  color: #111;
  background-color: #FFEC28;
  border: none;
  border-radius: 0.25em;
  padding: 0.5em 1em;
  font-family: inherit;
  &:hover {
    cursor: pointer;
  }
`
const Modal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3em;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #000;
`
const Highlight = styled.div`
  width: 100%;
  font-size: 3em;
  height: 1em;
  margin: 1em 0;
`
