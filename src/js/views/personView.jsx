import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const PersonView = props => {
	const { uid } = useParams();
	return (
		<div className="jumbotron">
			<h1>Hello</h1>
            <p>{uid}</p>
            <img src="https://starwars-visualguide.com/assets/img/characters/1.jpg" alt="" />
		</div>
	);
};

PersonView.propTypes = {
	match: PropTypes.object
};