
const APIKEYTRENDING = "KtTod9sp8K9SJa6zIX0lrTmLeNt83TVL";

const url = `https://api.giphy.com/v1/trending/searches?api_key=${APIKEYTRENDING}`;




async function bringGifs (gifs){
    return ((await fetch(url)).json());
}

document.addEventListener("DOMContentLoaded", async()=>{
    let trendings = [];


    try{

        trendings = await bringGifs();
    
    }catch(e) {
        console.log(e);
    }

    console.log(trendings);

    function elementosTrending(){

        const trendingsInHTML = document.querySelector("#hereTheTrending");

        for (i = 0; i < 5; i++) {
            const elementSpan = document.createElement("span");
            elementSpan.classList.add("trending-tags");
            elementSpan.innerText = `${trendings.data[i]}${i == 4 ? "" : ','} `;
            trendingsInHTML.appendChild(elementSpan);
            
            
        }

    }
    
    elementosTrending();
    
    
});

