async function loadLeaderboard() {
  const res = await fetch("/api/scores/leaderboard");
  const data = await res.json();

  const container = document.getElementById("leaderboard-list");
  container.innerHTML = "";

  data.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "leaderboard-row";
    let rankDisplay = index + 1;
    if (index === 0) rankDisplay = "🥇";
    else if (index === 1) rankDisplay = "🥈";
    else if (index === 2) rankDisplay = "🥉";

    row.innerHTML = `
     <div class="rank">${rankDisplay}</div>

      <div class="email">${item.email}</div>
      <div class="score">${item.score}</div>
    `;

    container.appendChild(row);
  });
}
