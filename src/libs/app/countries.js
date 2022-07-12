const allCountries = [
  [ 'Kenya', 'ke', '254' ],
];
  
export default allCountries.map(([name, iso2, dialCode]) => {
  console.log(name, iso2, dialCode)
  
  return { name, dialCode}
});