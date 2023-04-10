import React, { useState } from "react"
import Button from "./components/button"
import TextBox from "./components/textBox"

export default function CreateAccount() {
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ passwordConfirm, setPasswordConfirm ] = useState("")

    return (
        <>
            <Button type="Link" link="/" buttonText="Back to Home Page"/>
            <div>
                <h1>Create Account</h1>

                <h3>First Name</h3>
                <TextBox placeholder="First Name" value={firstName}
                    onChange={(event) => {
                        setFirstName(event.target.value)
                    }} 
                />

                <h3>Last Name</h3>
                <TextBox placeholder="Last Name" value={lastName}
                    onChange={(event) => {
                        setLastName(event.target.value)
                    }} 
                />

                <h3>Email</h3>
                <TextBox placeholder="Email" value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }} 
                />

                <h3>Password</h3>
                <TextBox placeholder="Password" value={password} type="password"
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                />

                <h3>Confirm Password</h3>
                <TextBox placeholder="Confirm Password" value={passwordConfirm} type="password"
                    onChange={(event) => {
                        setPasswordConfirm(event.target.value)
                    }}
                />

                <Button buttonText="Create Account" />

                <Button type="Link" link="/signIn" buttonText="Have an account? Sign In Instead" />
            </div>
        </>
    )
}