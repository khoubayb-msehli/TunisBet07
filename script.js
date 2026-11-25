
document.addEventListener("DOMContentLoaded", () => {
  const API_URL =
    "https://tunisbet07-api.tunisbet07workersdev.workers.dev/matches";

  const matchList = document.querySelector(".match-list");

  async function loadMatches() {
    if (!matchList) return;

    matchList.textContent = "جاري تحميل المباريات...";

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("API_ERROR");

      const data = await response.json();

      if (data.errors && Object.keys(data.errors).length) {
        throw new Error("API_LIMIT");
      }

      const matches = data.response || [];

      matchList.replaceChildren();

      if (matches.length === 0) {
        matchList.textContent = "لا توجد مباريات مباشرة حالياً.";
        return;
      }

      matches.forEach(item => {
        const card = document.createElement("article");
        card.className = "match-card";

        const league = document.createElement("div");
        league.className = "league";
        league.textContent = item.league.name;

        const teams = document.createElement("div");
        teams.className = "teams";

        const home = document.createElement("b");
        home.textContent = item.teams.home.name;

        const score = document.createElement("strong");
        score.textContent =
          item.goals.home + " - " + item.goals.away;

        const away = document.createElement("b");
        away.textContent = item.teams.away.name;

        teams.append(home, score, away);
        card.append(league, teams);
        matchList.appendChild(card);
      });

    } catch (error) {
      matchList.textContent =
        error.message === "API_LIMIT"
          ? "تم تجاوز حد الطلبات. حاول لاحقاً."
          : "تعذر تحميل المباريات. حاول لاحقاً.";
    }
  }

  loadMatches();
});
