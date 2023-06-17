// Variables
let countdown;
let buttonClicked = false;
let timeLeft;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const input = document.customForm;
const start = document.querySelector("button.start");
const stop = document.querySelector("button.stop");



// Functions
function timer(seconds){
	// clear any existing timers
	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		// check if we should stop it ! 
		if(secondsLeft < 0){
			clearInterval(countdown);
			return;
		}
		sessionStorage.setItem("lastSecond", secondsLeft);
		 // display it
		 displayTimeLeft(secondsLeft);
		}, 1000);
}

function displayTimeLeft(seconds){

	const hours = Math.floor(seconds / 3600);
	const remainderMinutes = seconds % 3600;
	const minutes = Math.floor(remainderMinutes / 60);
	const remainderSeconds = remainderMinutes % 60;
	let addZeroToHour, addZeroToMinutes;
	// Check if there shold be zero on the left
	(hours < 10) ? addZeroToHour = "0" : addZeroToHour = "";
	(minutes < 10) ? addZeroToMinutes = "0" : addZeroToMinutes = "";
	(remainderSeconds < 10) ? addZeroToSeconds = "0" : addZeroToSeconds = "";
	
	const display =`${addZeroToHour}${hours}:${addZeroToMinutes}${minutes}:${addZeroToSeconds}${remainderSeconds}`;
	document.title = display;
	timerDisplay.textContent = display;
	

}

function displayEndTime(timestamp){
	const end = new Date(timestamp);
	const hour = end.getHours();
	const adjustedHour = hour > 12 ? hour - 12 : hour;
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0': ''}${minutes}`;

}

function startTimer(){
	seconds = parseInt(this.dataset.time);
	timer(seconds);
}

function inputStart(e){
	e.preventDefault();
	let hours, mins, secs;
	(this.hours.value		== "0") ? hours = 0 : hours = parseInt(this.hours.value);
	(this.minutes.value	== "0") ? mins 	= 0 : mins = parseInt(this.minutes.value);
	(this.seconds.value	== "0") ? secs 	= 0 : secs = parseInt(this.seconds.value);

	let seconds = (hours * 3600) + (mins * 60) + (secs);

	timer(seconds);
	this.reset();
}

function handleIcon(){
	const icon = this.querySelector("i");
	if(!buttonClicked){
		icon.classList.add('fa-pause');
		icon.classList.remove('fa-play');	
		buttonClicked = !buttonClicked;
	}else{
		icon.classList.add('fa-play');
		icon.classList.remove('fa-pause');	
		buttonClicked = !buttonClicked;
	}
}

function toggleTimer(e){
	e.preventDefault();
	// take existing time in timer
	const stoppedSecond = sessionStorage.getItem("lastSecond");
	console.log(stoppedSecond);
	// pause the timer 

	// icona bakarak durdu mu durmadı mı karar ver
	// ona göre başlat veya display e o anki zamanı yazıp inputu sıfırla 
	
	// restart timer again
	// Timer başlatılırken alınan saniyeler içinde dakikadan ve saatten
	// gelmesi gerekenler yok. Onları ekle sessiona 
	seconds = parseInt(stoppedSecond);
	
	timer(seconds);
}


// Event Listeners

buttons.forEach(button => button.addEventListener('click', startTimer));
input.addEventListener('submit', inputStart);
start.addEventListener('click', handleIcon);
// input.addEventListener('submit', toggleTimer);
// start.addEventListener('click', toggleTimer);