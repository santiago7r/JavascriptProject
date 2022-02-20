
const APIKEY = "KtTod9sp8K9SJa6zIX0lrTmLeNt83TVL";
let SEARCHOFFSET = 0;
let LIMITVALUE = 12;

document.addEventListener("DOMContentLoaded", init);

const toggleButtons = e => {
  const inputValue = e.target.value;
  console.log('inputValue', inputValue);
  if (inputValue !== "" && inputValue !== undefined) {
    btnSearchClose.style.display = "inline";
    btnSearch.style.display = "none";
  } else {
    btnSearchClose.style.display = "none";
    btnSearch.style.display = "inline";
  }
}

const renderGrid = (ev, sholdClearContent = true) => { 
  ev.preventDefault();
  let str = document.getElementById("search").value.trim();
  console.log("Value of STR111111", str)
  
  toggleButtons({
    target:{
      value:str
    }
  });

  if(sholdClearContent){
    out.innerHTML ="";
  }

  let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&offset=${SEARCHOFFSET}&limit=${LIMITVALUE}&q=${str}`;

  fetch(url)
    .then(response => response.json())
    .then(content => {

      let headerSearch = document.querySelector('#search-header');
      headerSearch.innerHTML ="";
      let headerSearchTittle = document.createElement("h2");
      headerSearchTittle.innerText = `${str}`;
      headerSearch.appendChild(headerSearchTittle);

      let out = document.querySelector("#out");

      content.data.forEach(gifo => {

        let fig = document.createElement("figure");
        let img = document.createElement("img");
        img.src = gifo.images.downsized.url;
        img.alt = gifo.title;
        fig.appendChild(img);
        out.appendChild(fig);
        out.style.display ="grid";
        const suggestionBox = document.getElementById("suggestionBox");
        suggestionBox.style.display = "none";
        
      });

      let elimiteBtn = document.querySelector('#out-button'); 
      elimiteBtn.innerHTML = "";


      const doesButtonVerMasExist = document.getElementById("button-ver-mas");

      if(doesButtonVerMasExist === null){

        let buttonVerMas = document.createElement("button");
        buttonVerMas.id = "button-ver-mas";
        buttonVerMas.classList.add('button-ver-mas');
        buttonVerMas.innerText ="VER MÁS";        
        elimiteBtn.appendChild(buttonVerMas);
        
        const suggestionBox = document.getElementById("suggestionBox");
        suggestionBox.innerHTML = "";
  
        let eliminateTrending = document.querySelector("#trending");
        eliminateTrending.style.display ="none";
  
  
        buttonVerMas.addEventListener('click', (e)=>{
          SEARCHOFFSET += 12;
          renderGrid(e, false);
        })
        
      }

    })
    .catch(err => {
      console.error(err);
    });
}

function init() {
  let btnSearch = document.getElementById("btnSearch");
  let btnSearchClose = document.getElementById("btnSearchClose");
  let InputSearch =  document.getElementById("search");
  let str = document.getElementById("search").value.trim();
  
  console.log("Value of STR2222", str)

  btnSearch.addEventListener("click", renderGrid );

  InputSearch.addEventListener('keypress',(e) => {
    if (e.key === 'Enter') {
      renderGrid(e);
    } 
  });

  const clearInput = () => {
    InputSearch.value = '';
    suggestionBox.style.display = "none";
    btnSearchClose.style.display = "none";
    btnSearch.style.display = "inline";
  };

  btnSearchClose.addEventListener('click', clearInput);
  InputSearch.addEventListener('input', toggleButtons);
}





