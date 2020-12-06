import * as map from './map.js';
import * as routes from './routes.js'

function setupUI() {
    let openBtn = document.querySelector("#openBtn");
    let sidebar = document.querySelector("#sideBar");
    let main = document.querySelector("#main");
    let open = false;

    openBtn.onclick = (e) => {
        if(open) {
            sidebar.style.width = "250px";
            main.style.marginLeft = "250px";
            openBtn.innerHTML = "&#9776; Close Sidebar"
            open = !sidebar;
        }
        else if(!open) {
                sidebar.style.width = "0";
                main.style.marginLeft = "0";
                openBtn.innerHTML = "&#9776; Open Sidebar";
                open = !open;
            }
        
    }
}

function init() {
    map.initMap();
    map.loadMarkers();
    map.addMarkersToMap();
   routes.getRoutesForLatLon(40.03,-105.25, 60,150,"5.6","5.10");
    setupUI();
}

export {
    init
};
