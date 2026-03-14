// Simple local animal manager for farmer-friendly UI

const AnimalManager = (function () {
  const STORAGE_KEY = "animals";

  function getAnimals() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveAnimals(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function addAnimal(animal) {
    const list = getAnimals();
    list.push({
      type: animal.type,
      age: animal.age,
      status: animal.status,
      createdAt: Date.now(),
    });
    saveAnimals(list);
  }

  function renderSummary() {
    const animals = getAnimals();
    const total = animals.length;
    const vaccinated = animals.filter((a) => a.status === "Vaccinated").length;
    const newborn = animals.filter((a) => a.status === "Newborn").length;

    const totalEl = document.getElementById("summary-total");
    const vaccinatedEl = document.getElementById("summary-vaccinated");
    const newbornEl = document.getElementById("summary-newborn");

    if (totalEl) totalEl.textContent = String(total);
    if (vaccinatedEl) vaccinatedEl.textContent = String(vaccinated);
    if (newbornEl) newbornEl.textContent = String(newborn);
  }

  function getTypeEmoji(type) {
    if (type === "Buffalo") return "🐃";
    if (type === "Goat") return "🐐";
    return "🐄";
  }

  function getStatusIcon(status) {
    if (status === "Vaccinated") return "💉";
    if (status === "Breeding") return "❤️";
    if (status === "Newborn") return "🐄";
    return "✅";
  }

  function renderList() {
    const listEl = document.getElementById("animals-list");
    if (!listEl) return;

    const animals = getAnimals();
    if (!animals.length) {
      listEl.innerHTML =
        '<p class="animal-empty" data-i18n="animals.empty">No animals added yet. Tap "Add New Animal".</p>';
      // Let language manager translate if available
      if (window.LanguageManager) {
        const lang = window.LanguageManager.getCurrentLang();
        window.LanguageManager.applyTranslations(lang);
      }
      return;
    }

    listEl.innerHTML = animals
      .map((a) => {
        const typeEmoji = getTypeEmoji(a.type);
        const statusIcon = getStatusIcon(a.status);
        const ageText = a.age ? `${a.age} yrs` : "--";
        return `
          <div class="animal-item">
            <div class="animal-main">
              <div class="animal-type">
                <span class="animal-type-emoji">${typeEmoji}</span>
                <span class="animal-type-text">${a.type}</span>
              </div>
              <div class="animal-age">
                <span class="animal-label" data-i18n="animals.age">Age</span>
                <span class="animal-value">${ageText}</span>
              </div>
            </div>
            <div class="animal-status-chip">
              <span class="status-emoji">${statusIcon}</span>
              <span class="animal-status-text">${a.status}</span>
            </div>
          </div>
        `;
      })
      .join("");

    if (window.LanguageManager) {
      const lang = window.LanguageManager.getCurrentLang();
      window.LanguageManager.applyTranslations(lang);
    }
  }

  function bindForm() {
    const btn = document.getElementById("addAnimalBtn");
    const ageInput = document.getElementById("animalAge");
    const typeButtons = document.querySelectorAll(".type-pill");
    const statusButtons = document.querySelectorAll(".status-pill");

    if (!btn || !ageInput || !typeButtons.length || !statusButtons.length) return;

    btn.addEventListener("click", () => {
      const activeTypeBtn = document.querySelector(".type-pill.active");
      const activeStatusBtn = document.querySelector(".status-pill.active");
      const type = activeTypeBtn?.getAttribute("data-type") || "Cow";
      const status = activeStatusBtn?.getAttribute("data-status") || "Normal";
      const age = ageInput.value ? parseInt(ageInput.value, 10) : null;

      addAnimal({ type, age, status });

      ageInput.value = "";
      showSimpleToast("Animal saved.");
      renderSummary();
      renderList();
    });

    typeButtons.forEach((btnEl) => {
      btnEl.addEventListener("click", () => {
        typeButtons.forEach((b) => b.classList.remove("active"));
        btnEl.classList.add("active");
      });
    });

    statusButtons.forEach((btnEl) => {
      btnEl.addEventListener("click", () => {
        statusButtons.forEach((b) => b.classList.remove("active"));
        btnEl.classList.add("active");
      });
    });
  }

  function showSimpleToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) {
      alert(message);
      return;
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function init() {
    bindForm();
    renderSummary();
    renderList();
  }

  document.addEventListener("DOMContentLoaded", init);

  return {
    getAnimals,
    addAnimal,
    renderSummary,
    renderList,
  };
})();
