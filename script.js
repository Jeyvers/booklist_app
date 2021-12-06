//Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
        `;
        
        list.appendChild(row);
      }

      static deleteBook(el) {
        if(el.classList.contains('delete')){
            if(confirm('Are you sure you want to delete this book?')){
                el.parentElement.parentElement.remove();
            }
        }
      }

      static showAlert (message, className){
        const div = document.createElement('div');
        div.className = ` alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        //Vanish in 4 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 4000);
      }

      static clearFields(){
          document.querySelector('#title').value = '';
          document.querySelector('#author').value = '';
          document.querySelector('#isbn').value = '';

      }
    }
    
// Store Class: Takes Care of Storage
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // prevent submit default
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    
    // const paragraph = document.querySelector('#paragraph');

    //  Validate
    if (title === '' || author === '' || isbn === '' ){
       UI.showAlert('Please fill in all fields', 'danger');
        } else {

    //Instantiate book 
    const book = new Book(title, author, isbn);

    // Trial to remove book
    // const bookList = document.querySelector('#book-list');

    // Add Book to UI
    UI.addBookToList(book);

    //Add book to store
    Store.addBook(book);

    // Show succes message
    UI.showAlert('Book Added', 'success')
    // Clear fields    
    UI.clearFields();              
    }

});

//Create new td trial
// const td = document.createElement('td');
// td.appendChild(document.createTextNode(book));

//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from the store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


    //Show success message 
    UI.showAlert('Book Deleted', 'success')

});


//Trial
// document.addEventListener('click', (e) => {
//     if(e.target.classList.contains('delete')){
//         if(confirm('Do you want to delete this book?')){
//             UI.bookList.removeChild(td);
//         }
//     }
// });




