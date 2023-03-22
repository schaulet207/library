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
  document.getElementById("read").checked = false;
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



// When submit is clicked, execute form validations + close the modal and add book information to library
submitBtn.onclick = function(e) {
  if (!title.value) {
    title.classList.add("invalid");
  } else {
    title.classList.remove('invalid');
  }

  if (!author.value) {
    author.classList.add("invalid");
  } else {
    author.classList.remove('invalid');
  }

  if (!pages.value) {
    pages.classList.add("invalid");
  } else {
    pages.classList.remove('invalid');
  }

  if (title.value && author.value && pages.value) {
    modal.style.display = "none";
    addBook();
  }
}

// Library and book logic
// Initialize the myLibrary array
let library = [];
      
function Book(title, author, pages, read, id) {
this.title = title;
this.author = author;
this.pages = pages;
this.read = read;
this.id = bookID;
}

function addBook() {
bookID++;
let title = document.getElementById("title").value;
let author = document.getElementById("author").value;
let pages = document.getElementById("pages").value;
let read = document.getElementById("read").value;
let id = bookID;

let book = new Book(title, author, pages, read, id);
library.push(book);

document.getElementById("title").value = "";
document.getElementById("author").value = "";
document.getElementById("pages").value = "";
displayLibrary();
}

function displayLibrary() {
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
  const readToggle = card.appendChild(document.createElement("button"));
  readToggle.classList.add('readButton');
  readToggle.id = bookID;
  if (read.checked === true) {
    readToggle.classList.add('isRead');
    readToggle.innerHTML=("Read");
  } else {
    readToggle.classList.add('notRead');
    readToggle.innerHTML=("Not Read");
  }
  // Toggle between 'Read' and 'Not read' when clicking readToggle button
  readToggle.addEventListener("click", function() {
    let x = this.id;

    if (readToggle.className === "readButton isRead") {
      readToggle.classList.remove('isRead');
      readToggle.classList.add('notRead');
      readToggle.innerHTML=("Not Read");
      library[x].read = 'off';
    }
    else {
      readToggle.classList.remove('notRead');
      readToggle.classList.add('isRead');
      readToggle.innerHTML=("Read");
      library[x].read = 'on';
    }
  });
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