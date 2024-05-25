atomicHabits = {
  author: "James Clear",
  title: "Atomic Habits",
  pagesRead: 25,
};

buildingASecondBrain = {
  author: "Tiago Forte",
  title: "Building a Second brain",
  pagesRead: 15,
};

theHobbit = {
  author: "J.R.R Toliken",
  title: "The Hobbit",
  pagesRead: 295,
};

const myLibrary = [];

Object.setPrototypeOf(Book, myLibrary);

function Book(author, title, pagesRead, isCompleted) {
  const book = {};
  book.author = author;
  book.title = title;
  book.pagesRead = Number(pagesRead);
  book.isCompleted = Number(isCompleted);
  return book;
}

let readButtonToggle = false;
Book.prototype.addBookToLibrary = function (
  author,
  title,
  pagesRead,
  isCompleted
) {
  const book = new Book(author, title, pagesRead, isCompleted);
  myLibrary.push(book);
};

const dialog = document.querySelector("dialog");
const newBook = document.getElementById("newBook");
const closeButton = document.getElementById("closeButton");
const addButton = document.getElementById("addButton");
const authorName = document.getElementById("authorName");
const title = document.getElementById("title");
const pagesRead = document.getElementById("pagesRead");
const mainSection = document.getElementById("cardsContainer");
const checkBox = document.getElementById("status");

newBook.addEventListener("click", () => {
  dialog.showModal();
});

addButton.addEventListener("click", (event) => {
  event.preventDefault();
  dialog.close();
  Book.prototype.addBookToLibrary(
    authorName.value,
    title.value,
    pagesRead.value,
    checkBox.checked
  );
  generateCards();
  addListeners();
  authorName.value = "";
  title.value = "";
  pagesRead.value = "";
  checkBox.checked = 0;
});


function addListeners() {
  const Buttons = document.querySelectorAll("[class='deleteButton']");
  Buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      myLibrary.splice(event.target.id, 1);
      generateCards();
      addListeners();
    });
  });
  const readButtons = document.querySelectorAll("[id='readButton']");
  readButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if(readButtonToggle) {
      button.style.color = "green";
      readButtonToggle = false;
    }
    else {
      button.style.color = "Black";
      readButtonToggle = true;
    }});
  });
}

closeButton.addEventListener("click", () => {
  dialog.close();
});

function generateCards() {
  let htmlCode = ``;
  let id = 0;
  myLibrary.forEach((book) => {
    let status =
      book.isCompleted == 1
        ? `<svg
    xmlns="http://www.w3.org/2000/svg"
    id="readButton"
    width="2rem"
    height="2rem"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    >
      <path d="m4 12.9l3.143 3.6L15 7.5" opacity="0.5" />
      <path d="m20 7.563l-8.571 9L11 16" />
    </g></svg>
`
        : ``;
    htmlCode +=
      ` <div id="card">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4rem"
            height="4rem"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6.75 22q-1.125 0-1.937-.763T4 19.35V5.4q0-.95.588-1.7t1.537-.95L16 .8v16l-9.475 1.9q-.225.05-.375.238T6 19.35q0 .275.225.463T6.75 20H18V4h2v18zM7 16.575l2-.4V4.225l-2 .4z"
            />
          </svg>
        </div>
        <div>
          <h3>Author:</h3>
          <span>` +
      book.author +
      `</span>
        </div>
        <div>
          <h3>Title:</h3>
          <span>` +
      book.title +
      `</span>
        </div>
        <div>
          <h3>Pages read:</h3>
          <span>` +
      book.pagesRead +
      `</span>
        </div>
        <div id="statusContainer">
          <span
            >` +
      status +
      `
          <svg xmlns="http://www.w3.org/2000/svg" class="deleteButton" id=` +
      id +
      ` width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"/></svg></span>
        </div>
      </div>`;
    id++;
  });
  mainSection.innerHTML = htmlCode;
}

generateCards();
addListeners();
