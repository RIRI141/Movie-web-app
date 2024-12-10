// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmY2MDkzYjgyYzVmODQ5MDY5NzgyNDRkOGFlYjNkMCIsIm5iZiI6MTczMzE1ODkwOS43NTEwMDAyLCJzdWIiOiI2NzRkZTdmZDdjMWQ2OThiN2RmODA0Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NipOyBwjc6kucT7YFbOB3NfKJCAZnIHpeLBhcFM3lfc",
//   },
// };

const hamburgerMenu = document.getElementById("hamburger-menu");
const menuItems = document.getElementById("menu-items");

hamburgerMenu.addEventListener("click", () => {
  const isMenuVisible = menuItems.style.display === "flex";
  menuItems.style.display = isMenuVisible ? "none" : "flex";
});

document.getElementById("dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

document.getElementById("showtoday").innerHTML = showtoday();
function showtoday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  const showtoday = year + "/" + month + "/" + date + " NOW";
  return showtoday;
}

window.addEventListener("load", showtoday);
