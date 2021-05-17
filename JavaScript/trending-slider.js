
const APIKEYTRENDINGSLIDER = "KtTod9sp8K9SJa6zIX0lrTmLeNt83TVL";

const urlTrendingSlider = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEYTRENDINGSLIDER}&limit=3`;


async function bringImgsGifs (gifs){
    return ((await fetch(urlTrendingSlider)).json());
}


document.addEventListener("DOMContentLoaded", async()=>{
    let trendingImgs = [];

    try{

        trendingImgs = await bringImgsGifs();

    }catch(e){
        console.log(e);

    }

    console.log(trendingImgs.data[0].images.fixed_width.url);

    function trendingImgsSlider(){

        const cartsContainer = document.querySelector("#cardsContainer");

        for(i=0; i<3; i++){
            

            console.log(cartsContainer);

            const cart         = document.createElement("div");
            const imgCart      = document.createElement("img");
            imgCart.classList.add("img-cart");
            cart.classList.add("img-trending-gifos");
            cartsContainer.appendChild(cart);
            cart.appendChild(imgCart);
            imgCart.src = trendingImgs.data[i].images.fixed_width.url;
            console.log(trendingImgs.data[i].images.fixed_width.url);

        }
        const slideLeft = document.createElement("img");
        slideLeft.classList.add("slide-left");
        slideLeft.src = './assets/button-slider-left.svg';

        const slideRight = document.createElement("img");
        slideRight.classList.add("slide-right");
        slideRight.src = './assets/button-slider-right.svg';

        cartsContainer.insertAdjacentElement('afterbegin', slideLeft);
        cartsContainer.insertAdjacentElement('beforeend', slideRight);





    }

    trendingImgsSlider();


});





// document.addEventListener("DOMContentLoaded", async()=>{
//     let trendings = [];


//     try{

//         trendings = await bringGifs();
    
//     }catch(e) {
//         console.log(e);
//     }

//     console.log(trendings.data[0].images.fixed_width.url);

//     function elementosTrending(){

//         for (i = 0; i < 5; i++) {
//             const trendingsInHTML = document.querySelector("#hereTheTrending");
//             const elementSpan = document.createElement("span");
//             elementSpan.classList.add("trending-tags");
//             elementSpan.innerText = `${trendings.data[i]}, `;
//             trendingsInHTML.appendChild(elementSpan);
//         }

//     }

//     elementosTrending();

// });

