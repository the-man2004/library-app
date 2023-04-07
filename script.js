// Selecting elements for animations
const overlay = document.querySelector(".overlay");
const formContainer = document.querySelector(".form-container");

const form = document.querySelector("form");
const cardContainer = document.querySelector(".card-container");

// const bookTitle = document.querySelector(".book-title");
// const bookAuthor = document.querySelector(".book-author");
// const bookPages = document.querySelector(".book-pages");

const submitBtn = document.querySelector(".submit-btn");
const addBookBtn = document.getElementById("add-book");

const formInputs = document.querySelectorAll(".form-inputs");

let books = [];

// Toggle form.
const toggleForm = function () {
  formContainer.classList.toggle("hidden");
  overlay.classList.toggle("hidden");

  // Clear form inputs
  formInputs.forEach((el) => (el.value = ""));
};

const renderBook = function () {
  if (books.length === []) return;

  cardContainer.innerHTML = "";

  books.forEach((book) => {
    cardContainer.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="book-card ${book.id}">
            <p>"${book.title}"</p>
            <p>${book.author}</p>
            <p>pages ${book.pages}</p>
            <p class="have-read ${book.checkbox ? "true" : "false"}">
                ${book.checkbox ? "Read" : "Not read"}
            </p>
            <button class="btn">remove</button>
        </div>
    `
    );
  });
};

/////////////////////////////////////
// Adding book from form.
addBookBtn.addEventListener("click", function () {
  toggleForm();
});

const removeBook = function (id) {
  let newBooks = books.filter((book) => book.id !== id);
  books = newBooks;
  renderBook();
};

///////////////////////////////
// EventListeners

// Form submission handler.
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputs = [];

  formInputs.forEach((el) =>
    el.value ? inputs.push(el.value) : inputs.push(el.checked)
  );

  books.push({
    title: inputs[0],
    author: inputs[1],
    pages: inputs[2],
    checkbox: inputs[3],
    id: Math.random() * 10 + 1,
  });

  toggleForm();
  renderBook();
});

// Listen for click in card-container
cardContainer.addEventListener("click", function (e) {
  // If clicked element has a class of btn
  // then call removeBook with elements class name
  if (e.target.classList.contains("btn")) {
    const card = e.target.closest(".book-card");
    removeBook(+card.classList[1]);
  }
});
