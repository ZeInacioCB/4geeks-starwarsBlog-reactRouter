import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ResourceCards = () => {
    return (
        <div>
            <ResourceCardType title="Characters" type="people" color="success" />
            <ResourceCardType title="Planets" type="planets" color="primary" />
            <ResourceCardType title="Starships" type="starships" color="danger" />
        </div>)
}

const ResourceCardType = ({title, type, color}) => { 
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

    const cardsBuilder = characters?.map((character) => <ResourceCard type={type} uid={character.uid} color={color} key={character.uid} />)
    
    if (!characters) return <p>Loading...</p>;
    else return  (
        <div>
            <h2>{title}</h2>
            <div className="d-flex mt-1">{cardsBuilder}</div>
        </div>)
};

const ResourceCard = ({type, uid, color}) => {
    // set character state to get information from SWAPI
    const [character, setCharacter] = useState(null);
    // defining URL to connect to SWAPI
    const apiUrl = `https://www.swapi.tech/api/${type}/${uid}`;
    
    useEffect(() => { // connect to SWAPI once when component mounts    
        fetch(apiUrl)
        .then(res => res.json())
        .then(data => setCharacter(data))
        .catch(err => console.error(err))
    }, []);

    const translateImgUrl = (type) => {
        if (type === 'people') return 'characters';
        if (type === 'planets') return 'planets';
        if (type === 'starships') return 'starships';
    }

    const onErrorHandler = e => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    }

    if (!character) return <p>Loading...</p>;
    else return (
        <div key={uid} className="card col-4">
            <img 
                src={`https://starwars-visualguide.com/assets/img/${translateImgUrl(type)}/${uid}.jpg`} 
                onError={onErrorHandler} 
                className="card-img-top" 
                alt={character?.result.properties.name}>
            </img>
            <div className="card-body m-2">
                <h5 className="card-title" >{character?.result.properties.name}</h5>
                <p className="card-text">{character?.result.description}</p>
                <Link to={`/${type}/${uid}/`}>
                    <span className={`btn btn-${color}`} href="#" role="button">
                        See {character?.result.properties.name}
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default ResourceCards;