let map;
let geojson = {
    type: 'FeatureCollection',
    features: []
};

function initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFiNjA4NCIsImEiOiJja2hkejFnbWgwMDUyMnFwbDViaTlrampqIn0.IL2DpOdf-QLlUPovKhZvKA';

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        zoom: 4
    });

    // The 'building' layer in the mapbox-streets vector source contains building-height
    // data from OpenStreetMap.
    map.on('load', function () {
        
        // Make map center on the US
        map.fitBounds([[-133.2421875, 16.972741], [-47.63671875, 52.696361]]);
        
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

function getMousePointer() {
    map.on('click', function (e) {
        let lng = JSON.stringify(e.lngLat.lng);
        let lat = JSON.stringify(e.lngLat.lat);
    })
}

function addMarkersToMap() {
    // add markers to map
    for (let feature of geojson.features) {
        /*
            // create a HTML element for each feature
        let el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
        new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({
                    offset: 25
                }) // add popups
                .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>'))
            .addTo(map);
        */
        
        addMarker(feature.geometry.coordinates, feature.properties.title, feature.properties.description, feature.properties.className = "marker");
    }
}

function addMarker(coordinates, title, description, className) {
    let el = document.createElement('div');
    el.className = className;
    
    new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({ offset : 25}) // add popups
        .setHTML('<h3>' + title + '</h3><p>' + description + '</p>'))
        .addTo(map);
}

function loadMarkers() {
    /*const coffeeShops = [
        {
            latitude: 43.084156,
            longitude: -77.67514,
            title: "Artesano Bakery & Cafe"
	},

        {
            latitude: 43.083866,
            longitude: -77.66901,
            title: "Beanz"
	},

        {
            latitude: 43.082520,
            longitude: -77.67980,
            title: "Starbucks"
	},

        {
            latitude: 43.086678,
            longitude: -77.669014,
            title: "The College Grind"
	},

        {
            latitude: 43.082634,
            longitude: -77.68004,
            title: "The Cafe & Market at Crossroads"
	},

        {
            latitude: 43.08382,
            longitude: -77.674805,
            title: "RITZ Sports Zone"
	},

        {
            latitude: 43.086502,
            longitude: -77.66912,
            title: "The Commons"
	},

        {
            latitude: 43.08324,
            longitude: -77.68105,
            title: "The Market at Global Village"
	},

        {
            latitude: 43.08384,
            longitude: -77.67457,
            title: "Brick City Cafe"
	},

        {
            latitude: 43.084904,
            longitude: -77.6676,
            title: "Corner Store"
	},

        {
            latitude: 43.08464,
            longitude: -77.680145,
            title: "CTRL ALT DELi"
	},

        {
            latitude: 43.08359,
            longitude: -77.66921,
            title: "Gracie's"
	}
];*/
    let POI = [];
    // now convert this data to GeoJSON
    for (let shop of POI) {
        // an "empty" GEOJSON feature
        const newFeature = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: []
            },
            properties: {
                title: "",
                description: ""
            }
        };

        // add some properties for the current coffee shop
        newFeature.geometry.coordinates[0] = shop.longitude;
        newFeature.geometry.coordinates[1] = shop.latitude;
        newFeature.properties.title = shop.title;

        // push it on to the 'geojson' array
        geojson.features.push(newFeature);
    }
    console.log(geojson.features);
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
    getMousePointer,
    loadMarkers,
    addMarkersToMap,
    flyTo,
    setPitchAndBearing,
    setZoomLevel,
    addMarker
};