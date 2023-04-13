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
    //const [uid, setUid] = useState(null);
    let res;
    
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
        sendPost("/api/animal", data.name, data.hours, data.date, data.pfp, uid)
            .then((res) => {
                if (res == "redirect") {
                    console.log("redirect")
                    window.location.href = '/signIn'
                } else {
                    window.location.href = "/home"
                }
            }).catch((error) => {
                return "There has been an error"
            })
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
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
                <input placeholder="www." type="text" {...register("pfp")}/>
                {errors.pfp && <span>This field is required</span>}
            </div>

            <button type="submit" value="Submit">Add Friend!</button>
            
        </form>
        <Button type="Link" link="/signIn" buttonText="Have an account? Sign In Instead" />
        </>
    )
}