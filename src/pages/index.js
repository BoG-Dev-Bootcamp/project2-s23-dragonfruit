import Head from 'next/head'
import Button from './components/button'
import React, { useState } from "react"
import TextBox from './components/textBox'

export default function Home() {
  const [ screen, setScreen ] = useState(0) // 0 is Main Screen, 1 is Create Account, 2 is Sign In
  
  return (
    <>
      <Head>
        <title>Training Tracker</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      </Head>
      {(screen === 0) ? (
        <>
          <div>
            <Button buttonText="Create Account" 
              onClick={() => {
                setScreen(1)
              }}
            />
            <Button buttonText="Sign In" 
              onClick={() => {
                setScreen(2)
              }}
            />
            <TextBox />
          </div>
        </>
      ) : (
        (screen === 1) ? (
          <>
            <div>
              <h1>Create Account</h1>
            </div>
          </>
        ) : (
          (screen === 2) ? (
            <>
              <div>
                <h1>Sign In</h1>
              </div>
            </>
          ) : ( 
            <h1>There has been a mistake! Reload the page and try again.</h1>
          )
        )
      )
      }
    </>
  )
}
