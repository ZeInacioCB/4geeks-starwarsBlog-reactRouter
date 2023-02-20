import React, { useState, useEffect } from "react";
import { snakeToUpperWord } from "../utilities/utilities.js";
import { Link } from "react-router-dom";

export const FeatureLi = ({ featureKey, featureDescription }) => {

	return (
		<p className="text-white my-0" >
			<span className="fw-bold" style={{color: "red"}}>{snakeToUpperWord(featureKey)}:</span>
			<span> {featureDescription}</span> 
		</p>
	);
};

export const FeatureLink = ({ featureKey, url }) => {
	const [featureName, setFeatureName] = useState(null);

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setFeatureName(data.result.properties.name))
        .catch(error => console.log(error));
    }, [])

	return (
		<p className="text-white my-0" >
			<span className="fw-bold" style={{color: "red"}}>{snakeToUpperWord(featureKey)}: </span>
            <Link to={'/'+ url.slice(27)} className="nav-link nav-success d-inline p-0" >
                <span href="#" role="button">
                    {featureName}
                </span>
            </Link>
		</p>
	);
};