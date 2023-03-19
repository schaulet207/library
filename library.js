// Get HTML fields
const modal = document.getElementById("modal"); // Modal field
const btn = document.getElementById("openModal"); // Get the button that opens the modal
const span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
const form = document.querySelector("form"); // Get the form
const submitBtn = document.getElementById("submitBtn");


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
      
function Book(title, author, pages) {
this.title = title;
this.author = author;
this.pages = pages;
}

function addBook() {
let title = document.getElementById("title").value;
let author = document.getElementById("author").value;
let pages = document.getElementById("pages").value;

let book = new Book(title, author, pages);
library.push(book);

document.getElementById("title").value = "";
document.getElementById("author").value = "";
document.getElementById("pages").value = "";

displayLibrary();
}

function displayLibrary() {
let grid = document.getElementById("library");
grid.innerHTML = "";

for(let i = 0; i < library.length; i++) {
    const card = document.createElement("div");
    card.classList.add('card')
    grid.appendChild(card);

    const titleLabel = document.createElement("h1");
    titleLabel.classList.add('label-header');
    titleLabel.innerHTML = "TITLE:";
    card.appendChild(titleLabel);
    card.appendChild(document.createTextNode(library[i].title));

    const authorLabel = document.createElement("h1");
    authorLabel.classList.add('label-header');
    authorLabel.innerHTML = "AUTHOR:";
    card.appendChild(authorLabel);
    card.appendChild(document.createTextNode(library[i].author));

    const pagesLabel = document.createElement("h1");
    pagesLabel.classList.add('label-header');
    pagesLabel.innerHTML = "PAGES:";
    card.appendChild(pagesLabel);
    card.appendChild(document.createTextNode(library[i].pages));
    // grid.appendChild(bookInfo);
    // card.appendChild(document.createTextNode(library[i].pages));
    
}

}