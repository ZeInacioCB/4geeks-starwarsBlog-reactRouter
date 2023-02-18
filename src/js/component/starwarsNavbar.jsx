import React from "react";
import { Link } from "react-router-dom";
import starWarsLogo from "../../img/star-wars-512.png";

export const StarWarsNavbar = () => {
	return (
		<nav className="navbar navbar-dark bg-dark container-fluid border-bottom border-light py-0 px-4">
			<Link className="navbar-brand mb-0" to="/">
				<span className="navbar-brand mb-0">
					<img src={starWarsLogo} alt="Star Wars Logo" width="80" height="56"></img>
				</span>
			</Link>
			<div className="dropdown">
				<button className="btn btn-info dropdown-toggle m-1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					Favourites
				</button>
				<ul className="dropdown-menu dropdown-menu-end">
					<li>
						<Link className="dropdown-item" to="/">
							Dark Vader
						</Link>
					</li>
					<li>
						<Link className="dropdown-item" to="/">
							Mestre Jedi
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};
