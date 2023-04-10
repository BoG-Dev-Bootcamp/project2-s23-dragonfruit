import React, { useState } from "react"
import Button from "./components/button"
import TextBox from "./components/textBox"

export default function SignIn() {
    const [ email, setEmail ] = useState(undefined)
    const [ password, setPassword ] = useState(undefined)

    return (
        <>
            <div>
                <h1>Sign In</h1>
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

                <Button buttonText="Sign In" />

                <Button type="Link" link="/createAccount" buttonText="Don't have an account? Create Account Instead" />
            </div>
        </>
    )
}