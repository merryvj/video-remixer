const video = document.getElementById("video");
const durationEl = document.getElementById("duration");
const minLengthEl = document.getElementById("minLength");
const makeVideoBtn = document.getElementById("makeVideoBtn");

let cuts = [];
let duration, minLength;

makeVideoBtn.addEventListener("click", () => {
    duration = +durationEl.value;
    minLength = +minLengthEl.value;
    mixVideo();
})

function mixVideo() {
    let origDuration = Math.floor(video.duration) - minLength;

    let cutLength = 0;
    while (cutLength < duration) {
        let cutAt = Math.floor(Math.random() * origDuration) + 1;

        let durationLeft = duration - cutLength;
        let currDuration = minLength;
        if(durationLeft > minLength) {
            currDuration = Math.floor(Math.random() * (durationLeft - minLength + 1) + minLength);
        }
        cuts.push({
            start: cutAt,
            length: currDuration
        });

        cutLength+=currDuration;
    }

    console.log(cuts);
}

