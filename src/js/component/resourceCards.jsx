import React, { useState, useEffect } from "react";
import ResourceCardUnit from "./resourceCardUnit.jsx";
import CardsTitle from "./cardsTitle.jsx";

const ResourceCards = ({title, type, color, onclick}) => { 
    // set character state to get information from SWAPI
    const [characters, setCharacters] = useState(null);
    // defining URL to connect to SWAPI
    const apiUrl = `https://www.swapi.tech/api/${type}/`;
    
    // can we automate this fetch function? I'm using similar functions for almost every fetch in this application?
    useEffect(() => { // connect to SWAPI once when component mounts 
        if (localStorage.getItem(`list/${type}/data`) === "true") {
            const localListResults = JSON.parse(localStorage.getItem(`list/${type}/json`));
            setCharacters(localListResults);
        } else {
            fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setCharacters(data.results);
                localStorage.setItem(`list/${type}/data`, 'true');
                localStorage.setItem(`list/${type}/json`, JSON.stringify(data.results));
            })
            .catch(err => console.error(err))
        }       
    }, []);

    const cardsBuilder = characters?.map((character) => <ResourceCardUnit 
        type={type} 
        uid={character.uid} 
        color={color} 
        key={character.uid}
        favourite="btn btn-outline-warning"
        onclick={onclick} />)
    
    if (!characters) return <p style={{color: "yellow"}}>Loading...</p>;
    else return  (
        <div>
            <CardsTitle title={title} />
            <div className="d-flex flex-row flex-nowrap overflow-auto">{cardsBuilder}</div>
        </div>)
};


export default ResourceCards;