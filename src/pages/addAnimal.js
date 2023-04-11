import React, { useState } from "react"
import Button from "./components/button"
import TextBox from "./components/textBox"
import axios from "axios"
import { useForm } from "react-hook-form"

async function sendPost(url, firstName, lastName, email, password) {
    const res = await axios.post(url, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password.trim()
    })

    return res.data
}

export default function addAnimal() {



    const { register, control } = useForm();


    return (
        <>
        <form>
            <div>
                <h3>Name</h3>
                <input placeholder="Name" type="text"/>
            </div>
            <div>
                <h3>Hours Trained</h3>
                <input placeholder="0" type="number"/>
            </div>
            <div>
                <h3>Date of Birth</h3>
                <input type="date"/>
            </div>
            <div>
                <h3>Profile Picture</h3>
                <input placeholder="www." type="text"/>
            </div>

            <button type="submit">Add Friend!</button>
            
        </form>
        <Button type="Link" link="/signIn" buttonText="Have an account? Sign In Instead" />
        </>
    )
}