class Board {
  constructor(el, row, col) {
    this.el = document.querySelector(el);
    this.row = row;
    this.col = col;
    this.activeColor = "#000";
    this.draw = false;
    this.title = document.querySelector("h1");
    this.clear = document.getElementById("clear");
    this.generateBoard();
    this.colorPicker();
    this.bindEvents();
  }

  generateBoard() {
    const div = document.createDocumentFragment();
    this.el.innerHTML = "";
    for (let i = 0; i < this.row; i++) {
      const row = document.createElement("row");
      row.classList.add("row");
      for (let j = 0; j < this.col; j++) {
        const col = document.createElement("col");
        col.classList.add("col");
        col.dataset["cell"] = i + ":" + j;
        row.appendChild(col);
      }
      div.appendChild(row);
    }
    this.el.appendChild(div);
  }

  bindEvents() {
    this.el.addEventListener("mousedown", (e) => {
      this.draw = true;
      this.fill(e);
    });

    this.el.addEventListener("mouseup", (e) => {
      this.draw = false;
    });

    this.el.addEventListener("mouseover", (e) => {
      this.draw ? this.fill(e) : null;
    });

    this.clear.addEventListener("click", (e) => {
      location.reload();
    });
  }

  fill(e) {
    const cell = document.querySelector(
      `[data-cell= "${e.target.dataset["cell"]}"] `
    );
    const color = e.target.dataset["color"];
    color ? (this.activeColor = color) : null;
    cell ? (cell.style.background = this.activeColor) : null;

    this.title.style.color = this.activeColor;
  }

  colorPicker() {
    const row = document.createElement("row");
    row.classList.add("row");
    const div = document.createDocumentFragment();
    for (let j = 0; j < this.col; j++) {
      const color = getRandomColor();
      const col = document.createElement("col");
      col.classList.add("col");
      col.dataset["color"] = color;
      col.style.background = color;
      div.appendChild(col);
    }
    row.appendChild(div);
    this.el.appendChild(row);
  }
}

function getRandomColor() {
  const letters = "0123456789ABCD";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 14)];
  }

  return color;
}
