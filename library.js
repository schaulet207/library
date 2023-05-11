// library.js

// Get HTML fields
const modal = document.getElementById("modal"); // Modal field
const btn = document.getElementById("openModal"); // Get the button that opens the modal
const span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
const cancel = document.getElementById("cancel"); // Get the <span> cancel element in the modal
const form = document.querySelector("form"); // Get the form
const submitBtn = document.getElementById("submitBtn");

// create bookID variable
var bookID = -1;

// Create placeholder book objects
function addBooks() {
  addBook1();
  addBook2();
  addBook3();
}

function addBook1() {
  bookID++;
  let title = "The Fellowship of The Ring";
  let author = "J.R.R. Tolkien";
  let pages = "432";
  let published = "1954";
  let read = "on";
  let deleted = false;
  let id = bookID;
  
  // Push new book to the library
  let book = new Book(title, author, pages, published, read, id, deleted);
  library.push(book);
  displayLibrary();
}

function addBook2() {
  bookID++;
  let title = "The Two Towers";
  let author = "J.R.R. Tolkien";
  let pages = "448";
  let published = "1954";
  let read = "on";
  let deleted = false;
  let id = bookID;
  
  // Push new book to the library
  let book = new Book(title, author, pages, published, read, id, deleted);
  library.push(book);
  displayLibrary();
}

function addBook3() {
  bookID++;
  let title = "The Return of The King";
  let author = "J.R.R. Tolkien";
  let pages = "432";
  let published = "1955";
  let read = "on";
  let deleted = false;
  let id = bookID;
  
  // Push new book to the library
  let book = new Book(title, author, pages, published, read, id, deleted);
  library.push(book);
  displayLibrary();
}

// When the user clicks on the + Add button, open the modal
btn.onclick = function() {
  document.getElementById("read").checked = false;
  modal.style.display = "block";
  editTitle.innerHTML = "Add Book";

}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  clearContent();
}

// When the user clicks on <span> cancel, close the modal
cancel.onclick = function() {
  modal.style.display = "none";
  clearContent();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    clearContent();
  }
}

// When submit is clicked, execute form validations + close the modal and add book information to library
submitBtn.onclick = function(e) {
  validate();
}

function validate () {
  // Form validations and also handles Edit or Add card logic
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

  if (!published.value) {
    published.classList.add("invalid");
  } else {
    published.classList.remove('invalid');
  }

  if (title.value && author.value && pages.value && published.value && (editTitle.innerHTML.includes("Add"))) {
    modal.style.display = "none";
    addBook();
  }
  else if (title.value && author.value && pages.value && published.value && (editTitle.innerHTML.includes("Edit"))) {
    modal.style.display = "none";
    editBook();
  }
}

// Clear any content from previous displayed card before displaying new card
function clearContent() {
document.getElementById("title").value = "";
document.getElementById("author").value = "";
document.getElementById("pages").value = "";
document.getElementById("published").value = "";
}

// Transfer information from 'Edit' modal to library array
function editBook() {
  library[bookID].title = title.value;
  library[bookID].author = author.value;
  library[bookID].pages = pages.value;
  library[bookID].published = published.value;
  if (read.checked == true) {
    library[bookID].read = 'on';
  }
  else {
    library[bookID].read = 'off';
  }
}

// Library and book logic
// Initialize the myLibrary array
let library = [];
      
// Book constructor
function Book(title, author, pages, published, read, id, deleted) {
this.title = title;
this.author = author;
this.pages = pages;
this.published = published;
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
let published = document.getElementById("published").value;
let read = document.getElementById("read");
let deleted = false;
let id = bookID;

// Push new book to the library
let book = new Book(title, author, pages, published, read, id, deleted);
library.push(book);

// Clear any content from previous displayed card before displaying new card
clearContent();
displayLibrary();
}

