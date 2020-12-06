
const APIKEY = "200989260-bba9ebf64d9ab61b88c33112f6c75d8f"
const APIBASE = "https://www.mountainproject.com/data/"


function getRoutesForLatLon(lat, lon, maxDistance = 30, maxResults = 50, minDiff = "5.6", maxDiff = "5.10"){
    let url = APIBASE + "get-routes-for-lat-lon?lat=" + lat + "&lon=" + lon + "&maxDistance=" + maxDistance + "&maxResults="+ maxResults + "&minDiff="+ minDiff +"&maxDiff=" + maxDiff + "&key=" + APIKEY;
    
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.open("GET", url);
    xhr.send();
}

function dataLoaded(e){
    
    let obj = JSON.parse(e.target.responseText);
    console.log(obj.routes[1].name)
    let routeObj = [];
    for(let i =0; i < obj.routes.length; i++){
        let r = obj.routes[i] 
        routeObj[i] = new Route(r.name,r.type,r.rating,r.stars,r.starvotes,r.lat,r.lon,r.url);
    }
}
class Route{
    constructor(name,type,grade,stars,starvotes,lat,lon,url){
        this.name = name;
        this.type = type;
        this.grade = grade;
        this.stars = stars;
        this.starvotes = starvotes;
        this.lat = lat;
        this.lon = lon;
        this.url = url;
    }
}
export{getRoutesForLatLon};