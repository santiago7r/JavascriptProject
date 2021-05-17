let APIKEY = "KtTod9sp8K9SJa6zIX0lrTmLeNt83TVL";
document.addEventListener("DOMContentLoaded", init);
function init() {
  document.getElementById("btnSearch").addEventListener("click", ev => {
    ev.preventDefault();

    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&q=`;
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(content => {
        //  data, pagination, meta
        content.data.forEach(gifo => {
          
          
          let fig = document.createElement("figure");
          let img = document.createElement("img");
          img.src = gifo.images.downsized.url;
          img.alt = gifo.title;
          fig.appendChild(img);
          let out = document.querySelector(".out");
          out.insertAdjacentElement("afterbegin", fig);
          
        });
        console.log(content.data);
        console.log("META", content.meta);
        
        document.querySelector("#search").value = "";
        const suggestionBox = document.getElementById("suggestionBox");
        suggestionBox.innerHTML = "";



      })
      .catch(err => {
        console.error(err);
      });
  });
}