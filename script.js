const video = document.getElementById("video");
const videoSelector = document.getElementById("videoSelector");
const durationEl = document.getElementById("duration");
// const minLengthEl = document.getElementById("minLength");
const makeVideoBtn = document.getElementById("makeVideoBtn");
const playBtn = document.getElementById("playVideoBtn");

let cuts = [];
let duration

makeVideoBtn.addEventListener("click", () => {
    duration = +durationEl.value;
    getCuts();
})

videoSelector.addEventListener("change", (e) => {
    video.src = `videos/${e.target.value}.mp4`;
})

function getCuts() {
    let origDuration = Math.floor(video.duration);

    let cutLength = 0;
    while (cutLength < duration) {
        let cutAt = Math.random() * origDuration + 1;
        let durationLeft = duration - cutLength;
        let maxDuration = 0.25 * duration;
        let minDuration = 0.25;
        let currDuration = minDuration;
    
        if(durationLeft > minDuration) {
            
            currDuration = Math.random() * (maxDuration - minDuration) + minDuration;
        }
        cuts.push({
            start: cutAt,
            length: currDuration
        });

        cutLength+=currDuration;
    }

    cuts.sort((a, b) => (a.start > b.start) ? 1 : -1)
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
    setTimeout(() => {  
        video.currentTime = cuts[i].start;
        console.log(cuts[i].start);
        video.play();
    }, (cuts[i].length * 1000) * (i + 1));
}