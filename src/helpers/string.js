export const capitalizeFirstLetter = (string = '') => {
    const words = string.split('-')
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
};

export const numbersWithCommas = (x) => {
    return x.toLocaleString()
}