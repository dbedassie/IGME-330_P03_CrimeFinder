
const APIKEY = "200989260-bba9ebf64d9ab61b88c33112f6c75d8f"
const APIBASE = "https://www.mountainproject.com/data/"
import * as main from "./main.js"

let routeList;
function getRoutesForLatLon(lat, lon, maxDistance = 200, maxResults = 100, minDiff, maxDiff) {
    let url = APIBASE + "get-routes-for-lat-lon?lat=" + lat + "&lon=" + lon + "&maxDistance=" + maxDistance + "&maxResults=" + maxResults
    if (minDiff != 0 && maxDiff != 0) {
        url += "&minDiff=" + minDiff + "&maxDiff=" + maxDiff;
    }
    url += "&key=" + APIKEY;
    console.log(url);
    let testurl = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${lat}&lon=-105.25&maxDistance=200&minDiff=5.6&maxDiff=5.10&key=200989260-bba9ebf64d9ab61b88c33112f6c75d8f`
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.open("GET", url);
    xhr.send();
}

function dataLoaded(e) {

    let obj = JSON.parse(e.target.responseText);
    console.log(obj.routes.length)
    routeList = [];
    for (let i = 0; i < obj.routes.length; i++) {
        let r = obj.routes[i];
        routeList[i] = new Route(r.name, parseType(r.type), r.rating, r.stars, r.starvotes, r.lat, r.lon, r.url);

    }
    main.applyFilters();

}

function parseGrade(grade) {
    let num;
    //ropes
    if (grade[0] == "5" && grade[1] == '.') {
        num = Number(grade[2]);
        if (Number(grade[3])) {
            num += Number(grade[3]);
        }
        num += .5
        switch (grade[4]) {
            case 'a':
                num -= .40;
                break;
            case 'b':
                num -= .20;
                break;
            case 'c':
                num += .20;
                break;
            case 'd':
                num += .40;
                break;
            case '-':
                num -= .25;
                break;
            case '+':
                num += .25;
        }
    }
    //bouldering
    else if (grade[0] == "V") {
        num = Number(grade[1]) + .5;
        if (grade[2] == "+") {
            num += .25
        }
        else if (grade[2] == "-") {
            num += -.25
        }
    }
    //ice
    else if (grade[0] == "W") {
        num = Number(grade[2]) + .5;
        if (grade[3] == "+") {
            num += .25
        }
        else if (grade[3] == "-") {
            num += -.25
        }

    }
    //failsafe, dont wanna deal with it so return an absurdly high grade
    else {
        return 200;
    }
    return num;

}

function parseType(type) {
    let newType = type.split(",")[0]
    if (newType == "Boulder" || newType == "Sport" || newType == "Trad") {
        return newType;
    }
    return "nah";
}
class Route {
    constructor(name, type, grade, stars, starvotes, lat, lon, url) {
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

function filterRoutes(type, minDiff, maxDiff, minStars, maxStars) {
    let arr = [];
    if(routeList){
    for (let i = 0; i < routeList.length; i++) {
        if (type == routeList[i].type) {
            let g = parseGrade(routeList[i].grade);
            if (g > minDiff && g < maxDiff) {
                 if (Number(routeList[i].stars) > minStars && Number(routeList[i].stars) < maxStars) {
                    arr.push(routeList[i]);
                 }
            }
        }
    }
}
    console.log(type + ": " + arr)
    return arr;
}


export { getRoutesForLatLon, filterRoutes };