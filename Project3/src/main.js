import * as map from './map.js';
import * as routes from './routes.js'

function setupUI() {
    let openBtn = document.querySelector("#openBtn");
    let sidebar = document.querySelector("#sideBar");
    let main = document.querySelector("#main");
    let legend = document.querySelector("#legend");
    let open = false;

    openBtn.onclick = (e) => {
        if (open) {
            sidebar.style.width = "250px";
            main.style.marginLeft = "250px";
            open = !sidebar;
        } else if (!open) {
            sidebar.style.width = "0";
            main.style.marginLeft = "0";
            open = !open;
        }

    }

    // Setting up the map legend
    let starNum = ['A', 'B', 'C', 'D', 'E'];
    let colors = ['#00FF00', '#7FFF00', '#FFFF00', '#FFF000', '#FF0000'];
    
    for (let i = 0; i < starNum.length; i++) {
        let layer = starNum[i];
        let color = colors[i];
        let item = document.createElement('div');
        let key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;

        let value = document.createElement('span');
        value.innerHTML = layer;
        value.style.color = 'black';
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    }
}

function init() {
    map.initMap();
    map.loadMarkers();
    map.addMarkersToMap();
    //routes.getRoutesForLatLon(40.03,-105.25, 60,150,"5.6","5.10");
    setupUI();

    document.querySelector('#map').onclick = (e) => {
        searchOnClick();
    }

}

function searchOnClick() {
    map.getMousePointer();
}

export {
    init
};
