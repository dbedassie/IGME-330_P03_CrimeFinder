import * as map from './map.js';

function setupUI() {
    let openBtn = document.querySelector("#openBtn");
    let closeBtn = document.querySelector("#closeBtn");
    let sidebar = document.querySelector("#sideBar");
    let main = document.querySelector("#main");

    openBtn.onclick = (e) => {
        sidebar.style.width = "250px";
        main.querySelector("#main").style.marginLeft = "250px";
    }

    closeBtn.onclick = (e) => {
        sidebar.style.width = "0";
        main.style.marginLeft = "0";
    }
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
