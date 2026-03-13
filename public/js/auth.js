let currentUserId = null;

async function signupUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  const status = document.getElementById("auth-status");

  if (res.ok) {
    status.style.color = "lightgreen";
  } else {
    status.style.color = "red";
  }

  status.textContent = data.message;
}

async function loginUser() {
  const loader = document.getElementById("loader");
  const btnText = document.getElementById("btn-text");
  const loginBtn = document.getElementById("login-btn");

  if (loader) loader.style.display = "inline-block";
  if (btnText) btnText.textContent = "Logging in...";
  if (loginBtn) loginBtn.disabled = true;

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  const status = document.getElementById("auth-status");

  if (res.ok) {
    status.style.color = "lightgreen";
    status.textContent = "Login successful!";

    localStorage.setItem("userId", data.userId);
    localStorage.setItem("email", email);

    setTimeout(() => {
      window.location.href = "game.html";
    }, 800);
  } else {
    status.style.color = "red";
    status.textContent = data.message || "Login failed";
  }

  if (loader) loader.style.display = "none";
  if (btnText) btnText.textContent = "Login";
  if (loginBtn) loginBtn.disabled = false;
}
function getUserId() {
  return localStorage.getItem("userId");
}
