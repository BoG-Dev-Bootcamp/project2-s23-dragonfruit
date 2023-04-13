import React, { useState, useEffect } from "react"
import Button from "./components/button"
import axios from "axios"
import { useForm } from "react-hook-form"
import clientauth from "./api/user/clientauth"
import Cookies from "js-cookie"

async function sendPost(url, name, hours, date, pfp, uid) {
    
    const res = await axios.post(url, {
        name: name,
        hoursTrained: hours,
        dateOfBirth: date,
        profilePicture: pfp,
        headers: {
            'Authorization': 'Bearer ' + uid
        }
    })

    return res.data
}


export default function addAnimal() {
    let res;
    const[success, setSuccess] = useState("");
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const validateDate = (value) => {
        const maxDate = new Date();
        const inputDate = new Date(value);
        if (inputDate > maxDate) {
            return false;
        }
        return true;
    }
    
    const onSubmit = async (data) => {
        /*
        res = await sendPost("/api/animal", data.name, data.hours, data.date, data.pfp, uid)
        if(res == "redirect") {
            console.log("redirect")
            return (
                window.location.href = '/signIn'
            )
        }
        */
        console.log(data.date)
        res = await sendPost("/api/animal", data.name, data.hours, data.date, data.pfp, uid)
        if(res == "redirect") {
            console.log("redirect")
            return (
                window.location.href = '/signIn'
            )
        }
        if(res == "created") {
            setSuccess("Animal added!")
        } else {
            setSuccess("Animal not created correctly")
        }
        reset()
        
    }

    
    let uid
    useEffect( () => {
        const token = (Cookies.get('token'))
        uid = clientauth(token)
    })

    return (
        <>
        
        <form onSubmit={handleSubmit(onSubmit)
            }>
            <div>
                <h3>Name</h3>
                <input placeholder="Max" type="text" {...register("name", {required: true, pattern: /^[A-Za-z]+$/i, maxLength: 20})}/>
                {errors.name && errors.name.type === "required" && <span>This field is required</span>}
                {errors.name && errors.name.type === "pattern" && <span>No letters or special characters are allowed</span>}
                {errors.name && errors.name.type === "maxLength" && <span>Must be less than 20 characters</span>}
            </div>
            <div>
                <h3>Hours Trained</h3>
                <input placeholder="0" type="number" {...register("hours", {required: true, min: 0})}/>
                {errors.hours && errors.hours.type === "required" && <span>This field is required</span>}
                {errors.hours && errors.hours.type === "min" && <span>Number must be greater than 0</span>}
            </div>
            <div>
                <h3>Date of Birth</h3>
                <input type="date" {...register("date", {required: true, validate: validateDate})}/>
                {errors.date && errors.date.type === "required" && <span>This field is required</span>}
                {errors.date && errors.date.type === "validate" && <span>Date cannot exceed todays date</span>}
            </div>
            <div>
                <h3>Profile Picture</h3>
                <input placeholder="www." type="text" {...register("pfp")}/>
                {errors.pfp && <span>This field is required</span>}
            </div>

            <button type="submit" value="Submit">Add Friend!</button>
            
        </form>
        <h2>{success}</h2>
        </>
    )
}