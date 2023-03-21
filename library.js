// Get HTML fields
const modal = document.getElementById("modal"); // Modal field
const btn = document.getElementById("openModal"); // Get the button that opens the modal
const span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
const form = document.querySelector("form"); // Get the form
const submitBtn = document.getElementById("submitBtn");

// create bookID variable
var bookID = -1;


// When the user clicks on the + Add button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// When the user clicks the "Add Book" button, close the modal and add book information to library
submitBtn.onclick = function(e) {
  modal.style.display = "none";
  addBook();
}

// Library and book logic
// Initialize the myLibrary array
let library = [];
      
function Book(title, author, pages, read) {
this.title = title;
this.author = author;
this.pages = pages;
this.read = read;
}

function addBook() {
let title = document.getElementById("title").value;
let author = document.getElementById("author").value;
let pages = document.getElementById("pages").value;
let read = document.getElementById("read").value;

let book = new Book(title, author, pages, read);
library.push(book);

document.getElementById("title").value = "";
document.getElementById("author").value = "";
document.getElementById("pages").value = "";
document.getElementById("read").value = "off";
displayLibrary();
}

function displayLibrary() {
  bookID++;
  let grid = document.getElementById("library");

  const frame = document.createElement("div");
  frame.classList.add('frame')
  grid.appendChild(frame);

  const card = document.createElement("div");
  card.classList.add('inner');
  card.setAttribute("draggable", "true")
  card.addEventListener('dragstart', dragStart);
  card.id = bookID;
  frame.appendChild(card);

  const titleField = card.appendChild(document.createElement("h2"));
  titleField.innerText = library[bookID].title;
  const authorField = card.appendChild(document.createElement("h3"));
  authorField.innerText = "by " + library[bookID].author;
  const pagesField = card.appendChild(document.createElement("h4"));
  pagesField.innerText = library[bookID].pages + " pages";
  
  // const readField = innerCard.createElement("h2");

  // innerCard.appendChild(document.createTextNode(library[i].title));
  // innerCard.appendChild(document.createTextNode("by " + library[i].author));
  // innerCard.appendChild(document.createTextNode(library[i].pages + " pages"));
  // innerCard.appendChild(document.createTextNode(library[i].read));
  // innerCard.appendChild(document.createTextNode(bookID));


// for(let i = 0; i < library.length; i++) {
//     const card = document.createElement("div");
//     card.classList.add('card')
//     grid.appendChild(card);

//     const innerCard = document.createElement("div");
//     innerCard.classList.add('inner');
//     innerCard.setAttribute("draggable", "true")
//     innerCard.addEventListener('dragstart', dragStart);
//     card.appendChild(innerCard);

//     const titleBreak = document.createElement("br");
//     innerCard.appendChild(titleBreak);
//     innerCard.appendChild(document.createTextNode(library[i].title));

//     const authorBreak = document.createElement("br");
//     innerCard.appendChild(authorBreak);
//     innerCard.appendChild(document.createTextNode("by " + library[i].author));

//     const pagesBreak = document.createElement("br");
//     const pagesBreak2 = document.createElement("br");
//     innerCard.appendChild(pagesBreak);
//     innerCard.appendChild(pagesBreak2);
//     innerCard.appendChild(document.createTextNode(library[i].pages + " pages"));

//     const readBreak = document.createElement("br");
//     innerCard.appendChild(readBreak);
//     innerCard.appendChild(document.createTextNode(library[i].read));
//     bookID++;
// }  
}

// KANBAN BOARD
/* draggable element */
const item = document.querySelector('.item');
item.addEventListener('dragstart', dragStart);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

/* drop targets */
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');

    // change box background-colors and borders to green
    boxes.forEach(box => {
        box.style.backgroundColor = "rgba(81, 141, 254, 0.2)";
        box.style.border = "dashed 3px rgba(81, 141, 254)";
    });
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
    e.target.style.backgroundColor = "rgba(95, 185, 136, 0.3)";
    e.target.style.border = "dashed 3px rgba(95, 185, 136)";
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text');
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove('hide');

    // restore box background-colors and borders to original values
    boxes.forEach(box => {
        box.style.backgroundColor = "white";
        box.style.border = "solid 3px #ccc";
    });
}