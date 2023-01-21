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

  const [fetchedRecords, setFetchedRecords] = React.useState({})
  React.useEffect(() => {
    apiFetcher(`${config.api.url}/records/random`, {
      body: {
        limit
      }
    }, setFetchedRecords)
  }, [limit])

  const [fetchedResult, setFetchedResult] = React.useState('')
  React.useEffect(() => {
    apiFetcher(`${config.api.url}/records/scott`, {
    }, setFetchedResult)
  }, [])

  const [records, setRecords] = React.useState([])
  const [result, setResult] = React.useState('')
  const [time, setTime] = React.useState(timing.slow)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const { results, count } = fetchedRecords
    if(results && count) {
      setRecords(results.map(r => r.narrative_1))
    }
  }, [fetchedRecords])

  React.useEffect(() => {
    setResult(fetchedResult)
  }, [fetchedResult])
  // React.useEffect(() => {
  //   const index = Math.floor(Math.random() * limit)
  //   setResult(records[index])
  // }, [records, limit])

  const handleClick = () => {
    setTime(timing.fast)
    setTimeout(() => {
      setTime(timing.slow)
      setOpen(true)
    }, timing.spin * 1000)
  }

  if(!records.length || !result) {
    return <Loading>...</Loading>
  }

  return (
    <Container>
      <AutoScroll items={records} time={time} blur={true} />
      <Button onClick={handleClick}>{`Go!`}</Button>
      <Result text={result} open={open} />
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

const loading = keyframes`
  from { opacity: 1; }
  50% { opacity: 0; }
  to { opacity: 1; }
`
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
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 3em;
  animation: ${loading} 2s linear infinite;
`
