// js/auth.js

(function () {
  const yearEl = document.getElementById("auth-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  // Toggle password visibility
  function initPasswordToggles() {
    document.querySelectorAll(".password-field").forEach((wrapper) => {
      const input = wrapper.querySelector('input[type="password"], input[type="text"]');
      const toggleBtn = wrapper.querySelector(".password-toggle");
      if (!input || !toggleBtn) return;

      toggleBtn.addEventListener("click", () => {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        const icon = toggleBtn.querySelector("i");
        if (icon) {
          icon.classList.toggle("fa-eye");
          icon.classList.toggle("fa-eye-slash");
        }
      });
    });
  }

  function showAlert(message) {
    alert(message);
  }

  // LOGIN
  function handleLogin(e) {
    e.preventDefault();

    const mobile = document.getElementById("login-mobile")?.value.trim();
    const password = document.getElementById("login-password")?.value;

    if (!mobile || !password) {
      showAlert("Please enter mobile number and password.");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      showAlert("Mobile number must be 10 digits.");
      return;
    }

    const savedMobile = localStorage.getItem("mobile");
    const savedPassword = localStorage.getItem("password");

    if (mobile === savedMobile && password === savedPassword) {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "dashboard.html";
    } else {
      showAlert("Invalid mobile number or password.");
    }
  }

  // SIGNUP
  function handleSignup(e) {
    e.preventDefault();

    const name = document.getElementById("signup-name")?.value.trim();
    const mobile = document.getElementById("signup-mobile")?.value.trim();
    const password = document.getElementById("signup-password")?.value;

    if (!name || !mobile || !password) {
      showAlert("Please fill in all fields.");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      showAlert("Mobile number must be 10 digits.");
      return;
    }

    if (password.length < 6) {
      showAlert("Password should be at least 6 characters.");
      return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("mobile", mobile);
    localStorage.setItem("password", password);

    showAlert("Account created successfully. You can now log in.");
    window.location.href = "login.html";
  }

  // RESET PASSWORD
  function handleResetPassword(e) {
    e.preventDefault();

    const mobile = document.getElementById("reset-mobile")?.value.trim();
    const newPassword = document.getElementById("reset-password")?.value;

    if (!mobile || !newPassword) {
      showAlert("Please fill in all fields.");
      return;
    }

    const savedMobile = localStorage.getItem("mobile");
    if (mobile !== savedMobile) {
      showAlert("Mobile number not found. Please check and try again.");
      return;
    }

    if (newPassword.length < 6) {
      showAlert("Password should be at least 6 characters.");
      return;
    }

    localStorage.setItem("password", newPassword);
    showAlert("Password updated successfully. Please log in.");
    window.location.href = "login.html";
  }

  document.addEventListener("DOMContentLoaded", () => {
    initPasswordToggles();

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const resetForm = document.getElementById("reset-form");

    if (loginForm) {
      loginForm.addEventListener("submit", handleLogin);
    }

    if (signupForm) {
      signupForm.addEventListener("submit", handleSignup);
    }

    if (resetForm) {
      resetForm.addEventListener("submit", handleResetPassword);
    }
  });
})();
