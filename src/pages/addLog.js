import React, { useState, useEffect } from "react"
import axios from "axios"
import { useForm, useController } from "react-hook-form"
import clientauth from "./api/user/clientauth"
import Cookies from "js-cookie"
import ReactSearchBox from "react-search-box"
React.useLayoutEffect = React.useEffect


async function sendPost(url, date, description, hours, animal, pfp, uid) {
    
    const res = await axios.post(url, {
        date: date,
        description: description,
        hours: hours,
        animal: animal,
        trainingLogVideo: pfp,
        headers: {
            'Authorization': 'Bearer ' + uid
        }
    })

    return res.data
}

async function getAnimals(uid) {
    const res = await axios.get("/api/user/userPagination", {
        headers: {
            'Authorization': 'Bearer ' + uid
        }
    })
    return res.data
}   


export default function addLog() {
    const[success, setSuccess] = useState("");
    const [animalArray, setAnimalArray] = useState([]);
    const [ animalName, setAnimalName ] = useState("Animal Name");
    let res
    let uid
    const { register, handleSubmit, formState: { errors }, control, reset} = useForm();

    const validateDate = (value) => {
        const maxDate = new Date();
        const inputDate = new Date(value);
        if (inputDate > maxDate) {
            return false;
        }
        return true;
    }
    
    const onSubmit = async (data) => {
        res = await sendPost("/api/training", data.date, data.description, data.hours, animalName, data.pfp, uid)
        if(res == "redirect") {
            console.log("redirect")
            return (
                window.location.href = '/signIn'
            )
        }
        if (res == "added") {
            setSuccess("Training Log created!")
            window.location.href = '/home'
        } else {
            setSuccess("Training Log not created correctly")
        }
        reset()
    }

    
    let aa = []
    useEffect( () => {
        const token = (Cookies.get('token'))
        uid = clientauth(token)
        const fetchData = async () => { 
            aa = await getAnimals(uid)
            if(aa == "redirect") {https://www.princeton.edu/sites/default/files/styles/half_2x/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=iQEwihUn
                return (
                    window.location.href = '/signIn'
                )
            }
            let temp = []
            for(let i = 0; i < aa.length; i++) {
                temp.push({value: aa[i].name, label: aa[i].name})
            }
            setAnimalArray(temp)
        }
        fetchData()
    }, [])


    return (
        <>
            <div class="container-default">
                <h1>Add Log</h1>
                <form onSubmit={handleSubmit(onSubmit)
                    }>
                    <div class="input-container">
                        <div class="textbox-default-box">
                            <h3>Date Trained</h3>
                            <input type="date" {...register("date", {required: true, validate: validateDate})} class="textbox-default"/>
                            {errors.date && errors.date.type === "required" && <span class="error-text-small">This field is required</span>}
                            {errors.date && errors.date.type === "validate" && <span class="error-text-small">Date cannot exceed todays date</span>}
                        </div>
                        <div class="textbox-default-box">
                            <h3>Description</h3>
                            <input placeholder="Shake Hand" type="text" {...register("description", {required: true})} class="textbox-default"/>
                            {errors.description && <span class="error-text-small">This field is required</span>}
                        </div>
                        <div class="textbox-default-box">
                            <h3>Hours Trained</h3>
                            <input placeholder="0" type="number" {...register("hours", {required: true, min: 0})} class="textbox-default"/>
                            {errors.hours && errors.hours.type === "required" && <span class="error-text-small">This field is required</span>}
                            {errors.hours && errors.hours.type === "min" && <span class="error-text-small">Hours must be greater than 0</span>}
                        </div>

                        <div class="textbox-default-box">
                            <h3>Animal</h3>
                            <ReactSearchBox
                                placeholder={animalName}
                                data={animalArray}
                                onSelect={(record) => {
                                    setAnimalName(record.item.value)
                                }}
                                className="textbox-default"
                                inputBorderColor="black"
                                inputBackgroundColor={"rgb(244,244,244)"}
                            />
                            {errors.animal && <span class="error-text-small">This field is required</span>}
                        </div>

                        <div class="textbox-default-box">
                            <h3>Training Video</h3>
                            <input placeholder="www." type="text" {...register("pfp")} class="textbox-default"/>
                            {errors.pfp && <span class="error-text-small">This field is required</span>}
                        </div>
                    </div>

                    <button type="submit" value="Submit" class="button-default">Add Log!</button>
                </form>

                <h2>{success}</h2>
            </div>
        </>
    )
}