const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favourites: []
		},
		actions: {
			loadFavourites: () => {
				// get the store
				const store = getStore();
				// get the stored favourites from local storage if they exists
				if(Object.keys(window.localStorage).includes("favourites")) {
					const storedFavourites = JSON.parse(window.localStorage.getItem("favourites"))
					setStore({ favourites: storedFavourites });
				}
			},
			// Click Handler to add and remove favourites
			favouritesClickHandler: (e) => {
				//get the store
				const store = getStore();
				// declaring the new favourite resource to be added or removed
				const newFav = {name: e.currentTarget.name, uri: e.currentTarget.value};
				// removing from the favourites list if already exists
				if (store.favourites.some( favourite => favourite['name'] === newFav.name )) {
					e.currentTarget.className = 'btn btn-outline-warning ms-1';
					const newFavourites = store.favourites.filter(favourite => favourite['name'] !== newFav.name);
					//reset the global store
					setStore({ favourites: newFavourites });
				// adding the newFav to the favourites list if it doesn't
				} else {
					e.currentTarget.className = 'btn btn-warning ms-1';
					//reset the global store
					setStore({ favourites: [...store.favourites, newFav] });
				}

				// store the values into localStorage
				localStorage.setItem("favourites", JSON.stringify(store.favourites));
			},
			// check if an uri exist or not in the store favourites list
			isFavourite: (uri) => {
				//get the store
				const store = getStore();
				// if it exists, returns true
				if (store.favourites.some( favourite => favourite['uri'] === uri )) return true;
				else return false;
			},
			logStuff: () => {
				//get the store
				const store = getStore();
				console.log(store.favourites)
			}
		}
	};
};

export default getState;
