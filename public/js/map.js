document.addEventListener("DOMContentLoaded", function () {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) return;

  // Read dataset values from show.ejs
  const coords = JSON.parse(mapDiv.dataset.coords); // [lng, lat]
  const title = mapDiv.dataset.title;
  const location = mapDiv.dataset.location;

  // OpenStreetMap tiles style
  const osmStyle = {
    version: 8,
    sources: {
      "osm-tiles": {
        type: "raster",
        tiles: [
          "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
          "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
          "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ],
        tileSize: 256,
        attribution: "© OpenStreetMap contributors"
      }
    },
    layers: [{ id: "osm-tiles", type: "raster", source: "osm-tiles" }]
  };

  // Create MapLibre map
  const map = new maplibregl.Map({
    container: "map",
    style: osmStyle,
    center: coords, // [lng, lat]
    zoom: 9
  });

  // ✅ Add marker + popup
  new maplibregl.Marker()
    .setLngLat(coords)
    .setPopup(
      new maplibregl.Popup({ offset: 25 })
        .setHTML(`<h4>${title}</h4><p>${location}</p>`)
    )
    .addTo(map);
});
