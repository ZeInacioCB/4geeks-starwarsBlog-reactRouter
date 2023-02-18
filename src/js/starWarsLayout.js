import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { StarWarsNavbar } from "./component/starwarsNavbar.jsx";
import { StarWarsBlog } from "./views/starwarsBlog.jsx";
import { PersonView } from "./views/personView.jsx";
import { PlanetView } from "./views/planetView.jsx";
import { StarshipView } from "./views/starshipView.jsx";
import injectContext from "./store/appContext";


//create your first component
const StarWarsLayout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<StarWarsNavbar />
					<Routes>
						<Route path="/" element={<StarWarsBlog />} />
						<Route path="/people/:uid" element={<PersonView />} />
						<Route path="/planets/:uid" element={<PlanetView />} />
						<Route path="/starships/:uid" element={<StarshipView />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(StarWarsLayout);
