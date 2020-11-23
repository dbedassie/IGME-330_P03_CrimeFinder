import * as map from './map.js';

function setupUI() {
}

function init() {
    map.initMap();
    map.loadMarkers();
    map.addMarkersToMap();
    setupUI();
}

export {
    init
};
