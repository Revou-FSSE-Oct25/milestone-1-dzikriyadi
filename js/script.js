// Javascript hanya tambahan, mencoba peraktek belajar sedikit sedikit dengan Ai
console.log("Script loaded successfully.");

/**
 * Fungsi untuk menampilkan modal prompt kustom dan mengembalikan input pengguna.
 * @returns {Promise<string|null>} Nama yang dimasukkan atau null jika dibatalkan.
 */
function showCustomPrompt() {
  return new Promise((resolve) => {
    const modal = document.getElementById("custom-modal");
    const input = document.getElementById("user-input");
    const okButton = document.getElementById("ok-button");
    const cancelButton = document.getElementById("cancel-button");

    // Tampilkan modal
    modal.style.display = "flex";
    input.value = ""; // Kosongkan input
    input.focus(); // Fokus ke input

    // Handler untuk tombol OK
    const handleOk = () => {
      modal.style.display = "none"; // Sembunyikan modal
      // Hapus event listener untuk mencegah multiple calls
      okButton.removeEventListener("click", handleOk);
      cancelButton.removeEventListener("click", handleCancel);

      // Resolve dengan nilai input
      resolve(input.value || "Tamu");
    };

    // Handler untuk tombol Cancel
    const handleCancel = () => {
      modal.style.display = "none"; // Sembunyikan modal
      // Hapus event listener
      okButton.removeEventListener("click", handleOk);
      cancelButton.removeEventListener("click", handleCancel);

      // Resolve dengan null atau nilai default (bisa diubah sesuai kebutuhan)
      resolve(null); // Mengembalikan null (seperti perilaku prompt asli saat Cancel)
    };

    okButton.addEventListener("click", handleOk);
    cancelButton.addEventListener("click", handleCancel);

    // Tambahkan event listener untuk menekan 'Enter' di input
    input.addEventListener("keyup", function (event) {
      // Nomor 13 adalah kode 'Enter'
      if (event.key === "Enter") {
        event.preventDefault();
        handleOk(); // Panggil fungsi OK
      }
    });
  });
}

// Fungsi utama yang dipanggil
async function greetUser() {
  // Panggil fungsi kustom yang menunggu input
  let userName = await showCustomPrompt();

  let welcomeText = "Hallo ";

  if (userName) {
    welcomeText += userName + ",";
  } else {
    welcomeText += "Welcome!";
  }

  // Tampilkan di elemen HTML
  document.getElementById("welcome-speech").innerText = welcomeText;
}

// Panggil fungsi untuk menampilkan pop-up saat dokumen siap (misalnya, di akhir body atau dalam event onload)
// greetUser();

/// disini menggunakan let karena nilai userName bisa berubah sesuai input user

/// Fungsi untuk validasi form
function validateForm() {
  ///inisialisasi variabel untuk menyimpan nilai input form

  let name = document.getElementById("name-input").value;
  let email = document.getElementById("email-input").value;
  let message = document.getElementById("message-input").value;

  /// check jika Kolom input kosong
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

/// Menampilkan tabel dan content input, Saat form disubmit
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Supaya tidak reload halaman

  /// disini menggunakan const (konstan) artinya nilainya tidak akan diubah lagi
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

////////////////////////////////////////////////////////////////

// =======================
//  GLOBAL
// =======================
let controller = null;
let scene = null;

// =======================
//  INIT ANIMATIONS
// =======================
function initAnimations() {
  // Hapus animasi lama jika ada
  if (controller) {
    controller.destroy(true);
    controller = null;
  }

  if (window.innerWidth <= 1200) return;

  // PARALLAX
  controller = new ScrollMagic.Controller();

  const timeline = new TimelineMax()
    .to(".item-move", 3, { y: -150 })
    .fromTo(".bg1", { y: -100 }, { y: 0, duration: 3 }, "-=3")
    .to(".content-move", 3, { top: "0%" }, "-=3");

  scene = new ScrollMagic.Scene({
    triggerElement: "section",
    duration: "100%",
    triggerHook: 0,
  })
    .setTween(timeline)
    .setPin(".content-move")
    .addTo(controller);
}

// Run saat pertama load
initAnimations();

// Re-init on resize (tanpa reload)
window.addEventListener("resize", () => {
  initAnimations();
});

// =======================
//  SCROLL HIDE NAV
// =======================
let lastScroll = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    gsap.to(navbar, { y: -110, duration: 0.3, ease: "power2.out" });
  } else {
    gsap.to(navbar, { y: 0, duration: 0.3, ease: "power2.out" });
  }

  lastScroll = currentScroll;
});

/////////////////////////////////////
const marqueeInner = document.querySelector(".marquee-inner");
const originalText = marqueeInner.innerHTML;

// Gandakan isi sampai cukup panjang melewati layar
while (marqueeInner.offsetWidth < window.innerWidth * 2) {
  marqueeInner.innerHTML += originalText;
}

// GSAP Infinite Loop
gsap.to(".marquee-inner", {
  x: () => -marqueeInner.offsetWidth / 2,
  ease: "linear",
  duration: 50,
  repeat: -1,
});
