// Get Elements
const player 	= document.querySelector(".player");
const video 	= player.querySelector("video");
const progress 	= player.querySelector(".progress");
const progressBar 	= player.querySelector(".progressFilled");
const toggle 	= player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const range 	= player.querySelector(".playerSlider");
const spans 	= player.querySelectorAll("span");
const volume 	= player.querySelector(".volume");
const volumeButton	= player.querySelector(".volume i");
const fullscreen 		= player.querySelector(".fullscreen");
const time = player.querySelector(".time");

// write current time inside html
function showTime(){
	let seconds = ~~(video.currentTime);
	let minutes = ~~(seconds / 60);
	let secondsToShow = 0, minutesToShow = 0;
	(seconds / 60 >= 1) ? secondsToShow = seconds - ~~(seconds/60)*60 : secondsToShow = seconds;
	(secondsToShow < 10) ? secondsToShow = "0" + secondsToShow : "";
	(minutes < 10) ? minutesToShow = "0" + minutes : minutesToShow = minutes; 
	let timeToShow = minutesToShow + " : " + secondsToShow;
	time.innerHTML = timeToShow;

}

// Build Functions
function videoPlay(){	
	(video.paused) ? video.play() : video.pause();
}

function changeToggle(){
	let icon = "►";
	(video.paused) ? icon = "►" : icon = "❚❚";
	toggle.innerHTML = icon;
}

function skip(){
	video.currentTime += parseFloat(this.dataset.skip);
}
function rangeUpdate(){
	video[this.name] = this.value;
	console.log(this.value);
}
function changeProgress(){
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e){
	const scrubTime 	= (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime 	= scrubTime;
}	

function speedChange(){
	video[this.dataset.property] = parseFloat(this.dataset.speed);
}

function showVolume(){
	range.style.display = "block";
	volume.style.width 	= "20%";
}

function hideVolume(){
	range.style.display = "none";
	volume.style.width 	= "5%";
}

function mute(){
	vBclicked = !vBclicked;
	(vBclicked) ? currentVolume = video.volume : " ";
	(video.volume == 0) ? video.volume = currentVolume : video.volume = 0;
	range.value = video.volume;
}

function makeFull(){
	if (isFullscreen){
		player.style.width = "900px";
		player.style.height = "40vh";
	} else{
		player.style.width = "100vw";
		player.style.height = "100vh";
		video.style.height  = "80vh";
		video.style.width  = "100vw";
	}
		isFullscreen = !isFullscreen;
}
// Event Listeners

toggle.addEventListener("click", videoPlay);
toggle.addEventListener("click", changeToggle);


video.addEventListener("click", videoPlay);


video.addEventListener("click", changeToggle);
skipButtons.forEach(button => button.addEventListener("click", skip));
range.addEventListener("change", rangeUpdate);
range.addEventListener("mousemove", rangeUpdate);
video.addEventListener("timeupdate", changeProgress);

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);

spans.forEach(span => span.addEventListener("click", speedChange));

volume.addEventListener("mouseenter", showVolume);
volume.addEventListener("mouseleave", hideVolume);

let vBclicked = false;
let currentVolume;
volumeButton.addEventListener("click", mute);

let isFullscreen = false;
fullscreen.addEventListener("click", makeFull);

video.addEventListener("timeupdate", showTime);
