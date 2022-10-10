class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class userInterface {
  //Add book to list
  addBookToList(book) {
    const list = document.getElementById("book-list");
    //create tr element
    const row = document.createElement("tr");
    //insert cols
    row.innerHTML = `<td>${book.title} </td>
                   <td>${book.author} </td>
                   <td>${book.pages} </td>
                   <td>${book.read} </td>
                   <td><a href = '#' class='delete'>X<a></td>`;

    list.appendChild(row);
    list.style.fontWeight = "bold";
  }
  // show Alert
  showAlert(message, className) {
    //create div
    const div = document.createElement("div");
    //Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".container");
    const form = document.querySelector("form");
    container.insertBefore(div, form);

    //set time out after 3 sec
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  // Delete Book
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").value = "";
  }
}
// Eventlistener for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // getting form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    pages = document.getElementById("pages").value;

  //selecting the radio buttons value
  let read_status = () => {
    if (document.getElementById("read").checked) {
      return document.getElementById("read").value;
    } else {
      return document.getElementById("un-read").value;
    }
  };
  let read = read_status();

  // instantiating a book
  const book = new Book(title, author, pages, read);

  // instantiating userInterface
  const ui = new userInterface();

  //validate
  if (title === "" || author === "" || pages === "" || read === "") {
    //error alert
    ui.showAlert("please fill in all fields", "error");
  } else {
    //Add book to list
    ui.addBookToList(book);
    // show success
    ui.showAlert("Book Sucessfully Added!", "success");

    // clear fields

    ui.clearFields();
  }
  // console.log(read);

  e.preventDefault();
});

// Eventlistener for delete book

document.getElementById("book-list").addEventListener("click", function (e) {
  // instantiating userInterface
  const ui = new userInterface();

  //delete book
  ui.deleteBook(e.target);

  //show alert after delete
  ui.showAlert("Book Removed", "success");
  e.preventDefault();
});
