window.onload = function () {
  const isLoggedIn = localStorage.getItem("loggedIn");

  // Show the appropriate section based on login status

  if (isLoggedIn) {
    document.getElementById("authSection").style.display = "none";

    document.getElementById("accountCreationSection").style.display = "block";
  } else {
    document.getElementById("authSection").style.display = "block";

    document.getElementById("accountCreationSection").style.display = "none";
  }
};

// Toggle between Registration and Login forms

document
  .getElementById("showRegistration")
  .addEventListener("click", function () {
    document.getElementById("registrationForm").style.display = "block";

    document.getElementById("loginForm").style.display = "none";

    document.getElementById("accountCreationSection").style.display = "none";

    document.getElementById("transactionSection").style.display = "none";
  });

document.getElementById("showLogin").addEventListener("click", function () {
  document.getElementById("registrationForm").style.display = "none";

  document.getElementById("loginForm").style.display = "block";

  document.getElementById("accountCreationSection").style.display = "none";

  document.getElementById("transactionSection").style.display = "none";
});

// Handle Registration Form Submission

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password === confirmPassword) {
      const userData = {
        ssn: document.getElementById("ssn").value,

        firstName: document.getElementById("firstName").value,

        lastName: document.getElementById("lastName").value,

        email: document.getElementById("email").value,

        password: password,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      localStorage.setItem("loggedIn", true);

      document.getElementById("authSection").style.display = "none";

      document.getElementById("accountCreationSection").style.display = "block";

      document.getElementById("registerForm").reset();
    } else {
      alert("Passwords do not match!");
    }
  });

// Handle Login Form Submission

document
  .getElementById("loginFormUI")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("emailLogin").value;

    const password = document.getElementById("passwordLogin").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      localStorage.setItem("loggedIn", true);

      document.getElementById("authSection").style.display = "none";

      document.getElementById("accountCreationSection").style.display = "block";

      document.getElementById("loginFormUI").reset();
    } else {
      document.getElementById("loginMessage").innerText =
        "Invalid email or password!";
    }
  });

// Handle Bank Account Creation Form Submission

document
  .getElementById("accountForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const accountData = {
      accountNumber: document.getElementById("accountNumber").value,

      ifsc: document.getElementById("ifsc").value,

      balance: parseFloat(document.getElementById("balance").value),

      aadhaar: document.getElementById("aadhaar").value,

      pan: document.getElementById("pan").value,

      dob: document.getElementById("dob").value,

      gender: document.getElementById("gender").value,

      maritalStatus: document.getElementById("marital").value,

      email: document.getElementById("emailAccount").value,

      address: document.getElementById("address").value,

      contact: document.getElementById("contact").value,
    };

    localStorage.setItem("bankAccount", JSON.stringify(accountData));

    document.getElementById("accountMessage").innerText =
      "Customer Registration Successful!";

    document.getElementById("transactionSection").style.display = "block";

    this.reset();
    this.style.display = "none";
  });

// Handle Transaction (Deposit/Withdraw) Form Submission

document
  .getElementById("transactionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const transactionType = document.getElementById("transactionType").value;

    const transactionAmount = parseFloat(
      document.getElementById("transactionAmount").value
    );

    const storedAccount = JSON.parse(localStorage.getItem("bankAccount"));

    if (storedAccount) {
      let currentBalance = storedAccount.balance;

      if (transactionType === "withdraw") {
        if (transactionAmount < 1000) {
          document.getElementById("transactionMessage").innerText =
            "Minimum withdrawal amount is ₹1000.";
        } else if (currentBalance - transactionAmount < 500) {
          document.getElementById("transactionMessage").innerText =
            "Minimum balance should be ₹500.";
        } else {
          currentBalance -= transactionAmount;

          storedAccount.balance = currentBalance;

          localStorage.setItem("bankAccount", JSON.stringify(storedAccount));

          document.getElementById(
            "transactionMessage"
          ).innerText = `Withdraw Successful! Remaining balance: ₹${currentBalance}`;
        }
      } else if (transactionType === "deposit") {
        currentBalance += transactionAmount;

        storedAccount.balance = currentBalance;

        localStorage.setItem("bankAccount", JSON.stringify(storedAccount));

        document.getElementById(
          "transactionMessage"
        ).innerText = `Deposit Successful! Updated balance: ₹${currentBalance}`;
      }

      document.getElementById(
        "currentBalance"
      ).innerText = `Current Balance: ₹${currentBalance}`;
    } else {
      document.getElementById("transactionMessage").innerText =
        "No account found!";
    }
  });

// Handle Logout

document.getElementById("logoutButton").addEventListener("click", function () {
  localStorage.removeItem("loggedIn");

  document.getElementById("authSection").style.display = "block";

  document.getElementById("accountCreationSection").style.display = "none";

  document.getElementById("transactionSection").style.display = "none";

  document.getElementById("balanceSection").style.display = "none";
});
