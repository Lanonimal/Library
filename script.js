class Book{
    constructor (title = 'unknown',
    author = 'unknown',
    pages = '0',
    isRead = false
) {
    this.title = title 
    this.author = author 
    this.pages = pages 
    this.isRead = isRead 
} }

class Library {
    constructor() {
        this.books = []
    }

addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
        this.books.push(newBook)
    }
}

isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title) // not sure what this line of code does.
}
removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title)
}
getBook(title){
    return this.books.find((book) => book.title === title) 
}

}

const library = new Library()

const grid = document.getElementById('bookGrid')
const addBookBtn = document.getElementById('addBookBtn')
const addBookInputMenu = document.getElementById('addBookInputMenu')
const overlay = document.getElementById('overlay')
const addBookForm = document.getElementById('addBookForm')
const errorMsg = document.getElementById('errorMsg')



function updateGrid() {
    resetGrid()
    for (let book of library.books) {
        createBookCard(book)
    }
}

function resetGrid() {
    grid.innerHTML = ''
}

function createBookCard(book) {
    const bookCard = document.createElement('div')
    const title = document.createElement('h3')
    const author = document.createElement('h3')
    const pages = document.createElement('h3')
    const readBtn = document.createElement('button')
    const removeBtn = document.createElement('button')
    removeBtn.onclick = removeBook
    readBtn.onclick = toggleRead

    bookCard.classList.add('bookCard')
    removeBtn.classList.add('removeBtn')


    title.textContent = `"${book.title}"`
    author.textContent = book.author
    pages.textContent = `${book.pages} pages`
    removeBtn.textContent = 'Remove'

    if (book.isRead) {
        readBtn.textContent = 'Read'
        readBtn.classList.add('read')
    }
    else {
        readBtn.textContent = 'Not Read'
        readBtn.classList.add('notRead')
    }

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    bookCard.appendChild(readBtn)
    bookCard.appendChild(removeBtn)
    grid.appendChild(bookCard)
}

function getBookFromInput() {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').checked
    return new Book(title, author, pages, isRead)
    }

function addBook(e) {
    e.preventDefault()
    const newBook = getBookFromInput()
    if (library.isInLibrary(newBook)){
        errorMsg.textContent = 'This book has already been added to your library'
        errorMsg.classList.add('active')
        return
    }
    closeBookInputMenu();
    library.addBook(newBook); //need to find out what this line does. 
    updateGrid();
}

addBookBtn.onclick = openBookInputMenu
overlay.onclick = closeBookInputMenu
addBookForm.onsubmit = addBook

function openBookInputMenu() {
    addBookForm.reset()
    addBookInputMenu.classList.add('active')
    overlay.classList.add('active')
}
function closeBookInputMenu() {
    addBookInputMenu.classList.remove('active')
    overlay.classList.remove('active')
    errorMsg.classList.remove('active')
    errorMsg.textContent = ''
}

function removeBook(e) {
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '')
    library.removeBook(title)
    updateGrid()
}

function toggleRead(e) {
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '')
    const book = library.getBook(title)
    book.isRead = !book.isRead
    updateGrid()
}   


