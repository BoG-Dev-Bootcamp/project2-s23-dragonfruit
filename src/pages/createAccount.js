import React, { useState } from "react"
import Button from "./components/button"
import TextBox from "./components/textBox"

export default function CreateAccount() {
    return (
        <>
            <Button type="Link" link="/" buttonText="Back to Home Page"/>
            <div>
                <h1>Create Account</h1>
                <h3>First Name</h3>
                <TextBox />
                <h3>Last Name</h3>
                <TextBox />
                <h3>Email</h3>
                <TextBox />
                <h3>Password</h3>
                <TextBox />
                <h3>Confirm Password</h3>
                <TextBox />
                <Button buttonText="Create Account" />
                <Button type="Link" link="/signIn" buttonText="Have an account? Sign In Instead" />
            </div>
        </>
    )
}