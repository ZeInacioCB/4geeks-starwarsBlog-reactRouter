import React from "react";
import starWars from "../../img/star-wars-512.png";
import "../../styles/home.css";

import ResourceCards from "../component/resourceCards.jsx"

export const StarWarsBlog = () => (
	<div>
		<ResourceCards title="Characters" type="people" color="success" />
		<ResourceCards title="Planets" type="planets" color="primary" />
		<ResourceCards title="Starships" type="starships" color="danger" />
	</div>
);
