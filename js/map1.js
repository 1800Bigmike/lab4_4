//Citation: workbook and Chat GPT intergration
//creating leaflet map
function createMap() {
    map = L.map('college_football_map', {
        center: [39.8283, -98.5795],
        zoom: 4
    });

    //add tile layer
    L.tileLayer('https://api.mapbox.com/styles/v1/donaldmi/clonhl9e9003s01r7gnt51ksd/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZG9uYWxkbWkiLCJhIjoiY2xvaXlvYzhzMDBiODJsbW84dDg0OGYycyJ9.R7ApXrX_89B27zOIqDVujg', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    getData();

    //legend
//legend
//legend
//legend
var legend = L.control({ position: 'topright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    var legendContent = '<strong>Stadium Capacity </strong><br>';

    // Define stadium capacity tiers and corresponding icon sizes
    var capacityTiers = [
        { capacity: 40000, size: [20, 20], label: '<40000' },
        { capacity: 60000, size: [25, 25], label: '<60000' },
        { capacity: Infinity, size: [40, 40], label: '60000+' }
    ];

    // Loop through capacity tiers to generate legend items
    capacityTiers.forEach(function (tier) {
        legendContent += `<div><img class="symbol" src="data/Football_Icon.svg" style="width:${tier.size[0]}px; height:${tier.size[1]}px;">  ${tier.label}</div>`;
    });

    div.innerHTML = legendContent;
    return div;
};

legend.addTo(map);




}


// List of Pac-12 university cities with their stadium capacities
const pac12StadiumCapacities = {
    'University of Arizona': 55675, // Arizona
    'Arizona State University' : 53599, 
    'University of California, Berkley': 62467, // California
    'University of California, Los Angeles': 88565, // UCLA
    'University of Colorado at Boulder': 50183, // Colorado
    'University of Oregon': 54000, // Oregon
    'Oregon State University': 35548, // Oregon State
    'Stanford University': 50424, // Stanford
    'University of Southern California': 77500, // USC
    'University of Utah': 45807, // Utah
    'University of Washington': 70138, // Washington
    'Washington State University at Pullman' : 32740 // Washington State
};

var footballIcon = L.icon({
    iconUrl: 'data/Football_Icon.svg', // Replace with the actual path to your SVG file
    iconSize: [20, 20], // Adjust the size as needed
    iconAnchor: [10, 10] // Adjust the anchor point to center the icon
});

function getData() {
    // Load the data
    fetch("data/Football_stadiums.geojson")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            // Create a geojson layer with custom SVG icons for Pac-12 cities
            L.geoJson(json, {
                pointToLayer: function (feature, latlng) {
                    var city = feature.properties.COMP_AFFIL;

                    // Check if the city is in the list of Pac-12 cities
                    if (pac12StadiumCapacities.hasOwnProperty(city)) {
                        var stadiumCapacity = pac12StadiumCapacities[city];

                    // Calculate the icon size based on stadium capacity
                var iconSize;
                if (stadiumCapacity < 40000) {
                     iconSize = [20, 20];
                } else if (stadiumCapacity < 60000) {
                    iconSize = [25, 25];
                } else {
                    iconSize = [40, 40];
                }


                        // Create a marker with the custom SVG icon and adjusted size
                        var marker = L.marker(latlng, {
                            icon: L.icon({
                                iconUrl: 'data/Football_Icon.svg', 
                                iconSize: iconSize,
                               
                            })
                        });

                        // Popup with the university name and stadium capacity
                        marker.bindPopup('University: ' + city + '<br>Stadium Capacity: ' + stadiumCapacity);

                        marker.addTo(map);
                    }
                }
            });
        });
}

document.addEventListener('DOMContentLoaded', createMap);
