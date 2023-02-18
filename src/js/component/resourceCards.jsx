import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ResourceCardUnit from "./resourceCardUnit.jsx";
import CardsTitle from "./cardsTitle.jsx";

const ResourceCards = ({title, type, color}) => { 
    // set character state to get information from SWAPI
    const [characters, setCharacters] = useState(null);
    // defining URL to connect to SWAPI
    const apiUrl = `https://www.swapi.tech/api/${type}/`;
    
    useEffect(() => { // connect to SWAPI once when component mounts    
        fetch(apiUrl)
        .then(res => res.json())
        .then(data => setCharacters(data.results))
        .catch(err => console.error(err))
    }, []);

    const cardsBuilder = characters?.map((character) => <ResourceCardUnit type={type} uid={character.uid} color={color} key={character.uid} />)
    
    if (!characters) return <p style={{color: "yellow"}}>Loading...</p>;
    else return  (
        <div>
            <CardsTitle title={title} />
            <div className="d-flex flex-row flex-nowrap overflow-auto">{cardsBuilder}</div>
        </div>)
};


export default ResourceCards;