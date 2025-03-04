// Task 1 - Created Book Class
class Book {
    constructor(title, author, isbn, copies) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.copies = copies;
    }

    getDetails() {
        return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.isbn}, Copies: ${this.copies}`;
    }

    updateCopies(quantity) {
        this.copies += quantity;
    }
}

// Test for Task 1
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 1234567, 5);
console.log(book1.getDetails());

book1.updateCopies(-1);
console.log(book1.getDetails());

// Task 2 - Created Borrower Class
class Borrower {
    constructor(name, borrowerId) {
        this.name = name;
        this.borrowerId = borrowerId;
        this.borrowedBooks = [];
    }

    borrowBook(bookTitle) {
        this.borrowedBooks.push(bookTitle);
    }

    returnBook(bookTitle) {
        this.borrowedBooks = this.borrowedBooks.filter(book => book !== bookTitle);
    }
}

// Test for Task 2
const borrower1 = new Borrower("Akbar Younus", 201);
borrower1.borrowBook("The Great Gatsby");
console.log(borrower1.borrowedBooks);

borrower1.returnBook("The Great Gatsby");
console.log(borrower1.borrowedBooks);

// Task 3 - Created Library Class (Merged Task 4 and Task 5 inside this class)
class Library {
    constructor() {
        this.books = []; 
        this.borrowers = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    addBorrower(borrower) {
        this.borrowers.push(borrower);
    }

    listBooks() {
        console.log("Library Collection:");
        this.books.forEach(book => console.log(book.getDetails()));
    }

    // Task 4: Borrowing a Book
    lendBook(borrowerId, isbn) {
        const borrower = this.borrowers.find(person => person.borrowerId === borrowerId);
        const book = this.books.find(item => item.isbn === isbn);

        if (borrower && book && book.copies > 0) {
            book.updateCopies(-1);
            borrower.borrowBook(book.title);
            console.log(`"${book.title}" has been borrowed by ${borrower.name}.`);
        } else {
            console.log("Borrowing failed: Either the book is unavailable or the borrower ID is incorrect.");
        }
    }

    // Task 5: Returning a Book
    returnBook(borrowerId, isbn) {
        const borrower = this.borrowers.find(person => person.borrowerId === borrowerId);
        const book = this.books.find(item => item.isbn === isbn);

        if (borrower && book && borrower.borrowedBooks.includes(book.title)) {
            book.updateCopies(1);
            borrower.returnBook(book.title);
            console.log(`"${book.title}" has been returned by ${borrower.name}.`);
        } else {
            console.log("Return failed: Book or borrower details incorrect.");
        }
    }
}

// Library Testing
const library = new Library();
library.addBook(book1);
library.addBorrower(borrower1);
library.listBooks();

// Task 4: Borrowing a Book
console.log("Borrowing Process...");
library.lendBook(201, 123456);
console.log(book1.getDetails());  
console.log(borrower1.borrowedBooks);

// Task 5: Returning a Book
console.log("Returning Process...");
library.returnBook(201, 123456);
console.log(book1.getDetails());  
console.log(borrower1.borrowedBooks);
