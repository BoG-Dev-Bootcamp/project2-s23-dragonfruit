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

async function getAuth() {
    const res = await axios.get("/api/user/auth.js")
    return res.data

}

export default function addAnimal() {
    
    const loggedIn = getAuth()
    console.log("test")
    const onSubmit = data => console.log(data)

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h3>Name</h3>
                <input placeholder="Max" type="text" {...register("name", {required: true})}/>
                {errors.name && <span>This field is required</span>}
            </div>
            <div>
                <h3>Hours Trained</h3>
                <input placeholder="0" type="number" {...register("hours", {required: true})}/>
                {errors.hours && <span>This field is required</span>}
            </div>
            <div>
                <h3>Date of Birth</h3>
                <input type="date" {...register("date", {required: true})}/>
                {errors.date && <span>This field is required</span>}
            </div>
            <div>
                <h3>Profile Picture</h3>
                <input placeholder="www." type="text" {...register("pfp", {required: true})}/>
                {errors.pfp && <span>This field is required</span>}
            </div>

            <button type="submit" value="Submit">Add Friend!</button>
            
        </form>
        <Button type="Link" link="/signIn" buttonText="Have an account? Sign In Instead" />
        </>
    )
}