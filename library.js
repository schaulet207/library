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

  // Form validations
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
      
// Book constructor
function Book(title, author, pages, read, id, deleted) {
this.title = title;
this.author = author;
this.pages = pages;
this.read = read;
this.id = bookID;
this.deleted = deleted;
}

// Create a book object
function addBook() {
bookID++;
let title = document.getElementById("title").value;
let author = document.getElementById("author").value;
let pages = document.getElementById("pages").value;
let read = document.getElementById("read").value;
let deleted = false;
let id = bookID;

// Push new book to the library
let book = new Book(title, author, pages, read, id, deleted);
library.push(book);

// Clear any content from previous displayed card before displaying new card
document.getElementById("title").value = "";
document.getElementById("author").value = "";
document.getElementById("pages").value = "";
displayLibrary();
}

// Display content from the new book object in the parking lot section
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
  readToggle.classList.add('cardButton');
  readToggle.id = bookID;
  const deleteButton = card.appendChild(document.createElement("button"));
  deleteButton.classList.add('cardButton');
  deleteButton.innerHTML=("Delete");
  deleteButton.style.backgroundColor=("red");  
  deleteButton.id = bookID;
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

    if (readToggle.className === "cardButton isRead") {
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

// If delete button is clicked - remove card entirely
deleteButton.addEventListener("click", function() {
  let x = this.id;

  // Targets the parent box of the button being clicked and removes any content
  if (deleteButton.parentElement.classList.contains('frame')) {
    deleteButton.closest(".frame").remove();
  }
  else if (deleteButton.parentElement.classList.contains('inner')) {
    deleteButton.closest(".inner").remove();
  }

  library[x].deleted = true;
  console.log(library);
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
    // Remove any temporary characteristics
    e.preventDefault();
    e.target.classList.remove('unDragged');
    e.target.classList.add('drag-over');

    // If trying to drop on the content within a box -> turn content red, change cursor to 'not-allowed' and prevent from dropping
    if ((e.target.parentElement.className === "box unDragged") || (e.target.parentElement.className === "box")) {
      e.target.classList.add('drag-block');
      console.log("ONE");
      
  }
  // If trying to drop on the box with content within -> turn content red, change cursor to 'not-allowed' and prevent from dropping
    else if ((e.target.children.length > 0) && (e.target.parentElement.className === "box unDragged" || "box")) {
      e.target.firstElementChild.classList.add('drag-block');
      console.log("TWO");
    }

    // If trying to drop on an empty box after trying to drop on a box with content -> restore normal styling, 
    // change cursor to 'draggable' and allow dropping
    else if ((e.target.children.length > 0) && (e.target.parentElement.className === "box unDragged" || "box")) {
      e.target.firstElementChild.classList.add('drag-block');
      console.log("TWO");
    }

  else {
    e.target.style.backgroundColor = "rgba(95, 185, 136, 0.3)";
    e.target.style.border = "dashed 3px rgba(95, 185, 136)";
    e.target.classList.remove('drag-block');
    console.log("THREE");
  }
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
    e.target.classList.remove('drag-block');
    e.target.classList.add('unDragged');
    e.target.style.transition = "0.1s";
    console.log("FOUR");
    if ((e.target.children.length > 0) && (e.target.firstElementChild.classList.contains('drag-block'))) {
      e.target.firstElementChild.classList.remove('drag-block');
      console.log("FIVE");
    }
    else {
      return;
      console.log("SIX");
    }
}

function drop(e) {
    e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text');
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);
    console.log("SEVEN");
    // display the draggable element
    draggable.classList.remove('hide');
    e.target.firstElementChild.classList.remove('drag-block');

    // restore box background-colors and borders to original values
    boxes.forEach(box => {
        box.style.backgroundColor = "white";
        box.style.border = "solid 3px #ccc";
    });
}