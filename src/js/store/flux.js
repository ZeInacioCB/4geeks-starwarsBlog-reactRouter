const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favourites:[
				{
				  "uid": "1",
				  "name": "Luke Skywalker",
				  "url": "https://www.swapi.tech/api/people/1"
				},
				{
				  "uid": "2",
				  "name": "C-3PO",
				  "url": "https://www.swapi.tech/api/people/2"
				},
				{
				  "uid": "3",
				  "name": "R2-D2",
				  "url": "https://www.swapi.tech/api/people/3"
				},
				{
				  "uid": "4",
				  "name": "Darth Vader",
				  "url": "https://www.swapi.tech/api/people/4"
				},
				{
				  "uid": "5",
				  "name": "Leia Organa",
				  "url": "https://www.swapi.tech/api/people/5"
				},
				{
				  "uid": "6",
				  "name": "Owen Lars",
				  "url": "https://www.swapi.tech/api/people/6"
				},
				{
				  "uid": "8",
				  "name": "R5-D4",
				  "url": "https://www.swapi.tech/api/people/8"
				},
				{
				  "uid": "10",
				  "name": "Obi-Wan Kenobi",
				  "url": "https://www.swapi.tech/api/people/10"
				}
			  ]
		},
		actions: {
			loadSomeData: () => {
				//fetch().then().then(data => setStore({ "foo": data.bar }))
				if (localStorage.getItem(`list/${type}/data`) === "true") {
					const localListResults = JSON.parse(localStorage.getItem(`list/${type}/json`));
					setStore({"favourites": localListResults});
				} else {
					fetch(apiUrl)
					.then(res => res.json())
					.then(data => {
						setStore({"favourites": data.results});
						localStorage.setItem(`list/${type}/data`, 'true');
						localStorage.setItem(`list/${type}/json`, JSON.stringify(data.results));
					})
					.catch(err => console.error(err))
				}       
			},
			// Click Handler to add and remove favourites
			favouritesClickHandler: (e) => {
				//get the store
				const store = getStore();
				// declaring the new favourite resource to be added or removed
				const newFav = {name: e.name, uri: e.value};

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
					setStore({ favourites: prev => [...prev, newFav] });
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
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
