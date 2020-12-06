// API -- https://crime-data-explorer.fr.cloud.gov/api
// Used for educational purposes.

function initCrime(){
    const APIKEY = "57JhfaFa8TjOKREzR4MAuVdY8chOQxGuoOZSffv6";
    let APIString = "https://api.usa.gov/crime/fbi/sapi/api/nibrs/homicide/offense/states/IL/count?API_KEY="
    APIString += APIKEY;
    let obj;
    fetch(APIString).then(response =>{
        if(!response.ok){
            throw Error(`ERROR: ${response.statusText}`);
        }
        return response.getCrimeCount("states","homicide","IL");
    }).then(json =>{
        console.log(json);
        obj = json;
    })

    console.log(obj);
}

export{initCrime};

// In here we plan to integrate functions that allow the crime API to interact with the map API to show where crimes are happening and to navigate a timeline to show data as well.