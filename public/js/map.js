
const map = new maplibregl.Map({
    container: 'map',
    style: `https://api.maptiler.com/maps/streets/style.json?key=${mapApiKey}`, // replace with your API key
    center: listing.geometry.coordinates, // dynamically inserted from backend
    zoom: 9
  });
  console.log();

const markerEl = document.createElement('div');
markerEl.className = 'custom-marker';
markerEl.style.backgroundImage = 'url("./assets/images/airbnb.png")'; // Replace with your image URL
markerEl.style.width = '40px';
markerEl.style.height = '40px';
markerEl.style.backgroundSize = 'cover';
markerEl.style.borderRadius = '50%'; // Optional for rounded icons


let marker = new maplibregl.Marker(markerEl)
    .setLngLat(listing.geometry.coordinates)
    .setPopup( new maplibregl.Popup({offset:12})
    .setHTML(`<h4>${listing.title}</h4> <p>Exact Location will be provided after booking</p>`)
    .setMaxWidth("300px"))
    .addTo(map);