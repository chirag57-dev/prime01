// Mobile number + OTP-only authentication (frontend simulation)
// This replaces password-based login. No signup/reset needed for demo.

(function () {
  const OTP_LENGTH = 4;
  let generatedOtp = null;

  function showMessage(text) {
    // Simple, farmer-friendly alert for now
    alert(text);
  }

 function generateOtp() {
  const code = Math.floor(1000 + Math.random() * 9000);
  generatedOtp = code.toString();

  console.log("Demo OTP (for testing):", generatedOtp);

  // 👇 Demo OTP user ko dikhane ke liye
  alert("Demo OTP: " + generatedOtp);

  return generatedOtp;
}


  function initLoginOtpFlow() {
    const form = document.getElementById("login-form");
    if (!form) return;

    const mobileInput = document.getElementById("login-mobile");
    const otpGroup = document.getElementById("otp-group");
    const otpInput = document.getElementById("login-otp");
    const sendOtpBtn = document.getElementById("send-otp-btn");
    const loginBtn = document.getElementById("login-submit-btn");
    const stepText1 = document.querySelector("[data-i18n='auth.step1.text']");
    const stepText2 = document.querySelector("[data-i18n='auth.step2.text']");

    if (!mobileInput || !otpGroup || !otpInput || !sendOtpBtn || !loginBtn) {
      return;
    }

    otpGroup.classList.add("hidden");
    loginBtn.disabled = true;

    sendOtpBtn.addEventListener("click", function () {
      const mobile = mobileInput.value.trim();
      if (!/^\d{10}$/.test(mobile)) {
        showMessage("Please enter a valid 10-digit mobile number.");
        return;
      }

      generateOtp();
      otpGroup.classList.remove("hidden");
      sendOtpBtn.disabled = true;
      mobileInput.readOnly = true;
      loginBtn.disabled = false;

      if (stepText1 && stepText2) {
        stepText1.classList.add("completed-step");
        stepText2.classList.add("active-step");
      }

      // Simple language-agnostic feedback
      showMessage("OTP sent to your mobile number (demo).");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const mobile = mobileInput.value.trim();
      const otp = otpInput.value.trim();

      if (!/^\d{10}$/.test(mobile)) {
        showMessage("Please enter a valid 10-digit mobile number.");
        return;
      }

      if (!/^\d+$/.test(otp) || otp.length !== OTP_LENGTH) {
        showMessage("Please enter the 4-digit OTP.");
        return;
      }

      if (!generatedOtp) {
        showMessage("Please tap 'Get OTP' first.");
        return;
      }

      if (otp !== generatedOtp) {
        showMessage("OTP is incorrect. Please try again.");
        return;
      }

      // Save minimal profile and mark as logged in
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("mobile", mobile);
      if (!localStorage.getItem("name")) {
        localStorage.setItem("name", "Farmer");
      }

      showMessage("Login successful!");
      window.location.href = "dashboard.html";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLoginOtpFlow();
  });
})();
