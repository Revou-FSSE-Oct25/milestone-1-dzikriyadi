console.log("Script loaded successfully.");

// greetUser();

function greetUser(name) {
  let userName = prompt("Please enter your name:");
  document.getElementById("welcome-speech").innerText = userName;
}

function validateForm() {
  /// initialize variables to store form input values
  let name = document.getElementById("name-input").value;
  let email = document.getElementById("email-input").value;
  let message = document.getElementById("message-input").value;

  /// check if fields are empty
  console.log(name, email, message);
  if (name === "" || email === "" || message === "") {
    /// jika kosong, tampilkan alert
    alert("All fields are required!");
    return false;
  } else {
    /// jika terisi, tampilkan alert terima kasih
    alert("Thank you for your message, " + name + "!");
  }
}

// Script untuk menangani submit form dan menampilakan data di tabel
// Ambil elemen form
const form = document.getElementById("contactForm");

// Saat form disubmit
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Supaya tidak reload halaman

  // Ambil nilai input
  const name = document.getElementById("name-input").value;
  const email = document.getElementById("email-input").value;
  const message = document.getElementById("message-input").value;

  // Ambil tabel dan buat baris baru
  const table = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();

  // Buat kolom dan isi datanya
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);

  cell1.textContent = name;
  cell2.textContent = email;
  cell3.textContent = message;

  // Kosongkan form setelah submit
  form.reset();
});
