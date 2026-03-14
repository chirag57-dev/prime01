// Simple demo classifier UI: show preview and fake breed result

document.addEventListener("DOMContentLoaded", () => {
  const uploadArea = document.getElementById("upload-area");
  const fileInput = document.getElementById("file-input");
  const imgPreview = document.getElementById("image-preview");
  const uploadPrompt = document.getElementById("upload-prompt");
  const resultArea = document.getElementById("result-area");
  const resultText = document.getElementById("result-text");
  const spinner = document.getElementById("classifier-spinner");
  const resetButton = document.getElementById("reset-button");

  if (!uploadArea || !fileInput || !imgPreview || !uploadPrompt || !resultArea || !resultText || !spinner || !resetButton) {
    return;
  }

  function setResult(breed, confidence) {
    const lang = window.LanguageManager ? window.LanguageManager.getCurrentLang() : "en";
    if (lang === "hi") {
      resultText.innerHTML = `<strong>नस्ल: ${breed}</strong><span>विश्वास: ${confidence}%</span>`;
    } else {
      resultText.innerHTML = `<strong>Breed: ${breed}</strong><span>Confidence: ${confidence}%</span>`;
    }
  }

  function fakePredict() {
    spinner.style.display = "block";
    resultArea.classList.remove("hidden");
    resultText.innerHTML = "";
    setTimeout(() => {
      spinner.style.display = "none";
      // Simple fixed demo result
      setResult("Gir Cow", 94);
    }, 900);
  }

  function handleFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      imgPreview.src = e.target.result;
      imgPreview.style.display = "block";
      uploadPrompt.classList.add("hidden");
      fakePredict();
      resetButton.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  }

  uploadArea.addEventListener("click", () => {
    fileInput.click();
  });

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("drag-over");
  });

  uploadArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("drag-over");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    handleFile(file);
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    handleFile(file);
  });

  resetButton.addEventListener("click", () => {
    imgPreview.style.display = "none";
    imgPreview.src = "#";
    uploadPrompt.classList.remove("hidden");
    resultArea.classList.add("hidden");
    resetButton.classList.add("hidden");
    fileInput.value = "";
  });
});
