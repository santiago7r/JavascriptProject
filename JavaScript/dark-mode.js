
const darkModeButton = document.getElementById("darkMode");

darkModeButton.addEventListener("click", (e) => {
    let indexBody = document.body;
    let indexTrendingSection = document.getElementById("trendingGifos");
    let indexFooter = document.getElementById("footer");

    if(!indexTrendingSection.hasAttribute("style")){
        indexTrendingSection.setAttribute("style", "background-color:#222326;");
    } else if(indexTrendingSection.hasAttribute("style")) {
        indexTrendingSection.removeAttribute("style");
    }
    
    if(!indexFooter.hasAttribute("style")){
        indexFooter.setAttribute("style", "background-color:#222326;");
    } else if(indexFooter.hasAttribute("style")) {
        indexFooter.removeAttribute("style");
    }


    indexBody.classList.toggle("dark-mode");

});

