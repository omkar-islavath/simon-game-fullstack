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

    // Save session
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("email", email);

    // Redirect after short delay
    setTimeout(() => {
      window.location.href = "game.html";
    }, 800);
  } else {
    status.style.color = "red";
    status.textContent = data.message || "Login failed";
  }
}

function getUserId() {
  return localStorage.getItem("userId");
}
