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
    e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text');
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);
    // display the draggable element
    draggable.classList.remove('hide');
    e.target.firstElementChild.classList.remove('drag-block');

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


// DRAGULA DRAG AND DROP TESTING
// Initialize dragula with your containers

// const containers = [document.querySelector('.parkingLot'), document.querySelector('.short'), document.querySelector('.medium'), document.querySelector('.long')];
// const droppableContainer = document.querySelector('.box');
// const drake = dragula(containers);

// // Use the `drake.on` method to listen for the `drag` event on the draggable items
// drake.on('drag', function(el) {
//   el.style.borderColor = 'green';
// });

// const containers = [document.querySelector('.parkingLot'), document.querySelector('.short'), document.querySelector('.medium'), document.querySelector('.long')];
// let containers = [document.querySelector('#pl1'), document.querySelector('#pl2'), document.querySelector('#pl3'), document.querySelector('#pl4')];

// for (let i = 1; i < 20; i++){
//   parkingLotContainers[i] = document.querySelector("#pl"+i);
// }

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
const drake = dragula(containers);

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

// Use the `drake.on` method to listen for the `drop` event on the droppable container
drake.on('drop', function(el, target) {

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



});

// Use the `drake.on` method to listen for the `dragend` event on the draggable items
drake.on('dragend', function(el) {
  el.style.borderColor = '';
  droppableContainer.style.borderColor = '';
});
