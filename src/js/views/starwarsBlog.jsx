import React from "react";
import "../../styles/home.css";

import ResourceCards from "../component/resourceCards.jsx"

export const StarWarsBlog = ({ onclick }) => (
	<div>
		<ResourceCards title="Characters" type="people" color="success" onclick={onclick} />
		<ResourceCards title="Planets" type="planets" color="primary" onclick={onclick} />
		<ResourceCards title="Starships" type="starships" color="danger" onclick={onclick} />
	</div>
);
