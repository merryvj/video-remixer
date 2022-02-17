const video = document.getElementById("video");
const durationEl = document.getElementById("duration");
const minLengthEl = document.getElementById("minLength");
const makeVideoBtn = document.getElementById("makeVideoBtn");
const playBtn = document.getElementById("playVideoBtn");

let cuts = [];
let duration, minLength;

makeVideoBtn.addEventListener("click", () => {
    duration = +durationEl.value;
    minLength = +minLengthEl.value;
    getCuts();
})

function getCuts() {
    let origDuration = Math.floor(video.duration) - minLength;

    let cutLength = 0;
    while (cutLength < duration) {
        let cutAt = Math.random() * origDuration + 1;

        let durationLeft = duration - cutLength;
        let currDuration = minLength;
        if(durationLeft > minLength) {
            currDuration = Math.random() * (2 - minLength + 1) + minLength;
        }
        cuts.push({
            start: cutAt,
            length: currDuration
        });

        cutLength+=currDuration;
    }

    console.log(cuts);
}

playBtn.addEventListener("click", () => {
    if (video.paused) {
        playBtn.innerHTML = "Stop"
        startVideo();
    } else {
        playBtn.innerHTML = "Play"
        video.pause();
        
    }
});

function startVideo() {
    video.currentTime = cuts[0].start;
    video.play();
    for (var i = 1; i < cuts.length; i++) {
        playUntilNextCut(i);
    }

    setTimeout(() => {
        window.location.reload();
    }, duration * 1000);
}

function playUntilNextCut(i){
    let delay = cuts[i].length * 1000;
    setTimeout(() => {  
        video.currentTime = cuts[i].start;
        console.log(delay);
        video.play();
    }, delay * (i + 1));
}