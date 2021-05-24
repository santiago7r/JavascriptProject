
const APIKEYTRENDINGSLIDER = "KtTod9sp8K9SJa6zIX0lrTmLeNt83TVL";

const urlTrendingSlider = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEYTRENDINGSLIDER}&limit=9`;


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



    function trendingImgsSlider(){

        const cartsContainer = document.querySelector("#cardsContainer");

        const cartsWrapper = document.createElement("div");
        cartsWrapper.classList.add("carts-wrapper");
        cartsContainer.appendChild(cartsWrapper);


        const cart         = document.createElement("div");
        cart.classList.add("img-trending-gifos");

        for(i=0; i<9; i++){


          const divImgCart      = document.createElement("div");
          divImgCart.classList.add("img-cart");

          const overlay = document.createElement("div");
          overlay.classList.add("overlay");

            
          const imgCart      = document.createElement("img");
          imgCart.classList.add("img-url");

          const favIcon      = document.createElement("img");
          favIcon.classList.add("fav-icon");
          favIcon.src ='./assets/icon-fav-hover.svg';

          const downloadIcon      = document.createElement("img");
          downloadIcon.classList.add("download-icon");
          downloadIcon.src = './assets/icon-download-hover.svg';

          const maxIcon     = document.createElement("img");
          maxIcon.classList.add("max-icon");
          maxIcon.src = './assets/icon-max-hover.svg';


          divImgCart.appendChild(imgCart);
          divImgCart.appendChild(overlay);
          
          overlay.appendChild(favIcon);
          overlay.appendChild(downloadIcon);
          overlay.appendChild(maxIcon);
          
          imgCart.src = trendingImgs.data[i].images.fixed_width.url;
          cartsWrapper.appendChild(cart);
          cart.appendChild(divImgCart);

/*
                    <div class="img-cart" style="display: flex;">
                        <img class="img-cart" style="position: relative;"
                            src="https://media1.giphy.com/media/KpS6McRMXM6Y7prlpm/200w.gif?cid=729b2bc6rd0zw97v1ugnxbmvjao7p2g2m18at3kjhg4nyr2e&amp;rid=200w.gif&amp;ct=g">
                        <div class="overlay img-cart"
                            style="background-color: blue; z-index: 100; opacity: 0.5; border: 2px solid red; position: absolute;">
                            <img src="./assets/icon-fav-hover.svg" alt="">
                            <img src="./assets/icon-download.svg" alt="">
                            <img src="./assets/icon-max-normal.svg" alt="">
                        </div>
                    </div>
**/



        }

        let elementsWrapper = document.querySelector('.img-trending-gifos').childNodes;

        elementsWrapper[4].classList.add("current");



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


    function Slider (slider){
        
        if (!(slider instanceof Element)){ 
            throw new Error("No hace parte del slider");
        }

        let prev;
        let current;
        let next;

        const slides = slider.querySelector('.img-trending-gifos');

        
        const prevButton = document.querySelector('.slide-left');
        const nextButton = document.querySelector('.slide-right');

        function startSlider(){
            current = slider.querySelector('.current') || slides.firstElementChild;
            prev = current.previousElementSibling || slides.lastElementChild;
            next = current.nextElementSibling || slides.firstElementChild;
            console.log({ current, prev, next });

        }

        function applyClasses() {
            current.classList.add('current');
            prev.classList.add('prev');
            next.classList.add('next');
          }
        
          function move(direction) {

            const classesToRemove = ['prev', 'current', 'next'];
            prev.classList.remove(...classesToRemove);
            current.classList.remove(...classesToRemove);
            next.classList.remove(...classesToRemove);
            if (direction === 'back') {

              [prev, current, next] = [

                prev.previousElementSibling || slides.lastElementChild,
                prev,
                current,
              ];
            } else {
              [prev, current, next] = [
                current,
                next,

                next.nextElementSibling || slides.firstElementChild,
              ];
            }
        
            applyClasses();
        }

        startSlider();
        applyClasses();

        nextButton.addEventListener('click', () => move('back'));
        prevButton.addEventListener('click', move);

        
    } 
    
    const mySlider = Slider(document.querySelector('.carts-wrapper'));


});




