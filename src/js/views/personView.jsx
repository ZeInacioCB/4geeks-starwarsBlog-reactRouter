import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { FeatureLi, FeatureLink } from "../component/features.jsx";
import { imgErrorHandler } from "../utilities/utilities.js";
import FavouriteButton from "../component/favouriteButton.jsx";

export const PersonView = () => {
	// set character state to get information from SWAPI
    const [character, setCharacter] = useState(null);
	const [features, setFeatures] = useState(null);

    // useParams hook to get uid from URL link
	const { uid } = useParams();

	// defining URL to connect to SWAPI
	const apiUrl = `https://www.swapi.tech/api/people/${uid}`;

    // connect to SWAPI once when component mounts 
    useEffect(() => {    
        fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
			setCharacter(data);
			const keys = Object.keys(data.result.properties);
			setFeatures(keys);
		})
        .catch(err => console.error(err))
    }, []);

	const featuresBuilder = features?.map((feature) => {
		if (character?.result.properties[feature].slice(0, 5) === "https") {
			return <FeatureLink key={feature} featureKey={feature} url={character?.result.properties[feature]} />
		}
		return <FeatureLi key={feature} featureKey={feature} featureDescription={character?.result.properties[feature]} />
	});

	return (
		<div className="card my-5 mx-auto bg-dark" style={{maxWidth: "90%"}}>
			<div className="row g-0">
				<div className="col-md-4">
					<img 
						src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`} 
						className="img-fluid rounded-start" 
						onError={imgErrorHandler} 
						alt={`Starwards Character: ${character?.result.properties.name}`}
					/>
				</div>
				<div className="col-md-8">
					<div className="card-body ps-5">
						<h5 className="card-title fs-2" style={{color: "yellow"}}>
							{character?.result.properties.name}   
							<span className="ps-2 justify-content-center">
								<FavouriteButton
									uri={`/people/${uid}`}
									name={character?.result.properties.name}
								/>
							</span>
						</h5>
						<p className="card-text text-light" >This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
						{featuresBuilder}
					</div>
				</div>
			</div>
		</div>
	);
};


PersonView.propTypes = {
	match: PropTypes.object
};