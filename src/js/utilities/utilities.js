export const snakeToUpperWord = str => {
    let camelCase = str.toLowerCase().replace(/([-_][a-z])/g, group =>
        group.toUpperCase().replace('-', ' ').replace('_', ' ')
      )
    let upperFirstLetter = camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
    return upperFirstLetter;
};