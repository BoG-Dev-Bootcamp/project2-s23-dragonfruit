import React, { useState } from "react"
import Button from "./components/button"
import TextBox from "./components/textBox"

export default function SignIn() {
    return (
        <>
            <Button type="Link" link="/" buttonText="Back to Home Page"/>
            <div>
                <h1>Sign In</h1>
                <h3>Email</h3>
                <TextBox />
                <h3>Password</h3>
                <TextBox />
                <Button buttonText="Sign In" />
                <Button type="Link" link="/createAccount" buttonText="Don't have an account? Create Account Instead" />
            </div>
        </>
    )
}