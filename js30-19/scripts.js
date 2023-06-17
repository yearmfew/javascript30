// Variables 
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// Functions 

function getVideo(){
	navigator.mediaDevices.getUserMedia({video:true, audio:false}).then(localMediaStream => {
			console.log(localMediaStream);
			video.src = localMediaStream;
			video.play();
		});
}

getVideo();
