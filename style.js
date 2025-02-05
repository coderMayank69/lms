
function logout() {
    document.getElementById("loginPage").style.display = "flex";
    document.getElementById("dashboardPage").style.display = "none";
}

function showBooks(filter) {
    var bookList = document.getElementById("bookList");
    var books = [
        { title: "Alice In Wonderland", author: "Lewis Carroll", img: "alice.jpg" },
        { title: "Beginning PHP & MySQL", author: "W. Jason Gilmore", img: "php.jpg" },
        { title: "Gone with the Wind", author: "Margaret Mitchell", img: "gone.jpg" },
        { title: "Artificial Intelligence", author: "Stuart Russell", img: "ai.jpg" }
    ];

    bookList.innerHTML = "";

    books.forEach(book => {
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
            <img src="${book.img}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
        `;
        bookList.appendChild(bookDiv);
    });
}

function searchBooks() {
    var query = document.getElementById("searchBox").value.toLowerCase();
    var books = document.querySelectorAll(".book h3");

    books.forEach(book => {
        if (book.innerText.toLowerCase().includes(query)) {
            book.parentElement.style.display = "block";
        } else {
            book.parentElement.style.display = "none";
        }
    });
}

// book updatation
document.getElementById("addBookForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("author", document.getElementById("author").value);
    formData.append("quantity", document.getElementById("quantity").value);
    formData.append("image", document.getElementById("image").files[0]);

    try {
        let response = await fetch("http://localhost:5000/add-book", {
            method: "POST",
            body: formData
        });

        let data = await response.json();
        document.getElementById("message").textContent = data.message;
    } catch (error) {
        console.error("Error adding book:", error);
    }
});

document.getElementById("removeBookForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const isbn = document.getElementById("removeIsbn").value;

    try {
        let response = await fetch(`http://localhost:5000/remove-book/${isbn}`, {
            method: "DELETE"
        });

        let data = await response.json();
        document.getElementById("message").textContent = data.message;
    } catch (error) {
        console.error("Error removing book:", error);
    }
});
