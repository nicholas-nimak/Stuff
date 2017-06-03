class app {
  constructor(button, container, disp) {
    this.button = document.querySelector(button);
    this.container = document.querySelector(container);
    this.open = () => {
      if(window.getComputedStyle(this.container).display === "none") {
        this.container.style.display = disp;
      } else {
        this.container.style.display = "none";
      }
    };
    this.button.addEventListener("click", this.open);
  }
}
let search = new app("#openSearchBut", "#searchCont", "flex");
let menu = new app("#openMenuBut", "#menuCont", "flex");
