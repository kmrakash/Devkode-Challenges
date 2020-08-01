class game {
  constructor(el, row, col) {
    this.el = document.querySelector(el);
    this.row = row;
    this.col = col;
    this.rowIn = this.row;
    this.colIn = this.col;
    this.oddCell = "";
    this.score = 0;
    this.scoreEl = document.querySelector("#score");
    this.generateBoard(this.row, this.col);
    this.bindEvents();
  }

  generateBoard(row, col) {
    this.el.innerHTML = "";
    const r = row;
    const c = col;
    const { color, oddColor } = getRandomColors();
    // console.log(color);
    // console.log(oddColor);
    // this.oddColor = oddColor;
    const randomR = getRandomNum(r);
    const randomC = getRandomNum(c);
    // console.log(randomR);
    // console.log(randomC);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < r; i++) {
      const rowEl = document.createElement("div");
      rowEl.classList.add("row");
      //   console.log(rowEl);
      for (let j = 0; j < c; j++) {
        const colEl = document.createElement("div");
        colEl.classList.add("col");
        // colEl.dataset["cell"] = i + ":" + j;

        if (i === randomR && j === randomC) {
          colEl.style.background = oddColor;
          colEl.dataset["oddCell"] = i;
          this.oddCell = i;
        } else {
          colEl.style.background = color;
        }

        rowEl.appendChild(colEl);
      }
      fragment.appendChild(rowEl);
    }
    // console.log(fragment);
    this.el.appendChild(fragment);
    this.scoreEl.innerHTML = this.score;
    console.log(this.el);
  }

  bindEvents() {
    this.el.addEventListener("click", (e) => {
      const ODDCELL = e.target.dataset.oddCell;
      if (ODDCELL) {
        this.score++;
        this.rowIn++;
        this.colIn++;
        this.generateBoard(this.rowIn, this.colIn);
      } else {
        this.score = 0;
        this.rowIn = this.row;
        this.colIn = this.col;
        this.el.classList.add("shake");
        setTimeout(() => {
          this.el.classList.remove("shake");
          this.generateBoard(this.rowIn, this.colIn);
        }, 800);
      }
    });
  }
}

const getRandomNum = function (n) {
  let N = Math.floor(Math.random() * n);
  return N;
};

const getRandomColors = function () {
  var ratio = 0.618033988749895;

  var hue = (Math.random() + ratio) % 1;
  var saturation = Math.round(Math.random() * 100) % 85;
  var lightness = Math.round(Math.random() * 100) % 85;

  var color =
    "hsl(" + Math.round(360 * hue) + "," + saturation + "%," + lightness + "%)";
  var oddColor =
    "hsl(" +
    Math.round(360 * hue) +
    "," +
    saturation +
    "%," +
    (lightness + 5) +
    "%)";

  return {
    color,
    oddColor,
  };
};
