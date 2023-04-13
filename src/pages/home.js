import React, { useState, useEffect } from "react"
import FlatList from "flatlist-react"
import Button from "./components/button"
import Cookies from "js-cookie"
import clientauth from "./api/user/clientauth"
import { format } from "date-fns"
import axios from "axios"

async function getAnimals(uid) {
    const res = await axios.get("/api/user/userPagination", {
        headers: {
            'Authorization': 'Bearer ' + uid
        }
    })

    return res.data
}

export default function HomePage() {
    const [ animalArray, setAnimalArray ] = useState([])

    const dummyData = [
        {name: 'Bella', dateOfBirth: new Date(0), hoursTrained: 0},
        {name: 'Mia', dateOfBirth: new Date(0), hoursTrained: 0},
        {name: 'Fluffy', dateOfBirth: new Date(0), hoursTrained: 0},
    ]

    let uid
    useEffect( () => {
        const token = (Cookies.get('token'))
        uid = clientauth(token)
        if (uid === false) {
            window.location.href = "/signIn"
        }
        setAnimalArray(getAnimals(uid))
        setAnimalArray(dummyData)
    }, [])

    return (
        <>
            <div class="container-default">
                <h1>Your Animals</h1>
                <Button buttonText="Add New Animal" type="Link" link="/addAnimal" 
                    buttonStyle="link-button" buttonBox="link-button-box" textStyle="link-button-text"/>
                <FlatList
                    // list={dummyData}
                    list={animalArray}
                    renderItem={(animal, idx) => (
                        <>
                            <div class="item-box">
                                <h2>{animal.name}</h2>
                                <h4>Born on {format(animal.dateOfBirth, "MMMM do, yyyy")}</h4>
                                <h3>{animal.hoursTrained} Hours Trained</h3>
                            </div>
                        </>
                    )}
                    renderWhenEmpty={() => 
                        <h3 class="link-button-default">You haven't added any animals yet!</h3>
                    }
                />
            </div>
        </>
    )
}