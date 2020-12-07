import * as map from './map.js';
import * as routes from './routes.js'

let curlatlon;
let routeArray;
let filterBouldering, filterSport, filterTrad;
let bminDiff, bmaxDiff, tminDiff, tmaxDiff, sminDiff, smaxDiff;
let minStars, maxStars;
function setupUI() {
    let openBtn = document.querySelector("#openbtn");
    let closeBtn = document.querySelector("#closebtn");
    let searchBtn = document.querySelector("#searchbtn");
    let sidebar = document.querySelector("#sidebar");
    let main = document.querySelector("#main");
    let legend = document.querySelector("#legend");
    let open = false;
    let boulderingBtn = document.querySelector("#boulderingBtn");
    let sportBtn = document.querySelector("#sportBtn");
    let tradBtn = document.querySelector("#tradBtn");
    curlatlon = document.querySelector("#curlatlon");
    bminDiff = document.querySelector("#b-diffStart");
    bmaxDiff = document.querySelector("#b-diffEnd");
    sminDiff = document.querySelector("#s-diffStart");
    smaxDiff = document.querySelector("#s-diffEnd");
    tminDiff = document.querySelector("#t-diffStart");
    tmaxDiff = document.querySelector("#t-diffEnd");
    minStars = document.querySelector("#starSelect");
    maxStars = document.querySelector("#starsEnd");

    openBtn.onclick = (e) => {
        if(!open) {
            sidebar.style.width = "250px";
            main.style.marginLeft = "250px";
            open = true;
        }
        else{
            sidebar.style.width = "0";
            main.style.marginLeft = "0";
            open = false;
        }
    }
    
    closeBtn.onclick = (e) => {
        sidebar.style.width = "0";
        main.style.marginLeft = "0";
        open = false;
    }

    searchBtn.onclick = (e) =>{
        routes.filterRoutes("bouldering","d","d");
    }

    //code for collapsables adapted from w3schools.com
    boulderingBtn.onclick  =(e) =>{
        setUpCollapsable(boulderingBtn);
        filterBouldering = !filterBouldering;
    }

    sportBtn.onclick = (e) =>{
        setUpCollapsable(sportBtn);
        filterSport != filterSport;
    }

    tradBtn.onclick = (e) =>{
        setUpCollapsable(tradBtn);
        filterTrad != filterTrad;
    }

    // Setting up the map legend
    let starNum = ['Bouldering', 'Sport', 'Trad'];
    let colors = ['#00FF00', '#FFFF00', '#FF0000'];
    
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

function setUpCollapsable(button){
    let content = button.nextElementSibling;
    if(content.style.display === "block"){
        content.style.display = "none";
    }
    else{
        content.style.display = "block";
    }
}

function init() {
    map.initMap();
    //routes.getRoutesForLatLon(40.03,-105.25, 60,150,"5.6","5.10");
    setupUI();
    routeArray = [];
    filterBouldering = true;
    filterSport = true;
    filterTrad = true;

    document.querySelector('#map').onclick = (e) => {
        searchOnClick();
    }
    

}

function searchOnClick() {
   let latlon = map.getMousePointer();
   curlatlon.children[0].innerHTML = "Current Longitude: " + latlon.lon + "<p>";
   curlatlon.children[1].innerHTML = "Current latitude: " + latlon.lat;
   routes.getRoutesForLatLon(latlon.lat, latlon.lon)
    
   console.log(routeArray);
    map.loadMarkers(routeArray);
}

function applyFilters(){
     routeArray = [];
    let minStar = minStars.value;
    let maxStar = maxStars.value;
    if(filterBouldering){
       routeArray = routeArray.concat(routes.filterRoutes("Boulder", bminDiff.value, bmaxDiff.value,minStar,maxStar));
    }
    if(filterSport){
        routeArray = routeArray.concat(routes.filterRoutes("Sport",sminDiff.value, smaxDiff.value,minStar,maxStar));
    }
    if(filterTrad){
        routeArray = routeArray.concat(routes.filterRoutes("Trad",tminDiff.value, tmaxDiff.value,minStar,maxStar));
    }
  
}

export {
    init,
    applyFilters
};
