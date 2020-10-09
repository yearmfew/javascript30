// 👀👀👀👀👀👀👀👀👀👀👀👀👀👀👀
// Variables
const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight); 


// functions

function highlightLink(){
	;
	const linkCoords = this.getBoundingClientRect();
	console.log(linkCoords);

	const coords = {
		width: linkCoords.width,
		height: linkCoords.height + 3,
		top: linkCoords.top + window.scrollY - 30,
		left: linkCoords.left + window.scrollX
	};


	highlight.style.width = 'auto';
	highlight.style.height = `${coords.height}px`;
	highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
	highlight.style.display = 'block';

	highlight.innerText = data[this.text];



}

function closeHighlight(){
	highlight.style.display = 'none';
}
// Event Listeners

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
triggers.forEach(a => a.addEventListener('mouseleave', closeHighlight));
