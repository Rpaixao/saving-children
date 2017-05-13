const countries = [
    {value: 'Kenya',        position: { lat: 7.946527,  lng: -1.0231939999999895 }, key: `Kenya`,       defaultAnimation: 2},
    {value: 'Costa Rica',   position: { lat: 9.74891699,lng: -83.75342799999999 },  key: `Costa Rica`,  defaultAnimation: 2},
    {value: 'Uganda',       position: { lat: 1.373333,  lng: 32.290275000000065 },  key: `Uganda`,      defaultAnimation: 2},
    {value: 'Tanzania',      position: { lat: -6.369028, lng: 34.888822000000005 },  key: `Tanzania`,       defaultAnimation: 2},
    {value: 'Peru',         position: { lat: -9.189967, lng: -75.015152 },          key: `Peru`,       defaultAnimation: 2},
    {value: 'India',        position: { lat: 20.593684, lng: 78.96288000000004 },   key: `India`,       defaultAnimation: 2},
    {value: 'Philipines',   position: { lat: 12.879721, lng: 121.77401699999996 }, key: `Philipines`,       defaultAnimation: 2},
    {value: 'Guatemala',   position: { lat: 15.783471, lng: -90.23075899999998 }, key: `Guatemala`,       defaultAnimation: 2},
]

function getItemByValue (catalog, value) {
    return catalog && catalog.find((itemValue) => itemValue.value === value);
}

export default {

    getMarkerByCountryName (countryName) {
        var marker = getItemByValue(countries, countryName);
        return marker;

    },
};
