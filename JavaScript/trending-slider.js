
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
            

            
            const imgCart      = document.createElement("img");
            imgCart.classList.add("img-cart");
            
            imgCart.src = trendingImgs.data[i].images.fixed_width.url;
            cartsWrapper.appendChild(cart);
            cart.appendChild(imgCart);

        }

        let elementsWrapper = document.querySelector('.img-trending-gifos').childNodes;
        // elementsWrapper[3].classList.add("prev");
        elementsWrapper[4].classList.add("current");
        // elementsWrapper[5].classList.add("next");


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
            // first strip all the classes off the current slides
            const classesToRemove = ['prev', 'current', 'next'];
            prev.classList.remove(...classesToRemove);
            current.classList.remove(...classesToRemove);
            next.classList.remove(...classesToRemove);
            if (direction === 'back') {
              // make an new array of the new values, and destructure them over and into the prev, current and next variables
              [prev, current, next] = [
                // get the prev slide, if there is none, get the last slide from the entire slider for wrapping
                prev.previousElementSibling || slides.lastElementChild,
                prev,
                current,
              ];
            } else {
              [prev, current, next] = [
                current,
                next,
                // get the next slide, or if it's at the end, loop around and grab the first slide
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




