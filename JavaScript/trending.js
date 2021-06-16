
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

    function elementosTrending(){
        const trendingsInHTML = document.querySelector("#hereTheTrending");

        for (i = 0; i < 5; i++) {
            const elementSpan = document.createElement("span");
            elementSpan.classList.add("trending-tags");
            const spanValue = trendings.data[i];
            elementSpan.innerText = `${spanValue}${i == 4 ? "" : ','} `;
            trendingsInHTML.appendChild(elementSpan);  
            
            elementSpan.addEventListener("click", (e) =>{
                e.preventDefault();
                const searchBar = document.getElementById("search");
                searchBar.value = spanValue;
                const searchBtn = document.getElementById("btnSearch");
                searchBtn.click();                
            });
        }

    }
    elementosTrending(); 
});

