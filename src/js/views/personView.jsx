import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const PersonView = props => {
	// set character state to get information from SWAPI
    const [character, setCharacter] = useState(null);
    // useParams hook to get uid from URL link
	const { uid } = useParams();
	// defining URL to connect to SWAPI
	const apiUrl = `https://www.swapi.tech/api/people/${uid}`
    // connect to SWAPI once when component mounts 
    useEffect(() => {    
        fetch(apiUrl)
        .then(res => res.json())
        .then(data => setCharacter(data))
        .catch(err => console.error(err))
    }, []);

	return (
		<div className="card mb-3" style={{maxWidth: "540px"}}>
			<div className="row g-0">
				<div className="col-md-4">
					<img src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`} className="img-fluid rounded-start" alt="" />
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">{character?.result.properties.name}</h5>
						<p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

PersonView.propTypes = {
	match: PropTypes.object
};