// Display content from the new book object in the parking lot section
function displayLibrary() {
  let staging = document.getElementById("staging");

// Create card with content submitted from modal
  const card = document.createElement("div");
  card.classList.add('inner');
  // card.setAttribute("draggable", "true")
  // card.addEventListener('dragstart', dragStart);
  card.id = bookID;
  const titleField = card.appendChild(document.createElement("h2"));
  titleField.innerText = library[bookID].title;
  const authorField = card.appendChild(document.createElement("h3"));
  authorField.innerText = "By: " + library[bookID].author;
  const pagesField = card.appendChild(document.createElement("h4"));
  pagesField.innerText = "Pages: " + library[bookID].pages;
  const published = card.appendChild(document.createElement("h4"));
  published.innerText = "Published: " + library[bookID].published;
  const div = card.appendChild(document.createElement("div"));
  div.classList.add("s-divider");
  div.setAttribute("id", "cardDiv");
  const cardBottom = card.appendChild(document.createElement("div"));
  cardBottom.classList.add("cardBottom");
  const readLabel = cardBottom.appendChild(document.createElement("div"));
  readLabel.classList.add("pageLabel");
  readLabel.innerHTML=("Mark as read:");
  readLabel.setAttribute("id", "readLabel");
  const readToggle = cardBottom.appendChild(document.createElement("input"));
  readToggle.classList.add('switch');
  readToggle.setAttribute("id", "read");
  readToggle.setAttribute("type", "checkbox");
  readToggle.id = bookID;
  const deleteButton = cardBottom.appendChild(document.createElement("button"));
  deleteButton.classList.add('cardButton');
  deleteButton.id = bookID;
  if ((library[bookID].read == "on") || read.checked == true) {
    readToggle.classList.add('isRead');
    readToggle.checked=true;
  } 
  else {
    readToggle.classList.add('notRead');
    readToggle.checked=false;
    }

card.addEventListener("click", function() {

  modal.style.display = "block";
  const editTitle = document.getElementById("editTitle");
  editTitle.innerHTML = "Edit Book";
  title.value = library[card.id].title;
  author.value = library[card.id].author;
  pages.value = library[card.id].pages;
  var publishedField = document.getElementById("published");
  publishedField.value = library[card.id].published;
  var readField = document.getElementById("read");
  if ((library[card.id].read == "on") || readToggle.checked == true) {
  readField.checked = true;
  }
  else {
    readField.checked = false;
  }
});
    
// For loop determines if a staging area is empty, then places the card there with appendChild 
let medium = document.getElementById("medium");
let long = document.getElementById("long");
for (i = 0, plCount = 1; i < staging.children.length; i++) {
  if (staging.children[i].children.length == 0) {
    staging.children[i].appendChild(card);
    break;
  }
  else if (staging.children[i].children.length != 0) {
    plCount++;
  }
}
  // Checks whether the staging area is full. If yes --> add additional row of staging
  if (plCount == staging.children.length) {
    // Create an additional row of five staging boxes
    for (j = 0; j < 5; j++) {
    let rows = document.createElement("div");
    rows.classList.add("box");
    rows.setAttribute("id", "pl" + ([j + plCount + 1]));
    staging.appendChild(rows);  
    boxes = document.querySelectorAll('.box');
    // rows.classList.add("unDragged");
    // rows.addEventListener('dragenter', dragEnter)
    // rows.addEventListener('dragover', dragOver);
    // rows.addEventListener('dragleave', dragLeave);
    // rows.addEventListener('drop', drop);
    }
    for (let i = 1; i <= staging.children.length; i++){
      containers.push(document.querySelector("#pl"+i));
    }
  }

  // Toggle between 'Read' and 'Not read' when clicking readToggle button
  readToggle.addEventListener("click", function() {
    let x = this.id;
    if (readToggle.classList.contains('isRead')) {
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
    event.stopImmediatePropagation();
  });

deleteButton.addEventListener("click", function deleteCard() {
  let x = this.id;
  // Targets the parent box of the button being clicked and removes any content
  if (deleteButton.parentElement.parentElement.classList.contains('frame')) {
    deleteButton.closest(".frame").remove();
  }
  else if (deleteButton.parentElement.parentElement.classList.contains('inner')) {
    deleteButton.closest(".inner").remove();
  }
  library[x].deleted = true;
  event.stopImmediatePropagation();
});
}

/* Draggable element functionality for 'item'

-- USE FOR KANBAN FUNCTIONALITY TESTING -- 

Need to include the following 'item' div within a 'box' div for testing
      <div class="item" id="item" draggable="true"></div> */ 

// const item = document.querySelector('.item');
// item.addEventListener('dragstart', dragStart);

// KANBAN BOARD
// function dragStart(e) {
//     e.dataTransfer.setData('text/plain', e.target.id);
//     setTimeout(() => {
//         e.target.classList.add('hide');
//     }, 0);
// }

// /* drop targets */
// let boxes = document.querySelectorAll('.box');

// (() => {
//   const htmlElement = document.querySelector("html");

//   htmlElement.addEventListener("drop", (e) => {
//     if (e.currentTarget !== boxes) {
//       console.log("Not dropped on an valid drop-agent");
//     }  
//   })
// })();

// boxes.forEach(box => {
//     box.addEventListener('dragenter', dragEnter)
//     box.addEventListener('dragover', dragOver);
//     box.addEventListener('dragleave', dragLeave);
//     box.addEventListener('drop', drop);
// });

// function dragEnter(e) {
//     e.preventDefault();
//     e.target.classList.add('drag-over');
//     // change box background-colors and borders to green
//     boxes.forEach(box => {
//         box.style.backgroundColor = "rgba(81, 141, 254, 0.2)";
//         box.style.border = "dashed 3px rgba(81, 141, 254)";
//     });
// }

// function dragOver(e) {
//     // Remove any temporary characteristics
//     e.preventDefault();
//     e.target.classList.remove('unDragged');
//     e.target.classList.add('drag-over');

//     // If dragging onto content within a box -> turn content red, change cursor to 'not-allowed' and prevent from dropping
//     if ((e.target.parentElement.className === "box unDragged") || (e.target.parentElement.className === "box")) {
//       e.target.classList.add('drag-block');
      
//   }
//   // If dragging onto a box with content within -> turn content red, change cursor to 'not-allowed' and prevent from dropping
//     else if ((e.target.children.length > 0) && (e.target.parentElement.className === "box unDragged" || "box")) {
//       e.target.firstElementChild.classList.add('drag-block');
//     }

//     // If dragging onto an empty box after trying to drop on a box with content -> restore normal styling, 
//       // change cursor to 'draggable' and allow dropping
//     else if ((e.target.children.length > 0) && (e.target.parentElement.className === "box unDragged" || "box")) {
//       e.target.firstElementChild.classList.add('drag-block');
//     }

//     // If dragging an item over an available box, highlight green
//   else if ((e.target.classList.contains('box')) && (e.target.children.length == 0)){
//     e.target.style.backgroundColor = "rgba(95, 185, 136, 0.3)";
//     e.target.style.border = "dashed 3px rgba(95, 185, 136)";
//     e.target.classList.remove('drag-block');
//   }
// }

// function dragLeave(e) {
//     e.target.classList.remove('drag-over');
//     e.target.classList.remove('drag-block');
//     e.target.classList.add('unDragged');
//     e.target.style.transition = "0.1s";
//     if ((e.target.children.length > 0) && (e.target.firstElementChild.classList.contains('drag-block'))) {
//       e.target.firstElementChild.classList.remove('drag-block');
//     }
//     else {
//       return;
//     }
// }

function drop(e) {
    // restore box background-colors and borders to original values
    boxes.forEach(box => {
        box.style.backgroundColor = "transparent";
        box.style.border = "solid 3px #ccc";
    });

  // Short staging area overflow logic
  let short = document.getElementById("short");
  for (k = 0, shortCount = 1; k < short.children.length; k++) {
    if (shortCount == short.children.length) {
      // Create an additional row of five staging boxes
      for (l = 0; l < 5; l++) {
      let rows = document.createElement("div");
      rows.classList.add("box");
      // rows.classList.add("unDragged");
      rows.setAttribute("id", "pl" + ([l + 6]));
      short.appendChild(rows);
      rows.addEventListener('dragenter', dragEnter)
      rows.addEventListener('dragover', dragOver);
      rows.addEventListener('dragleave', dragLeave);
      rows.addEventListener('drop', drop);
      boxes = document.querySelectorAll('.box');
      }
    }
    else if (short.children[k].children.length != 0 && (shortCount != short.children.length)) {
      shortCount++;
    }
  }
// Medium staging area overflow logic
  let medium = document.getElementById("medium");
  for (m = 0, mediumCount = 1; m < medium.children.length; m++) {
    if (mediumCount == medium.children.length) {
      // Create an additional row of five staging boxes
      for (n = 0; n < 5; n++) {
      let rows = document.createElement("div");
      rows.classList.add("box");
      // rows.classList.add("unDragged");
      rows.setAttribute("id", "pl" + ([n + 6]));
      medium.appendChild(rows);
      rows.addEventListener('dragenter', dragEnter)
      rows.addEventListener('dragover', dragOver);
      rows.addEventListener('dragleave', dragLeave);
      rows.addEventListener('drop', drop);
      boxes = document.querySelectorAll('.box');
      }
    }
    else if (medium.children[m].children.length != 0 && (mediumCount != medium.children.length)) {
      mediumCount++;
    }
  }
// Long staging area overflow logic
let long = document.getElementById("long");
for (o = 0, longCount = 1; o < long.children.length; o++) {
  if (longCount == long.children.length) {
    // Create an additional row of five staging boxes
    for (p = 0; p < 5; p++) {
    let rows = document.createElement("div");
    rows.classList.add("box");
    // rows.classList.add("unDragged");
    rows.setAttribute("id", "pl" + ([o + 6]));
    long.appendChild(rows);
    rows.addEventListener('dragenter', dragEnter)
    rows.addEventListener('dragover', dragOver);
    rows.addEventListener('dragleave', dragLeave);
    rows.addEventListener('drop', drop);
    boxes = document.querySelectorAll('.box');
    }
  }
  else if (long.children[o].children.length != 0 && (longCount != long.children.length)) {
    longCount++;
  }
}
}

let containers = [];

for (let i = 1; i < 50; i++){
  containers.push(document.querySelector("#box"+i));
}

for (let i = 1; i <= staging.children.length; i++){
  containers.push(document.querySelector("#pl"+i));
}

for (let i = 1; i <= staging.children.length; i++){
  containers.push(document.querySelector("#short"+i));
}

for (let i = 1; i <= staging.children.length; i++){
  containers.push(document.querySelector("#medium"+i));
}

for (let i = 1; i <= staging.children.length; i++){
  containers.push(document.querySelector("#long"+i));
}

const droppableContainer = document.querySelector('.box');
const drake = dragula(containers, {
  accepts: function (el, target) {
    return target.children.length === 0;
  }
});

let boxes = document.querySelectorAll('.box');

// Use the `drake.on` method to listen for the `drag` event on the draggable items
drake.on('drag', function(el) {
  boxes.forEach(box => {
    box.style.backgroundColor = "rgba(81, 141, 254, 0.2)";
    box.style.border = "dashed 3px rgba(81, 141, 254)";
});
});

// Use the `drake.on` method to listen for the `dragover` event on the droppable container
drake.on('dragover', function(el, container) {
  if (target === droppableContainer) {
    target.style.borderColor = 'purple';
  }
});

// Use 'drake.on' OVER and OUT events to create a visual cue for where the card is being dropped
drake.on('over', function(el, container) {
  el.parentNode.style.backgroundColor = 'rgba(81, 141, 254, 0.2)';
  el.parentNode.style.border = "dashed 3px rgba(81, 141, 254)";
});

drake.on('out', function(el, container) {
  el.parentNode.style.backgroundColor = 'rgba(29, 52, 40, 0.3)';
  el.parentNode.style.border = '3px dashed rgba(92, 184, 132)';
});

// Use the `drake.on` method to listen for the `drop` event on the droppable container
drake.on('drop', function(el, target) {
  // Remove any excess elements from the droppable container
  while (target.children.length > 1) {
    target.removeChild(target.lastChild);
    target.style.backgroundColor = "rgba(234, 51, 35, 0.5)";
    target.style.border = "dashed 3px rgba(234, 51, 35)";
  }

    boxes.forEach(box => {
      box.style.backgroundColor = "transparent";
      box.style.border = "solid 3px #ccc";
  });

  // Short staging area overflow logic
  let short = document.getElementById("short");
  for (k = 0, shortCount = 1; k < short.children.length; k++) {
    if (shortCount == short.children.length) {
      // Create an additional row of five staging boxes
      for (l = 0; l < 5; l++) {
      let rows = document.createElement("div");
      rows.classList.add("box");
      rows.setAttribute("id", "short" + ([l + shortCount + 1]));
      short.appendChild(rows);
      boxes = document.querySelectorAll('.box');
      // rows.classList.add("unDragged");
      }
    }
    else if (short.children[k].children.length != 0 && (shortCount != short.children.length)) {
      shortCount++;
    }
    for (let i = 1; i <= short.children.length; i++){
      containers.push(document.querySelector("#short"+i));
    }
  }
// Medium staging area overflow logic
  let medium = document.getElementById("medium");
  for (m = 0, mediumCount = 1; m < medium.children.length; m++) {
    if (mediumCount == medium.children.length) {
      // Create an additional row of five staging boxes
      for (n = 0; n < 5; n++) {
      let rows = document.createElement("div");
      rows.classList.add("box");
      // rows.classList.add("unDragged");
      rows.setAttribute("id", "medium" + ([n + mediumCount + 1]));
      medium.appendChild(rows);
      boxes = document.querySelectorAll('.box');
      }
    }
    else if (medium.children[m].children.length != 0 && (mediumCount != medium.children.length)) {
      mediumCount++;
    }
    for (let i = 1; i <= medium.children.length; i++){
      containers.push(document.querySelector("#medium"+i));
    }
  }
// Long staging area overflow logic
let long = document.getElementById("long");
for (o = 0, longCount = 1; o < long.children.length; o++) {
  if (longCount == long.children.length) {
    // Create an additional row of five staging boxes
    for (p = 0; p < 5; p++) {
    let rows = document.createElement("div");
    rows.classList.add("box");
    // rows.classList.add("unDragged");
    rows.setAttribute("id", "long" + ([p + longCount + 1]));
    long.appendChild(rows);
    boxes = document.querySelectorAll('.box');
    }
  }
  else if (long.children[o].children.length != 0 && (longCount != long.children.length)) {
    longCount++;
  }
  for (let i = 1; i <= long.children.length; i++){
    containers.push(document.querySelector("#long"+i));
  }
}
if (target.id.includes("pl")) {
  el.children[0].style.color="var(--purple)";
}
else if (target.id.includes("short")) {
  el.children[0].style.color="green";
}
else if (target.id.includes("medium")) {
  el.children[0].style.color="yellow";
}
else if (target.id.includes("long")) {
  el.children[0].style.color="orange";
}

});

// Use the `drake.on` method to listen for the `dragend` event on the draggable items
drake.on('dragend', function(el) {
  el.style.borderColor = '';
  droppableContainer.style.borderColor = '';
});

function toggleImage() {
  var button = document.getElementById("notification");
  var image = button.querySelector("img");

  if (image) {
    var currentSrc = image.src;
    var newSrc = "";

    if (currentSrc.endsWith("Notifications.svg")) {
      newSrc = currentSrc.replace("Notifications.svg", "Notifications2.svg");
    } else if (currentSrc.endsWith("Notifications2.svg")) {
      newSrc = currentSrc.replace("Notifications2.svg", "Notifications.svg");
    }

    if (newSrc) {
      image.src = newSrc;
    }
  }
}