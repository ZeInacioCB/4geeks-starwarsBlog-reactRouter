import React from "react";
import "../../styles/starwarsBlog.css";

import ResourceCards from "../component/resourceCards.jsx"

export const StarWarsBlog = () => (
	<div>
		<ResourceCards title="Characters" type="people" seeMoreColor="success" />
		<ResourceCards title="Planets" type="planets" seeMoreColor="primary" />
		<ResourceCards title="Starships" type="starships" seeMoreColor="danger" />
	</div>
);
