import React, { useState } from "react"
import FlatList from "flatlist-react"
import Button from "./components/button"

export default function HomePage() {
    const dummyData = [
        {name: 'Bella', dateOfBirth: "April 2016"},
        {name: 'Mia', dateOfBirth: "April 2016"},
        {name: 'Fluffy', dateOfBirth: "February 2013"},
    ]

    return (
        <>
            <Button type="Link" link="/" buttonText="Back to Home Page"/>
            <h1>Your Animals</h1>
            <Button buttonText="Add New Animal" />
            <FlatList
                list={dummyData}
                renderItem={(animal, idx) => (
                    <>
                        <h3>{animal.name}</h3>
                        <h3>{animal.dateOfBirth}</h3>
                    </>
                )}
            />
        </>
    )
}