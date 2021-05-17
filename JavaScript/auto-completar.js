const searchContainer = document.getElementById("searchContainer");
const searchInput = document.getElementById("search");

searchContainer.addEventListener("keyup", function(event){
    event.preventDefault()
    const term = searchInput.value;
    suggestionFunction(term);

})



function suggestionFunction (term){
    const APIKEYAUTO = "KtTod9sp8K9SJa6zIX0lrTmLeNt83TVL";
    const url = `https://api.giphy.com/v1/tags/related/${term}?api_key=${APIKEYAUTO}&limit=4`;
    
    fetch(url).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);
        const suggestionBox = document.getElementById("suggestionBox");
        suggestionBox.innerHTML = "";
        json.data.forEach(function(suggestion){
            console.log(suggestion.name);
            const suggestionNode = document.createElement("div");
            suggestionNode.classList.add("suggestionDiv");
            suggestionNode.innerText = suggestion.name;
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





