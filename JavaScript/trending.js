


const APIKEY = "KtTod9sp8K9SJa6zIX0lrTmLeNt83TVL";
const url = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=5`;


fetch(url).then(function(response){
        return response.json()
        }).then(function(json){
            console.log(json);

        }).catch(function (err) {
             console.log(err.message)
})