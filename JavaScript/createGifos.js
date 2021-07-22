
async function postData(url = '', data) {
    const response = await fetch(url, {
        method: 'POST',
        body: data
    });
    return response.json(); 
}


const actionStartNode = document.getElementById('action-start');
const displayContainer = document.getElementById('display-container');
let recorder;
let camera;

const initRecorder = () => {
    recorder = new GifRecorder(camera, {
        onGifPreview: function(gifURL) {
            displayContainer.src = gifURL;
        },
        onGifRecordingStarted: function() {
            const stepOneNode = document.getElementById('step-1');
            const stepTwoNode = document.getElementById('step-2');
            const titleNode = document.getElementById('title');
            const descriptionNode = document.getElementById('description');
            const actionRecordNode = document.getElementById('action-record');
            
            titleNode.innerText = '';
            descriptionNode.innerText = '';
            actionRecordNode.style.display = 'inline-block';
            actionStartNode.style.display = 'none';
            stepOneNode.classList.remove('active');
            stepTwoNode.classList.add('active');
        },
        width: 320,
        height: 240,
        frameRate: 1,
        quality: 5
    });
    recorder.record();
}

const startGifRecorder = (e) => {
    const titleNode = document.getElementById('title');
    const descriptionNode = document.getElementById('description');
    const stepOneNode = document.getElementById('step-1');

    titleNode.innerText = '¿Nos das acceso a tu cámara?'
    descriptionNode.innerText = 'GIFOOO';
    stepOneNode.classList.add('active');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((media) => {
            camera = media;
            initRecorder(camera);
        })
        .catch((error) => {
            alert('Unable to capture your camera. Please check console logs.');
            console.error(error);
        });
}

actionStartNode.addEventListener('click', startGifRecorder);

function calculateTimeDuration(secs) {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - (hr * 3600)) / 60);
    let sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = '0' + min;
    }

    if (sec < 10) {
        sec = '0' + sec;
    }

    if(hr <= 0) {
        hr = '0' + hr;
    }

    return hr + ':' + min + ':' + sec;
}

let interval;

const actionRecordNode = document.getElementById('action-record');
actionRecordNode.addEventListener('click', (e) => {
    recorder.stop(function(blob){});
    recorder.record();
    const timer = document.getElementById('timer');
    timer.innerText = '00:00:00';
    let seconds = 0;
    const updateTimer = () => {
        seconds++;
        timer.innerText = calculateTimeDuration(seconds);
    }
    interval = setInterval(updateTimer, 1000);

    const actionStopNode = document.getElementById('action-stop');
    actionStopNode.style.display = 'inline-block';
    actionRecordNode.style.display = 'none';
});

let gifResult;

const actionStopNode = document.getElementById('action-stop');
actionStopNode.addEventListener('click', (e) => {
    recorder.stop(function(blob) {
        gifResult = blob;
        console.log(gifResult);
        displayContainer.src = URL.createObjectURL(blob);
        camera.stop();
        recorder = null;
    });

    clearInterval(interval);
    const timer = document.getElementById('timer');
    timer.innerText = '';

    const actionUploadNode = document.getElementById('action-upload');
    actionUploadNode.style.display = 'inline-block';
    actionStopNode.style.display = 'none';


    const restartNode = document.getElementById('restart');
    restartNode.style.display = 'block';
});

const restartNode = document.getElementById('restart');
restartNode.addEventListener('click', () => {
    const actionUploadNode = document.getElementById('action-upload');
    restartNode.style.display = 'none';
    actionUploadNode.style.display = 'none';
    displayContainer.src = '';
    startGifRecorder();
});

const saveIntoLocalStorage = (data, key) => {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
}

const getFromLocalStorage = (key) => {
    const arrayJsonValue = localStorage.getItem(key);
    return JSON.parse(arrayJsonValue);
}

const actionUploadNode = document.getElementById('action-upload');
actionUploadNode.addEventListener('click', () => {
    const data = new FormData();
    data.append('api_key', 'KtTod9sp8K9SJa6zIX0lrTmLeNt83TVL');
    data.append('file', gifResult, 'nuevoGifo.gif');
    postData(encodeURI('https://upload.giphy.com/v1/gifs'), data)
        .then(data => {
            const newGifoId = data.id;
            const localStorageGifos = getFromLocalStorage('localStorageGifos') || [];
            localStorageGifos.push(newGifoId);
            saveIntoLocalStorage(localStorageGifos, 'localStorageGifos');
            console.log(data);
        }).catch((e) => {
            console.log(e);
        });
});
