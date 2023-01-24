'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import apiFetcher from '@lib/api'

import config from '@lib/config'

import AutoScroll from '@components/AutoScroll'
import Confetti from 'react-confetti'

import styled, { keyframes } from 'styled-components'

const timing = {
  stop: 0,
  slow: 20,
  fast: 1,
  spin: 2,
}

export default function RandomSpinner() {
  const limit = config.random.limit

  const [fetchedRecords, setFetchedRecords] = React.useState({})
  React.useEffect(() => {
    apiFetcher(`${config.api.url}/records/scott?count=20`, {}, setFetchedRecords)
  }, [limit])

  const [fetchedResult, setFetchedResult] = React.useState('')
  React.useEffect(() => {
    apiFetcher(`${config.api.url}/records/scott`, {}, setFetchedResult)
  }, [])

  const [records, setRecords] = React.useState([])
  const [result, setResult] = React.useState('')
  const [animationSeconds, setAnimationSeconds] = React.useState(timing.slow)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const { results, count } = fetchedRecords
    if(results && count) {
      setRecords(results)
    }
  }, [fetchedRecords])

  React.useEffect(() => {
    const { results, count } = fetchedResult
    if(results && results.length) {
      setResult(results[0])
    }
  }, [fetchedResult])

  const handleClick = () => {
    setAnimationSeconds(timing.fast)
    setTimeout(() => {
      setAnimationSeconds(timing.slow)
      setOpen(true)
    }, timing.spin * 1000)
  }

  if(!records.length || !result) {
    return <Loading>...</Loading>
  }

  return (
    <Container>
      { open ? (
        <Result text={result} />
      ) : (
        <>
          <AutoScroll items={records} seconds={animationSeconds} blur={false} />
          <Button onClick={handleClick}>{`Go!`}</Button>
        </>
      )}
    </Container>
  )
}

function Result({ text }) {
  const router = useRouter()

  const handleRefresh = () => {
    if(window !== undefined) {
      window.location.reload()
    }
  }

  return (
    <>
      <Confetti />
      <Highlight>{text}</Highlight>
      <Button onClick={handleRefresh}>{`Again!`}</Button>
    </>
  )
}

const loading = keyframes`
  from { opacity: 1; }
  50% { opacity: 0; }
  to { opacity: 1; }
`
const Container = styled.div`
  min-height: 100vh;
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
const Highlight = styled.div`
  width: 100%;
  font-size: 3em;
  margin-bottom: 1em;
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
