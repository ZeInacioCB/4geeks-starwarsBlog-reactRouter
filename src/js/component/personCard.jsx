import React from "react";
import { useState, useEffect } from "react";

const ResourceCards = () => {
    return (
        <div>
            <ResourceCard type="people" color="success" />
            <ResourceCard type="planets" color="primary" />
            <ResourceCard type="starships" color="danger" />
        </div>)
}

const ResourceCard = ({type, color}) => { 
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

    const cardsBuilder = characters?.map((character) => {
        return (
            <div key={character.uid} className="card col-4">
                <div className="card-body m-2">
                    <h5 className="card-title" >{character?.name}</h5>
                    <p className="card-text">{character?.name}</p>
                    <a href="#" className={`btn btn-${color}`} >See {character?.name}</a>
                </div>
            </div>     
        );
    })
    
    if (!characters) return <p>Loading...</p>;
    else return  <div className="d-flex mt-1">{cardsBuilder}</div>
};

export default ResourceCards;