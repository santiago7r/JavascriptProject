const searchContainer = document.getElementById("searchContainer");
const searchInput = document.getElementById("search");
const searchBtninput = document.querySelector("#btnSearch");

searchInput.insertAdjacentElement('afterend', searchBtninput);

searchInput.addEventListener("input", e => {
    const term = e.target.value;

    if (term !== undefined && term !== ""){
        suggestionFunction(term); 
    }

    if (term === undefined || term === ""){
    }else{
        suggestionBox.style.display = "block";
    }

})

function suggestionFunction (term){
    const APIKEYAUTO = "KtTod9sp8K9SJa6zIX0lrTmLeNt83TVL";
    const url = `https://api.giphy.com/v1/tags/related/${term}?api_key=${APIKEYAUTO}&limit=4`;
    
    fetch(url).then(function(response){
        return response.json()
    }).then(function(json){

        const suggestionBox = document.getElementById("suggestionBox");
        suggestionBox.innerHTML = "";
        json.data.forEach(function(suggestion){

            const suggestionNode = document.createElement("div");
            const searchMiniLogo = document.createElement("img");
            searchMiniLogo.src ="./assets/icon-search-mod-noc.svg";


            suggestionNode.classList.add("suggestionDiv");
            suggestionNode.innerText = suggestion.name;

            suggestionNode.insertAdjacentElement('afterbegin', searchMiniLogo);
            searchMiniLogo.style.width = "15px";
            searchMiniLogo.style.height = "15px";
            searchMiniLogo.style.marginRight = "5px";

            suggestionNode.addEventListener("click", (e) =>{
                e.preventDefault();
                const searchBar = document.getElementById("search");
                searchBar.value = suggestion.name;
                const searchBtn = document.getElementById("btnSearch");
                searchBtn.click();                
            })
            suggestionBox.appendChild(suggestionNode);
        });
    
    }).catch(function (err) {
        console.log(err.message);
    })
}





