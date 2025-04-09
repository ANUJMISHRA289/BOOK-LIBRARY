const books = [];
const history = [];

function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value;

  if (title && author) {
    const book = { title, author, category };
    books.push(book);
    displayBooks(books);
    clearInputs();
  }
}

function clearInputs() {
  document.getElementById("title").value = '';
  document.getElementById("author").value = '';
  document.getElementById("category").value = 'Fiction';
}

function displayBooks(bookList) {
  const bookListEl = document.getElementById("bookList");
  bookListEl.innerHTML = '';

  bookList.forEach((book, index) => {
    const bookEl = document.createElement("div");
    bookEl.className = "book-item";
    bookEl.innerHTML = `
      <strong>${book.title}</strong> by ${book.author} <br/>
      <em>${book.category}</em><br/>
      <button class="borrow-btn" onclick="borrowBook(${index})">Borrow</button>
    `;
    bookListEl.appendChild(bookEl);
  });
}

function searchBooks() {
  const query = document.getElementById("search").value.toLowerCase();
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  );
  displayBooks(filteredBooks);
}

function borrowBook(index) {
  const borrowed = books[index];
  history.push({ ...borrowed, date: new Date().toLocaleString() });
  displayHistory();
}

function displayHistory() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = '';

  history.forEach(item => {
    const entry = document.createElement("div");
    entry.className = "history-item";
    entry.innerHTML = `<strong>${item.title}</strong> borrowed on ${item.date}`;
    historyList.appendChild(entry);
  });
}
