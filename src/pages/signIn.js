import React, { useState } from "react"
import Button from "./components/button"
import TextBox from "./components/textBox"
import axios from "axios"
import Cookies from "js-cookie"

async function sendPost(url, email, password) {
    const res = await axios.post(url, {
        email: email.trim(),
        password: password.trim()
    })

    return res.data
}

export default function SignIn() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ errorMsg, setErrorMsg ] = useState("")

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

                <Button buttonText="Sign In" 
                    onClick={() => {
                        (email.trim() === "") ? (
                            setErrorMsg("Email cannot be blank")
                        ) : (
                            (password.trim() === "") ? (
                                setErrorMsg("Password cannot be blank")
                            ) : (
                                (sendPost("api/user/verify", email, password)
                                    .then((response) => {
                                        Cookies.set('token', response, {expires: 1/48, path:"/"})
                                        setErrorMsg("")
                                        window.location.href = '/home'
                                    }).catch((error) => {
                                        console.log(error)
                                        setErrorMsg("Incorrect username or password")
                                    })
                                )
                            )
                        )
                    }}
                />

                <h2>{errorMsg}</h2>

                <Button type="Link" link="/createAccount" buttonText="Don't have an account? Create Account Instead" />
            </div>
        </>
    )
}