let map;
let geojson = {
    type: 'FeatureCollection',
    features: []
};

function initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFiNjA4NCIsImEiOiJja2hkejFnbWgwMDUyMnFwbDViaTlrampqIn0.IL2DpOdf-QLlUPovKhZvKA';

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-96.50390625,
          40.01078714046552],
        zoom: 4
    });

    // The 'building' layer in the mapbox-streets vector source contains building-height
    // data from OpenStreetMap.
    map.on('load', function () {
        // Insert the layer beneath any symbol layer.
        var layers = map.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }

        map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',

                    // use an 'interpolate' expression to add a smooth transition effect to the
                    // buildings as the user zooms in
                    'fill-extrusion-height': [
                                        'interpolate',
                                        ['linear'],
                                        ['zoom'],
                                        15,
                                        0,
                                        15.05,
                                        ['get', 'height']
                                        ],
                    'fill-extrusion-base': [
                                        'interpolate',
                                        ['linear'],
                                        ['zoom'],
                                        15,
                                        0,
                                        15.05,
                                        ['get', 'min_height']
                                        ],
                    'fill-extrusion-opacity': 0.6
                }
            },
            labelLayerId
        );
    });
}

function addMarkersToMap() {
    // add markers to map
    for (let feature of geojson.features) {

    }
}

function addMarker(coordinates, title, description, className) {
    let el = document.createElement('div');
    el.className = className;

    new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({
                offset: 25
            }) // add popups
            .setHTML('<h3>' + title + '</h3><p>' + description + '</p>'))
        .addTo(map);
}

function loadMarkers() {

}

function addCirclesToMap() {
    /*
        TO DO:
            Create circles on maps based on array of data.
            Ethnicity, type of crime, etc.
            Sort each of these categories with their own color.
            Let user choose which data they would like to see and show data that way.
            Once data type is chosen, we must let the user know what color is which.
                - This can mean using hte same colors throughout the entire program and just changing the text on a table or what have you on what each color represents.
    */
}

function flyTo(center = [0, 0]) {
    map.flyTo({
        center,
        center
    });
}

function setZoomLevel(value = 0) {
    map.setZoom(value);
}

function setPitchAndBearing(pitch = 0, bearing = 0) {
    map.setPitch(pitch);
    map.setBearing(bearing);
}

export {
    initMap,
    loadMarkers,
    addMarkersToMap,
    addCirclesToMap,
    flyTo,
    setPitchAndBearing,
    setZoomLevel,
    addMarker
};
