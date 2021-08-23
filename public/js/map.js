let coordinates = [0, 0]; //placeholder
$.getJSON(
  "https://api.ipgeolocation.io/ipgeo?apiKey=dbdb849ba3e34c6bb6536bead4801a85",
  function (data) {
    coordinates = [data.longitude, data.latitude];
  }
);

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXN5dWtzZWsiLCJhIjoiY2tzMHduMnBoMDI5aDMybzMyc293aHRieCJ9.PvJ7r4WU6mSZZnooLxvO1Q";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: coordinates,
});

// Add controllers
map.addControl(
  new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  marker: false,
  mapboxgl: mapboxgl
  }),
  );
  map.addControl(new mapboxgl.NavigationControl());




async function getStores() {
  let locations = await fetch("/map/getAddress");
  locations = await locations.json();
  console.log(locations);

  const data = locations.data.map((location) => {
    
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          location.location.coordinates[0],
          location.location.coordinates[1],
        ],
      },
    };

    
  });

  loadMap(data);
}

function loadMap(locations) {
  let hello = {
    "text-field": "HELLOWORLD",
    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    "text-offset": [0, 0.9],
    "text-anchor": "top",
    // "visibility": "none"
  };

  for (const marker of locations) {
    // Create a DOM element for each marker.
    const el = document.createElement('div');
    const width = 40;
    const height = 40;
    el.className = 'marker';
    var elem = document.createElement("img");
    el.appendChild(elem);
    elem.src = 'https://img.icons8.com/material-rounded/24/000000/exercise.png'
    // el.style.backgroundImage = '<img src="https://img.icons8.com/material-rounded/24/000000/exercise.png"/>';
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = '100%';
     
    el.addEventListener('click', () => {
    window.alert("hello");
    });
    // el.style.visibility = "hidden";
    // Add markers to the map.
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
    }

  map.on("load", () => {
    map.flyTo({
      center: coordinates,
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
   });
    map.addSource("point", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: locations,
      },
    });

    map.addLayer({
      id: "points",
      type: "symbol",
      source: "point",
      layout: hello,
    });
  });
}

getStores();
