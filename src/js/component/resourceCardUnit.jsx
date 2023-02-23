import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { imgErrorHandler } from "../utilities/utilities";

const ResourceCardUnit = ({type, uid, color, favourite, onclick}) => {
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

    const translateImgUrl = (type) => {
        if (type === 'people') return 'characters';
        if (type === 'planets') return 'planets';
        if (type === 'starships') return 'starships';
    }

    const imgStyles = {
        maxHeight: "450px",
        objectFit: "cover",
        objectPosition: "top"
    }

    if (!character) return null;
    else return (
        <div key={uid} className="card col-4">
            <img 
                src={`https://starwars-visualguide.com/assets/img/${translateImgUrl(type)}/${uid}.jpg`} 
                onError={imgErrorHandler} 
                className="card-img-top img-fluid" 
                alt={character?.properties.name}
                style={imgStyles}
            >
            </img>
            <div className="card-body m-2">
                <h5 className="card-title" >{character?.properties.name}</h5>
                <p className="card-text">{character?.description}</p>
                <Link to={`/${type}/${uid}/`}>
                    <span className={`btn btn-${color}`} href="#" role="button">
                        See More
                    </span>
                </Link>
                <button 
                    className={`${favourite} ms-1`} 
                    onClick={(e) => onclick(e.currentTarget)}
                    value={`/${type}/${uid}`}
                    name={character?.properties.name}
                    >
                    <span><i className="fa fa-regular fa-heart"></i></span>
                </button>
                <button 
                    className={`${favourite} ms-1`} 
                    onClick={actions.favouritesClickHandler}
                    value={`/${type}/${uid}`}
                    name={character?.properties.name}
                    >
                    <span><i className="fa fa-regular fa-heart"></i></span>
                </button>
            </div>
        </div>
    )
}

export default ResourceCardUnit;