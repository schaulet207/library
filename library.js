// library.js

let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        console.log(title, author, pages, read)
    }
  }

  const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '500 pages', 'Fully read')
  theHobbit.info()