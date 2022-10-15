import fromExponential from 'from-exponential';

export const capitalizeFirstLetter = (string = '') => {
    const words = string.split('-')
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
};

export const numbersWithCommas = (x) => {
    if (x < 1) {
        return fromExponential(x)
    } 
    const output = x.toLocaleString()
    return output.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}