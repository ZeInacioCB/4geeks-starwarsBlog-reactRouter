import React, { useContext} from "react";
import { Link } from "react-router-dom";
import starWarsLogo from "../../img/star-wars-512.png";
import { Context } from "../store/appContext";

export const StarWarsNavbar = () => {
	const { actions } = useContext(Context);

	return (
		<nav className="navbar navbar-dark bg-dark container-fluid border-bottom border-light py-0">
			<Link className="navbar-brand mb-0" to="/">
				<span className="navbar-brand mb-0">
					<img src={starWarsLogo} alt="Star Wars Logo" width="80" height="56"></img>
				</span>
			</Link>
			<StarwarsFavoritesDropdown />
			<button className="btn btn-success" onClick={actions.logStuff}>Log Context</button>
		</nav>
	);
};


export const StarwarsFavoritesDropdown = () => {
	const { store } = useContext(Context);

	const listBuilder = store.favourites.map((favourite) => {
		return (
			<li key={favourite.name}>
				<Link className="dropdown-item" to={favourite.uri}>
					{favourite.name}
				</Link>
			</li>
		);
	})

	return (
		<div className="dropdown">
			<button className="btn btn-info dropdown-toggle m-1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				Favourites<span className="badge bg-warning ms-2">{store.favourites.length}</span>
			</button>
			<ul className="dropdown-menu dropdown-menu-end">
				{listBuilder}
			</ul>
		</div>);
};