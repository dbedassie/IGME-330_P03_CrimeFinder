let map;
let geojson = {
    type: 'FeatureCollection',
    features: []
};
let lng, lat;
let mapMarkers = new Array();

function initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFiNjA4NCIsImEiOiJja2hkejFnbWgwMDUyMnFwbDViaTlrampqIn0.IL2DpOdf-QLlUPovKhZvKA';

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        zoom: 4
    });

    map.on('click', function (e) {
        lng = JSON.stringify(e.lngLat.lng);
        lat = JSON.stringify(e.lngLat.lat);
      
    })

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
    return {lon: lng, lat: lat};
}

function addMarker(coordinates, title, description, className, type) {
    let el = document.createElement('div');
    el.className = className;
    let popupClass = "";
    
    if(type == "Boulder"){
        popupClass = "bouldering";
    } else if(type == "Sport"){
        popupClass = "sport";
    } else if(type == "Trad"){
        popupClass = "trad";
    }
    
    new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({offset : 25, className : popupClass})
        .setHTML('<h3>' + title + '</h3><br><p>' + description + '</p>'))
        .addTo(map);
}

function addMarkersToMap() {
    for (let feature of geojson.features) {
        addMarker(feature.geometry.coordinates, feature.properties.title, feature.properties.description, feature.properties.className = "marker", feature.properties.type);
    }
}

function loadMarkers(routes) {
    geojson.features = [];
    for (let feature of routes) {
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

        // add some properties for the current route
        newFeature.geometry.coordinates[0] = feature.lon;
        newFeature.geometry.coordinates[1] = feature.lat;
        newFeature.properties.title = feature.name;
        for (let desc of feature.location) {
            newFeature.properties.description += desc + "<br>";
        }
        newFeature.properties.description += `<a href=${feature.url}>URL`;
        newFeature.properties.type = feature.type;
        console.log(feature.name);
        console.log(feature.location);

        // push it on to the 'geojson' array
        geojson.features.push(newFeature);
    }
    console.log(geojson.features);
    addMarkersToMap();
}

function clearMarkers() {
    for (let feature of geojson.features) {
        feature.remove();
    }
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