// Making map
const myMap = L.map("issMap").setView([0, 0], 2.2);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    minZoom: 1,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(myMap);

// Making marker
const iconUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station.svg/320px-International_Space_Station.svg.png";
const issIcon = L.icon({
    iconUrl: iconUrl,
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});
const issMarker = L.marker([0, 0], { icon: issIcon }).addTo(myMap).bindPopup("ISS Location");

// Getting data
async function getData() {
    const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude, altitude } = data;

    // Change icon size depending on altitude
    const aspect = 1.5625;
    const w = (altitude * aspect) / 10;
    const h = altitude / 10;
    issIcon.options.iconSize = [w, h];
    issIcon.options.iconAnchor = [w / 2, h / 2];

    document.getElementById("lat").textContent = latitude.toFixed(2); // Show latitude on html with 2 decimals
    document.getElementById("lon").textContent = longitude.toFixed(2);

    issMarker.setLatLng([latitude, longitude]); // Move the icon
    myMap.setView([latitude, longitude]); // Center to the icon
}

getData();
setInterval(getData, 1500);
