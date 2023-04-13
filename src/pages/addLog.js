import React, { useState, useEffect } from "react"
import Button from "./components/button"
import axios from "axios"
import { useForm, useController } from "react-hook-form"
import clientauth from "./api/user/clientauth"
import Cookies from "js-cookie"
import Select from 'react-select';
import { redirect } from "next/dist/server/api-utils"

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
    const [animalArray, setAnimalArray] = useState([]);
    let res
    let uid
    const { register, handleSubmit, formState: { errors }, control} = useForm();
    
    const onSubmit = async (data) => {
        res = await sendPost("/api/training", data.date, data.description, data.hours, data.animal, data.pfp, uid)
        if(res == "redirect") {
            console.log("redirect")
            return (
                window.location.href = '/signIn'
            )
        }
    }

    const handleChange = (selectedOption) => {
        console.log(`Option selected:`, selectedOption);
    }

    
    let aa = []
    useEffect( () => {
        const token = (Cookies.get('token'))
        uid = clientauth(token)
        const fetchData = async () => { 
            aa = await getAnimals(uid)
            if(aa == "redirect") {
                return (
                    window.location.href = '/signIn'
                )
            }
            let temp = []
            for(let i = 0; i < aa.length; i++) {
                temp.push({value: aa[i], label: aa[i]})
            }
            setAnimalArray(temp)
        }
        fetchData()
        
    }, [])



    const { field } = useController({ name: 'animal', control });
    const { value: animalValue, onChange: animalOnChange, ...restAnimalField } = field;

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)
            }>
            <div>
                <h3>Date Trained</h3>
                <input type="date" {...register("date", {required: true})}/>
                {errors.date && <span>This field is required</span>}
            </div>
            <div>
                <h3>Description</h3>
                <input placeholder="Shake Hand" type="text" {...register("description", {required: true})}/>
                {errors.name && <span>This field is required</span>}
            </div>
            <div>
                <h3>Hours Trained</h3>
                <input placeholder="0" type="number" {...register("hours", {required: true})}/>
                {errors.hours && <span>This field is required</span>}
            </div>

            <div>
                <h3>Animal</h3>
                <input placeholder="Animal" type="text" {...register("animal", {required: true})}/>
                {errors.animal && <span>This field is required</span>}
            </div>
            {/* <div>
                <label>Select Animal</label>
                <Select
                    className='select-input'
                    placeholder="Select Animal"
                    isClearable
                    options={animalArray}
                    value={animalValue ? animalArray.find(x => x.value === animalValue) : animalValue}
                    onChange={option => animalOnChange(option ? option.value : option)}
                    {...restAnimalField}
                    {...register("animal", {required: true})}
                />
                {errors.animal && <p>{errors.animal.message}</p>}
            </div> */}
            <div>
                <h3>Training Video</h3>
                <input placeholder="www." type="text" {...register("pfp")}/>
                {errors.pfp && <span>This field is required</span>}
            </div>

            <button type="submit" value="Submit">Add Log!</button>
            
        </form>
        </>
    )
}