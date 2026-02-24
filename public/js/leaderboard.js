async function loadLeaderboard() {
  const res = await fetch("/api/scores/leaderboard");
  const data = await res.json();

  const container = document.getElementById("leaderboard-list");
  container.innerHTML = "";

  data.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "leaderboard-row";

    row.innerHTML = `
      <div class="rank">${index + 1}</div>
      <div class="email">${item.email}</div>
      <div class="score">${item.score}</div>
    `;

    container.appendChild(row);
  });
}
