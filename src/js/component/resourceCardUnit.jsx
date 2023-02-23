import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { imgErrorHandler } from "../utilities/utilities";
import FavouriteButton from "./favouriteButton.jsx";

const ResourceCardUnit = ({ type, uid, seeMoreColor }) => {
    // set context
    const { actions, store } = useContext(Context);

    // set character state to get information from SWAPI
    const [character, setCharacter] = useState(null);

    // defining URL to connect to SWAPI
    const apiUrl = `https://www.swapi.tech/api/${type}/${uid}`;

    // connect to SWAPI once when component mounts 
    useEffect(() => {    
        if (localStorage.getItem(`/${type}/${uid}/data`) === 'true') {
            const localCharacter = JSON.parse(localStorage.getItem(`/${type}/${uid}/json`));
            setCharacter(localCharacter);
        } else {
            fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setCharacter(data.result);
                localStorage.setItem(`/${type}/${uid}/data`, 'true');
                localStorage.setItem(`/${type}/${uid}/json`, JSON.stringify(data.result));
            })
            .catch(err => console.error(err))
        }
    }, []);

    // translator to get the proper images from starwars-visualguide assets
    const translateImgUrl = (type) => {
        if (type === 'people') return 'characters';
        if (type === 'planets') return 'planets';
        if (type === 'starships') return 'starships';
    }

    if (!character) return null;
    else return (
        <div key={uid} className="card col-4">
            <img 
                src={`https://starwars-visualguide.com/assets/img/${translateImgUrl(type)}/${uid}.jpg`} 
                onError={imgErrorHandler} 
                className="card-img-top img-fluid" 
                alt={character?.properties.name}
            >
            </img>
            <div className="card-body m-2">
                <h5 className="card-title" >{character?.properties.name}</h5>
                <p className="card-text">{character?.description}</p>
                <Link to={`/${type}/${uid}/`}>
                    <span className={`btn btn-${seeMoreColor}`} href="#" role="button">
                        See More
                    </span>
                </Link>
                <FavouriteButton 
                    uri={`/${type}/${uid}`}
                    name={character?.properties.name}
                />
            </div>
        </div>
    )
}

export default ResourceCardUnit;