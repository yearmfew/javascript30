// Variables
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

// Functions 
function populateVoices(){
	voices =  this.getVoices();
	console.log(voices);
	const voiceOptions = voices
	.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
	.join('');

	voicesDropdown.innerHTML = voiceOptions;
}


// Event Listeners

speechSynthesis.addEventListener('voiceschanged', populateVoices);

