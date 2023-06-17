// variables we need
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];


// Functions 

// this function adds items that user write in the form, to an object 
// and then put these to array.
function addItem(e){
	e.preventDefault();
	const input = this.querySelector("[name=item]");
	const text = input.value;
	const item = {
		// text: text, instead of writing this we have a shortcut. 
		// We write only this one: text,
		text,
		done: false
	};
	items.push(item);
	populateList(items, itemsList);
	localStorage.setItem('items', JSON.stringify(items));
	this.reset();
}

function populateList(plates = [], platesList){
	platesList.innerHTML = plates.map((plate, i) => {
		return `
		<li>
		<input type="checkbox" data-index=${i}  id="item${i}" 
		${plate.done ? 'checked' : ''}/>
		<label for = "item${i}">${plate.text}</label>
		</li>
		`;
	}).join('');
}

function toggleDone(e){
	if(!e.target.matches('input')) return; // skip this unless it is an input
	const el = e.target;
	const index = el.dataset.index;
	items[index].done = !items[index].done;
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);

}

// Call Event Listeners and functions
addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
populateList(items, itemsList);