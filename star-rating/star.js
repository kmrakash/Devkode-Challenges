class Star {
  constructor(el, count, callback) {
    this.el = document.querySelector(el);
    this.count = count;
    this.callback = callback;
    this.active = -1;

    this.init();
    this.bindEvents();
  }

  init() {
    console.log(this.el);
    const div = document.createDocumentFragment("div");

    for (let i = 1; i <= this.count; i++) {
      const iELem = document.createElement("i");
      iELem.classList.add("fa");
      iELem.classList.add("fa-star-o");
      iELem.dataset["ratingValue"] = i;

      div.appendChild(iELem);
      console.log(iELem);
    }
    this.el.appendChild(div);
  }

  bindEvents() {
    this.el.addEventListener("mouseover", (e) => {
      this.fill(e.target.dataset["ratingValue"]);
    });

    this.el.addEventListener("mouseout", (e) => {
      this.fill(this.active);
    });

    this.el.addEventListener("click", (e) => {
      this.active = e.target.dataset["ratingValue"];
      this.callback(this.active);
    });
  }

  fill(num) {
    const iEl = document.querySelectorAll(".fa");
    for (let i = 1; i <= this.count; i++) {
      if (iEl[i - 1].dataset["ratingValue"] <= num) {
        iEl[i - 1].classList.add("fa-star");
      } else {
        iEl[i - 1].classList.remove("fa-star");
      }
    }
  }
}

function getStar(value) {
  document.getElementById("display-star").innerHTML = value;
}
new Star("#star", 5, getStar);
