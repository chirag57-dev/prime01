// Simple bilingual (English / Hindi) language manager
// All translatable elements should have a data-i18n="<key>" attribute.
// Text for each key is defined in the translations object below.

const LanguageManager = (function () {
  const STORAGE_KEY = "pashu_lang";

  const translations = {
    en: {
      // Global
      "app.title": "PashuAdhaar",

      // Auth / login
      "auth.welcome": "Welcome 👋",
      "auth.subtitle": "Login with your mobile number.",
      "auth.mobile.label": "Mobile Number",
      "auth.mobile.placeholder": "10-digit mobile number",
      "auth.mobile.hint": "Enter your mobile number linked with your animals.",
      "auth.otp.label": "Enter OTP",
      "auth.otp.placeholder": "4-digit code",
      "auth.otp.hint": "We have sent a 4-digit code to your phone.",
      "auth.sendOtp": "Get OTP",
      "auth.verifyOtp": "Login",
      "auth.changeMobile": "Change number",
      "auth.footer": "PashuAdhaar. All rights reserved.",

      "auth.step1.title": "Step 1",
      "auth.step1.text": "Type your mobile number and tap Get OTP.",
      "auth.step2.title": "Step 2",
      "auth.step2.text": "Enter the OTP from SMS to login.",

      // Topbar
      "topbar.title": "Farm Dashboard",
      "topbar.subtitle": "Three simple actions for your farm.",
      "topbar.search.placeholder": "Search animals or tags...",

      // Sidebar
      "nav.dashboard": "Dashboard",
      "nav.classifier": "Identify Breed",
      "nav.register": "Add New Animal",
      "nav.database": "My Animals",
      "nav.logout": "Logout",

      // Home
      "home.title": "Dashboard",
      "home.subtitle": "Choose one simple action below.",
      "home.identify.title": "Identify Animal Breed",
      "home.identify.text": "Upload photo • See breed",
      "home.add.title": "Add New Animal",
      "home.add.text": "Few simple details",
      "home.list.title": "My Animals",
      "home.list.text": "See all animals",

      "card.totalAnimals.title": "Total Animals",
      "card.totalAnimals.caption": "vs last month",

      "card.vaccinated.title": "Vaccinated Animals",
      "card.vaccinated.caption": "coverage this month",

      "card.breeding.title": "Breeding Animals",
      "card.breeding.caption": "active for breeding",

      "card.calves.title": "Newborn Calves",
      "card.calves.caption": "in last 7 days",

      "section.analytics.title": "Analytics",
      "section.analytics.subtitle": "Simple trends from your farm.",

      "chart.population.title": "Animal population",
      "chart.population.chip": "Last 12 months",
      "chart.milk.title": "Milk production",
      "chart.milk.chip": "Litres per day",
      "chart.vaccination.title": "Vaccination progress",
      "chart.vaccination.chip": "Coverage",

      "feature.classifier.title": "AI Breed Classifier",
      "feature.classifier.text": "Upload a photo and let AI guess the breed.",
      "feature.classifier.button": "Open classifier",

      "feature.tagSearch.title": "Pashu Aadhar Tag Search",
      "feature.tagSearch.text": "Type 12-digit tag to see animal details.",
      "feature.tagSearch.input": "Enter 12-digit tag ID",
      "feature.tagSearch.button": "Search",

      // Register animal
      "section.register.title": "Add New Animal",
      "section.register.subtitle": "Few simple details only.",
      "form.animal.type.label": "Animal Type",
      "form.animal.type.placeholder": "Cow / Buffalo / Goat",
      "form.animal.type.cow": "Cow",
      "form.animal.type.buffalo": "Buffalo",
      "form.animal.type.goat": "Goat",
      "form.animal.age.label": "Age",
      "form.animal.age.placeholder": "Age in years",
      "form.animal.status.label": "Status",
      "form.animal.status.normal": "Normal",
      "form.animal.status.vaccinated": "Vaccinated",
      "form.animal.status.breeding": "Breeding",
      "form.animal.status.newborn": "Newborn",
      "form.animal.addButton": "Save Animal",

      // Database
      "section.database.title": "My Animals",
      "section.database.subtitle": "Simple list of animals you added.",
      "summary.total": "Total",
      "summary.vaccinated": "Vaccinated",
      "summary.newborn": "Newborn",
      "animals.empty": "No animals added yet. Tap \"Add New Animal\".",
      "animals.age": "Age",

      // Health
      "section.health.title": "Health Records",
      "section.health.subtitle": "Keep track of vaccines and health.",

      // Pashu search
      "section.search.title": "Pashu Aadhar Search",
      "section.search.subtitle": "Search animal by tag number.",
      "section.search.label": "Pashu Aadhar Tag ID",
      "section.search.placeholder": "Enter 12-digit Pashu Aadhar tag",
      "section.search.button": "Search tag",

      // Settings
      "section.settings.title": "Settings",
      "section.settings.subtitle": "Basic app settings.",

      // Toast / errors
      "toast.tag.invalid": "Enter a valid 12-digit Pashu Aadhar tag.",
    },
    hi: {
      // Global
      "app.title": "पशुआधार",

      // Auth / login
      "auth.welcome": "नमस्ते किसान जी 👋",
      "auth.subtitle": "मोबाइल नंबर से लॉगिन करें।",
      "auth.mobile.label": "मोबाइल नंबर",
      "auth.mobile.placeholder": "10 अंकों का मोबाइल नंबर",
      "auth.mobile.hint": "वही मोबाइल नंबर डालें जो आपके पशुओं से जुड़ा है।",
      "auth.otp.label": "ओटीपी दर्ज करें",
      "auth.otp.placeholder": "4 अंकों का कोड",
      "auth.otp.hint": "आपके मोबाइल पर 4 अंकों का कोड भेजा गया है।",
      "auth.sendOtp": "ओटीपी लें",
      "auth.verifyOtp": "लॉगिन",
      "auth.changeMobile": "नंबर बदलें",
      "auth.footer": "पशुआधार. सर्वाधिकार सुरक्षित।",

      "auth.step1.title": "कदम 1",
      "auth.step1.text": "अपना मोबाइल नंबर लिखें और ओटीपी लें दबाएँ।",
      "auth.step2.title": "कदम 2",
      "auth.step2.text": "SMS में आया ओटीपी लिखें और लॉगिन करें।",

      // Topbar
      "topbar.title": "फार्म डैशबोर्ड",
      "topbar.subtitle": "आपके फार्म के लिए तीन आसान काम।",
      "topbar.search.placeholder": "पशु या टैग खोजें...",

      // Sidebar
      "nav.dashboard": "डैशबोर्ड",
      "nav.classifier": "नस्ल पहचानें",
      "nav.register": "पशु जोड़ें",
      "nav.database": "मेरे पशु",
      "nav.logout": "लॉगआउट",

      // Home
      "home.title": "डैशबोर्ड",
      "home.subtitle": "नीचे से कोई एक आसान काम चुनें।",
      "home.identify.title": "पशु की नस्ल पहचानें",
      "home.identify.text": "फोटो डालें • नस्ल देखें",
      "home.add.title": "नया पशु जोड़ें",
      "home.add.text": "बस थोड़ी जानकारी",
      "home.list.title": "मेरे पशु",
      "home.list.text": "सभी पशु देखें",

      "card.totalAnimals.title": "कुल पशु",
      "card.totalAnimals.caption": "पिछले महीने से तुलना",

      "card.vaccinated.title": "टीकाकृत पशु",
      "card.vaccinated.caption": "इस महीने की कवरेज",

      "card.breeding.title": "ब्रीडिंग वाले पशु",
      "card.breeding.caption": "ब्रीडिंग के लिए तैयार",

      "card.calves.title": "नवजात बछड़े",
      "card.calves.caption": "पिछले 7 दिनों में",

      "section.analytics.title": "एनालिटिक्स",
      "section.analytics.subtitle": "आपके फार्म के आसान ग्राफ।",

      "chart.population.title": "पशु संख्या",
      "chart.population.chip": "पिछले 12 महीने",
      "chart.milk.title": "दूध उत्पादन",
      "chart.milk.chip": "लीटर प्रति दिन",
      "chart.vaccination.title": "टीकाकरण प्रगति",
      "chart.vaccination.chip": "कवरेज",

      "feature.classifier.title": "एआई ब्रीड क्लासिफायर",
      "feature.classifier.text": "फोटो अपलोड करें और नस्ल का अनुमान देखें।",
      "feature.classifier.button": "क्लासिफायर खोलें",

      "feature.tagSearch.title": "पशु आधार टैग खोज",
      "feature.tagSearch.text": "12 अंकों का टैग डालकर जानकारी देखें।",
      "feature.tagSearch.input": "12 अंकों का टैग नंबर डालें",
      "feature.tagSearch.button": "खोजें",

      // Register animal
      "section.register.title": "नया पशु जोड़ें",
      "section.register.subtitle": "सिर्फ आसान जानकारी भरें।",
      "form.animal.type.label": "पशु प्रकार",
      "form.animal.type.placeholder": "गाय / भैंस / बकरी",
      "form.animal.type.cow": "गाय",
      "form.animal.type.buffalo": "भैंस",
      "form.animal.type.goat": "बकरी",
      "form.animal.age.label": "उम्र",
      "form.animal.age.placeholder": "उम्र (साल में)",
      "form.animal.status.label": "स्थिति",
      "form.animal.status.normal": "सामान्य",
      "form.animal.status.vaccinated": "टीकाकृत",
      "form.animal.status.breeding": "ब्रीडिंग",
      "form.animal.status.newborn": "नवजात",
      "form.animal.addButton": "पशु सेव करें",

      // Database
      "section.database.title": "मेरे पशु",
      "section.database.subtitle": "आपके जोड़े गए सभी पशुओं की साधारण सूची।",
      "summary.total": "कुल",
      "summary.vaccinated": "टीकाकृत",
      "summary.newborn": "नवजात",
      "animals.empty": "अभी कोई पशु नहीं जोड़ा गया। \"पशु जोड़ें\" दबाएँ।",
      "animals.age": "उम्र",

      // Health
      "section.health.title": "स्वास्थ्य रिकॉर्ड",
      "section.health.subtitle": "टीकाकरण और सेहत का हिसाब रखें।",

      // Pashu search
      "section.search.title": "पशु आधार खोज",
      "section.search.subtitle": "टैग नंबर से पशु खोजें।",
      "section.search.label": "पशु आधार टैग नंबर",
      "section.search.placeholder": "12 अंकों का पशु आधार टैग डालें",
      "section.search.button": "टैग खोजें",

      // Settings
      "section.settings.title": "सेटिंग्स",
      "section.settings.subtitle": "ऐप की सरल सेटिंग्स।",

      // Toast / errors
      "toast.tag.invalid": "कृपया सही 12 अंकों वाला पशु आधार टैग डालें।",
    },
  };

  function getCurrentLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "hi" || saved === "en") return saved;
    return "en";
  }

  function setCurrentLang(lang) {
    if (lang !== "en" && lang !== "hi") return;
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function applyTranslations(lang) {
    const dict = translations[lang] || translations.en;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const value = dict[key];
      if (!value) return;

      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    });
  }

  function initLanguageToggle() {
    const currentLang = getCurrentLang();
    applyTranslations(currentLang);

    const toggle = document.getElementById("lang-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const lang = target.dataset.lang;
      if (!lang) return;
      setCurrentLang(lang);
      applyTranslations(lang);

      toggle.querySelectorAll("[data-lang]").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
      });
    });

    // Set initial active state
    toggle.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLanguageToggle();
  });

  return {
    getCurrentLang,
    setCurrentLang,
    applyTranslations,
    translations,
  };
})();
