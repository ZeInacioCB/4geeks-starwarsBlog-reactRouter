// function to transform a key value string from the SWAPI into an UI readable element
export const snakeToUpperWord = str => {
    let camelCase = str.toLowerCase().replace(/([-_][a-z])/g, group =>
        group.toUpperCase().replace('-', ' ').replace('_', ' ')
      )
    let upperFirstLetter = camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
    return upperFirstLetter;
};

// function to handle error when an image does not exist
export const imgErrorHandler = e => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
  e.currentTarget.className = 'card-img-top img-fluid img-card-custom';
}