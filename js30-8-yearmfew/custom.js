const canvas 	= document.querySelector("#draw");
const ctx 		= canvas.getContext("2d");
canvas.width  	= window.innerWidth;
canvas.height 	= window.innerHeight;


ctx.strokeStyle	= "#BADA55";
ctx.lineJoin 	= "round";
ctx.lineCap 	= "round";
ctx.lineWidth 	= 20;

let isDrawing 	= false;
let lastX		= 0;
let lastY		= 0;
let hue			= 0;
let direction 	= true;
var mix = "";

// These part changes size and type of the brush interactively
const buttonSize = document.querySelectorAll(".square");
buttonSize.forEach(button => button.addEventListener("click", sizeAndType));

function sizeAndType(){
	ctx.lineJoin 	= this.dataset.type;
	ctx.lineCap 	= this.dataset.type;
	ctx.lineWidth   = this.dataset.size;
}
	// this is the color part

	const buttonColor = document.querySelectorAll(".color");
	buttonColor.forEach(button => button.addEventListener("click", color));

	function color(){
		console.log("hello");
		ctx.strokeStyle = this.dataset.type;
		mix = this.dataset.type;
		console.log(ctx.strokeStyle);
	}


	// this is the drawing part
	function draw(e){
		if (!isDrawing) return;
		console.log(ctx.strokeStyle);
		if (mix == "mix"){
			console.log("hellosss");
	// renk strokeStyle dan ayarlanacak
	(hue>= 360) ? hue = 0 : hue ++;
	ctx.strokeStyle = `hsl(${hue}, 100%, 70%)`; 
};

ctx.beginPath();
	// start from 
	ctx.moveTo(lastX, lastY);

	//go to
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();

	[lastX, lastY] = [e.offsetX, e.offsetY];

	// direction ile büyüklük değişimi ??
	// panele de ekleme yap ?  şimdilik yapmıyorum
}

canvas.addEventListener("mousedown", (e)=> {
	console.log(e);
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);