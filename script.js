// // Image
const imageUpload = document.getElementById("imageUpload");
const profileImage = document.getElementById("profileImage");
const editProfileButton = document.getElementById("editProfile");
const deleteProfileButton = document.getElementById("deleteProfile");

imageUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (event) => {
      profileImage.src = event.target.result;
      localStorage.setItem("profilePicture", event.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    alert("Mohon pilih file gambar yang valid.");
  }
});
// Tombol hapus profil
deleteProfileButton.addEventListener("click", () => {
  localStorage.removeItem("profilePicture");
  profileImage.src = "img/avatar.jpg";
});

editProfileButton.addEventListener("click", () => {
  imageUpload.click();
});
// Simpan data profil ke local storage
function loadProfileImage() {
  const savedProfilePicture = localStorage.getItem("profilePicture");
  if (savedProfilePicture) {
    profileImage.src = savedProfilePicture;
  } else {
    profileImage.src = "img/avatar.jpg";
  }
}

// Panggil fungsi loadProfileImage() saat halaman dimuat
window.onload = loadProfileImage;
// Fungsi untuk menyimpan profil ke localStorage

const newNama = document.getElementById("nama");
const newJabatan = document.getElementById("jabatan");
const namaTampil = document.getElementById("nama-tampil");
const jabatanTampil = document.getElementById("jabatan-tampil");
const saveButton = document.getElementById("save");
const errorProfile = document.getElementById("error-profile");

document.addEventListener("DOMContentLoaded", () => {
  const savedNama = localStorage.getItem("nama");
  const savedJabatan = localStorage.getItem("jabatan");

  if (savedNama) {
    namaTampil.textContent = savedNama;
  }
  if (savedJabatan) {
    jabatanTampil.textContent = savedJabatan;
  }
});
saveButton.addEventListener("click", () => {
  const namaBaru = newNama.value;
  const jabatanBaru = newJabatan.value;

  if (newNama.value.trim() === "" || newJabatan.value === "") {
    errorProfile.textContent = "Mohon Lengkapi Kolom Profile.";
    errorProfile.style.display = "block";
    return;
  } else {
    namaTampil.textContent = namaBaru;
    jabatanTampil.textContent = jabatanBaru;

    localStorage.setItem("nama", namaBaru);
    localStorage.setItem("jabatan", jabatanBaru);
    errorProfile.style.display = "none";
  }

  newNama.value = "";
  newJabatan.value = "";
});

// // Menagtur Format tanggal dan waktu
function getFormattedDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  return now.toLocaleDateString("id-ID", options);
}
const dateTimeElement = document.getElementById("tanggalWaktu");
dateTimeElement.textContent = getFormattedDateTime();

// Elemen HTML
const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("priority");
const toDoList = document.getElementById("toDoList");
const doneList = document.getElementById("doneList");
const submitBtn = document.getElementById("submitBtn");
const deleteAllDoneButton = document.getElementById("btn-dlt");
const errorMessage = document.getElementById("error-message");

// Array untuk menyimpan data tugas
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//  tanggal
function getFormattedDate() {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return now.toLocaleDateString("id-ID", options);
}

// Fungsi untuk menambahkan tugas
function addTask() {
  const newTask = {
    // title: "Selesaikan Laporan",
    id: Date.now(),
    task: taskInput.value,
    priority: prioritySelect.value,
    completed: false,
    createdAt: getFormattedDate(),
    completedAt: null,
  };
  if (taskInput.value.trim() === "" || prioritySelect.value === "") {
    errorMessage.textContent =
      "Mohon isi kolom tugas dan pilih prioritas terlebih dahulu.";
    errorMessage.style.display = "block";
    return;
  } else {
    errorMessage.style.display = "none";
  }

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

// Fungsi untuk merender ulang tabel
function renderTasks() {
  const toDoList = document.getElementById("toDoList");
  const doneList = document.getElementById("doneList");

  // hapus konten
  toDoList.innerHTML = "";
  doneList.innerHTML = "";
  // Buat elemen thead dan tr untuk judul
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const thTask = document.createElement("th");
  const thPriority = document.createElement("th");
  const thStatus = document.createElement("th");

  const thTanggal = document.createElement("th");

  thTask.textContent = "Task";
  thPriority.textContent = "Prioritas";
  thStatus.textContent = "Status";
  thTanggal.textContent = "Deadline";

  headerRow.appendChild(thTask);
  headerRow.appendChild(thPriority);
  headerRow.appendChild(thStatus);
  headerRow.appendChild(thTanggal);
  thead.appendChild(headerRow);

  // Tambahkan thead ke tabel
  toDoList.appendChild(thead.cloneNode(true));
  doneList.appendChild(thead);

  tasks.forEach((task) => {
    const list = task.completed ? doneList : toDoList;
    const row = document.createElement("tr");

    row.innerHTML = `
   
      <td>${
        task.completed
          ? `<span class="completed">${task.task}</span>`
          : task.task
      }</td>
      <td>${
        task.completed
          ? `<span class="completed">${task.priority}</span>`
          : task.priority
      }</td>
      <td><input type="checkbox" id="checkbox-${task.id}" ${
      task.completed ? "checked" : ""
    } onchange="toggleTask(${task.id})"></td>
       <td id="tgl"> ${
         task.completed
           ? `Selesai pada: ${task.completedAt}`
           : ` Ditambahkan pada: ${task.createdAt}`
       }
    </td>
    `;
    list.appendChild(row);
  });
}
function toggleTask(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  task.completed = !task.completed;

  // task.completed = true;

  task.completedAt = getFormattedDate();

  saveTasks();
  renderTasks();
}
// Fungsi untuk menghapus semua tugas yang sudah selesai
function deleteAllDoneTasks() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
}

// Fungsi untuk menyimpan data ke Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listener untuk tombol submit
submitBtn.addEventListener("click", addTask);

// Event listener untuk tombol hapus semua tugas selesai
deleteAllDoneButton.addEventListener("click", deleteAllDoneTasks);

// Muat data dari Local Storage saat halaman dimuat
renderTasks();

const logoutButton = document.getElementById("btn-log");

logoutButton.addEventListener("click", () => {
  if(window.opener) {
    window.opener.close();
  }else {
    window.close();
});
