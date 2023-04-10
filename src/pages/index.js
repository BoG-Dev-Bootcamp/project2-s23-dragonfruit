import Head from 'next/head'
import Button from './components/button'
import React, { useState } from "react"

export default function Home() {
  const [ screen, setScreen ] = useState(0) // 0 is Main Screen, 1 is Create Account, 2 is Sign In
  
  return (
    <>
      <Head>
        <title>Animal Shelter Mock Up</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        
      </main>
    </>
  )
}
