// js/dashboard.js

const API_URL_PASHU = "http://127.0.0.1:8000/api/pashu";

function guardAuth() {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }
}

function initUserProfile() {
  const name = localStorage.getItem("name") || "Farmer";
  const nameEl = document.getElementById("user-name");
  const initialsEl = document.getElementById("user-avatar-initials");

  if (nameEl) nameEl.textContent = name;
  if (initialsEl) {
    const initials = name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    initialsEl.textContent = initials;
  }
}

function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.getElementById("hamburger");
  const sidebarClose = document.getElementById("sidebar-close");
  const logoutBtn = document.getElementById("sidebar-logout");

  if (hamburger && sidebar) {
    hamburger.addEventListener("click", () => sidebar.classList.add("show"));
  }
  if (sidebarClose && sidebar) {
    sidebarClose.addEventListener("click", () => sidebar.classList.remove("show"));
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      window.location.href = "login.html";
    });
  }

  const links = document.querySelectorAll(".sidebar-link[data-section]");
  const sections = {
    home: document.getElementById("section-home"),
    "add-animal": document.getElementById("section-add-animal"),
    "my-animals": document.getElementById("section-my-animals"),
  };

  function showSection(key) {
    Object.values(sections).forEach((sec) => sec && sec.classList.add("hidden"));
    const target = sections[key];
    if (target) target.classList.remove("hidden");
  }

  links.forEach((link) => {
    const key = link.getAttribute("data-section");
    if (!key) return;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      showSection(key);
      if (sidebar && window.innerWidth < 960) {
        sidebar.classList.remove("show");
      }
    });
  });

  // default section
  showSection("home");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

// Pashu Aadhar search inside dashboard
async function fetchPashuData(tagId) {
  const res = await fetch(`${API_URL_PASHU}/${tagId}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || res.statusText);
  }
  return data;
}

function renderMiniSearchResult(data, tagId, targetEl) {
  if (!targetEl) return;
  const detailList = Object.entries(data)
    .map(([key, value]) => {
      const humanKey = key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      return `<li><strong>${humanKey}:</strong> ${value}</li>`;
    })
    .join("");
  targetEl.innerHTML = `
    <strong>Pashu Aadhar ID: ${tagId}</strong>
    <ul class="aadhar-list">${detailList}</ul>
  `;
}

function renderError(message, targetEl) {
  if (!targetEl) return;
  targetEl.innerHTML = `<span style="color:#fecaca;">${message}</span>`;
}

function initDashboardSearches() {
  // Pashu Aadhar search removed from simplified farmer view
}

function initHomeActions() {
  const actionIdentify = document.getElementById("action-identify");
  const actionAdd = document.getElementById("action-add");
  const actionList = document.getElementById("action-list");

  if (actionIdentify) {
    actionIdentify.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  function switchTo(sectionKey) {
    const link = document.querySelector(`.sidebar-link[data-section="${sectionKey}"]`);
    if (link) {
      link.click();
      return;
    }
    const sections = {
      home: document.getElementById("section-home"),
      "add-animal": document.getElementById("section-add-animal"),
      "my-animals": document.getElementById("section-my-animals"),
    };
    Object.values(sections).forEach((sec) => sec && sec.classList.add("hidden"));
    const target = sections[sectionKey];
    if (target) target.classList.remove("hidden");
  }

  if (actionAdd) {
    actionAdd.addEventListener("click", () => switchTo("add-animal"));
  }
  if (actionList) {
    actionList.addEventListener("click", () => switchTo("my-animals"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  guardAuth();
  initUserProfile();
  initSidebar();
  initDashboardSearches();
  initHomeActions();
});
