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

    let uid
    let aa
    useEffect( () => {
        const token = (Cookies.get('token'))
        uid = clientauth(token)

        if (uid === false) {
            window.location.href = "/signIn"
        }
        const fetchData = async () => { 
            aa = await getAnimals(uid)
            if(aa == "redirect") {
                return (
                    window.location.href = '/signIn'
                )
            }
            if (aa == "Null") {
                setAnimalArray([])
            } else {
                let temp = []
                for(let i = 0; i < aa.length; i++) {
                    temp.push(aa[i])
                }
                setAnimalArray(temp)
            }
            
        }
        fetchData()
    }, [])

    return (
        <>
            <div class="logout-button">
                <Button buttonText="Log Out" type="Link" link="signIn"
                    buttonStyle="link-button" buttonBox="link-button-box" textStyle="link-button-text"/>
            </div>
            <div class="container-default">
                <h1>Your Animals</h1>
                <div className = "buttons">
                    <Button buttonText="Add New Animal" type="Link" link="/addAnimal" 
                        buttonStyle="link-button" buttonBox="link-button-box" textStyle="link-button-text"/>
                </div>
                <div>
                    <FlatList className="animalList"
                        // list={dummyData}
                        list={animalArray}
                        renderItem={(animal, idx) => (
                            <>
                                <div className="item-box">
                                    <img className="dogImage" src={animal.pfp === "" ? "https://i.etsystatic.com/6643643/r/il/684f37/619857698/il_fullxfull.619857698_8val.jpg" : animal.pfp}/>
                                    <h2>{animal.name}</h2>
                                    <h4>Born on {format(new Date(animal.dob), "MMMM do, yyyy")}</h4>
                                    <h3>{animal.hoursTrained} Hours Trained</h3>
                                </div>
                            </>
                        )}
                        renderWhenEmpty={() => 
                            <h3 class="link-button-default">You haven't added any animals yet!</h3>
                        }
                        display={{
                            grid: true,
                            gridGap: "0px",
                        }}
                    />
                </div>
            </div>
        </>
    )
}