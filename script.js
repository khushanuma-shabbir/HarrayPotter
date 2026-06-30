const video = document.getElementById("hogwartsVideo");
const content = document.getElementById("content");
const poster = document.getElementById("posterImage");
const enterBtn = document.getElementById("enterBtn");
const audioBtn = document.getElementById("audioBtn");

enterBtn.addEventListener("click", startExperience);

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        startExperience();
    }
});

function startExperience() {

    content.style.display = "none";
    poster.style.display = "none";
    video.style.display = "block";

    video.muted = false;
    video.volume = 1;

    video.play().catch(err => {
        console.log("Video play failed:", err);
    });
}

/* AUDIO BUTTON */

audioBtn.addEventListener("click", function(){

    if(video.muted){
        video.muted = false;
        audioBtn.innerHTML = "🔊";
    }
    else{
        video.muted = true;
        audioBtn.innerHTML = "🔇";
    }

});