const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favourites: []
		},
		actions: {
			loadFavourites: () => {
				//fetch().then().then(data => setStore({ "foo": data.bar }))
				if (localStorage.getItem(`doFavouritesExist`) === "true") {
					const localListResults = JSON.parse(localStorage.getItem(`list/${type}/json`));
					setStore({"favourites": localListResults});
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
					e.className = 'btn btn-outline-warning ms-1';
					const newFavourites = store.favourites.filter(favourite => favourite['name'] !== newFav.name);
					//reset the global store
					setStore({ favourites: newFavourites });
				// adding the newFav to the favourites list if it doesn't
				} else {
					e.className = 'btn btn-warning ms-1';
					//reset the global store
					setStore({ favourites: [...store.favourites, newFav] });
				}
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
