const nav = () => {
  const drop = document.querySelector(".dropdown");
  const nav = document.querySelector(".nav-items");

  drop.addEventListener("click", () => {
    //Toggle Nav
    nav.classList.toggle("nav-click");
  });
};

nav();
