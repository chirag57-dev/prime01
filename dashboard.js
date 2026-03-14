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

  // Section switching
  const links = document.querySelectorAll(".sidebar-link[data-section]");
  const sections = {
    overview: null,
    register: document.getElementById("section-register"),
    database: document.getElementById("section-database"),
    health: document.getElementById("section-health"),
    "pashu-search": document.getElementById("section-pashu-search"),
    settings: document.getElementById("section-settings"),
  };

  const overviewSections = document.querySelectorAll(
    ".dashboard-section:not(#section-register):not(#section-database):not(#section-health):not(#section-pashu-search):not(#section-settings)"
  );

  function setActiveSection(key) {
    links.forEach((l) => l.classList.remove("active"));
    sections.register?.classList.add("hidden");
    sections.database?.classList.add("hidden");
    sections.health?.classList.add("hidden");
    sections["pashu-search"]?.classList.add("hidden");
    sections.settings?.classList.add("hidden");

    if (key === "overview") {
      overviewSections.forEach((sec) => sec.classList.remove("hidden"));
    } else {
      overviewSections.forEach((sec) => sec.classList.add("hidden"));
      const secEl = sections[key];
      if (secEl) secEl.classList.remove("hidden");
    }
  }

  links.forEach((link) => {
    const key = link.getAttribute("data-section");
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (!key) return;
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      setActiveSection(key);
      if (sidebar && window.innerWidth < 960) {
        sidebar.classList.remove("show");
      }
    });
  });
}

function initClassifierShortcut() {
  const btn = document.getElementById("open-classifier-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
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
  const miniInput = document.getElementById("dashboard-tag-id");
  const miniBtn = document.getElementById("dashboard-tag-search-btn");
  const miniResult = document.getElementById("dashboard-tag-result");

  const sectionInput = document.getElementById("section-tag-id");
  const sectionBtn = document.getElementById("section-tag-search-btn");
  const sectionResult = document.getElementById("section-tag-result");

  async function handleSearch(inputEl, resultEl) {
    const tagId = inputEl?.value.trim();
    if (!tagId || !/^\d{12}$/.test(tagId)) {
      showToast("Enter a valid 12-digit Pashu Aadhar tag.");
      return;
    }
    resultEl.innerHTML = "Searching...";
    try {
      const data = await fetchPashuData(tagId);
      renderMiniSearchResult(data, tagId, resultEl);
    } catch (err) {
      console.error(err);
      renderError(
        `Search failed: ${err.message.replace(
          "Pashu Aadhar tag not found.",
          "Pashu Aadhar tag not found in database."
        )}`,
        resultEl
      );
    }
  }

  if (miniBtn && miniInput && miniResult) {
    miniBtn.addEventListener("click", () => handleSearch(miniInput, miniResult));
  }

  if (sectionBtn && sectionInput && sectionResult) {
    sectionBtn.addEventListener("click", () => handleSearch(sectionInput, sectionResult));
  }
}

// Charts
function initCharts() {
  const primaryColor = "#22c55e";
  const blue = "#3b82f6";
  const amber = "#f97316";

  const populationCtx = document.getElementById("animalPopulationChart");
  const milkCtx = document.getElementById("milkProductionChart");
  const vaccCtx = document.getElementById("vaccinationProgressChart");

  if (populationCtx) {
    new Chart(populationCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Animals",
            data: [280, 286, 291, 295, 302, 310, 315, 318, 322, 326, 330, 333],
            borderColor: primaryColor,
            backgroundColor: "rgba(34,197,94,0.15)",
            tension: 0.35,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            ticks: { color: "#9ca3af", font: { size: 11 } },
            grid: { display: false },
          },
          y: {
            ticks: { color: "#9ca3af", font: { size: 11 } },
            grid: { color: "rgba(55, 65, 81, 0.6)" },
          },
        },
      },
    });
  }

  if (milkCtx) {
    new Chart(milkCtx, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Milk (L)",
            data: [2100, 2200, 2250, 2300, 2280, 2350, 2400],
            backgroundColor: "rgba(59,130,246,0.65)",
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: "#9ca3af", font: { size: 11 } },
            grid: { display: false },
          },
          y: {
            ticks: { color: "#9ca3af", font: { size: 11 } },
            grid: { color: "rgba(55, 65, 81, 0.6)" },
          },
        },
      },
    });
  }

  if (vaccCtx) {
    new Chart(vaccCtx, {
      type: "doughnut",
      data: {
        labels: ["Vaccinated", "Pending"],
        datasets: [
          {
            data: [89, 11],
            backgroundColor: [primaryColor, amber],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "70%",
        plugins: {
          legend: {
            labels: { color: "#e5e7eb", font: { size: 11 } },
          },
        },
      },
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  guardAuth();
  initUserProfile();
  initSidebar();
  initClassifierShortcut();
  initDashboardSearches();
  initCharts();
});
