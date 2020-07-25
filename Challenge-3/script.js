class Board {
  constructor(el, row, col) {
    this.el = document.querySelector(el);
    this.row = row;
    this.col = col;
    this.fillColor = "red";
    this.clickedCell = [];
    this.generateBoard();
    this.bindEvents();
  }

  generateBoard() {
    const div = document.createDocumentFragment();
    // this.el.innerHTML = "";
    for (let i = 0; i < this.row; i++) {
      const row = document.createElement("row");
      row.classList.add("row");
      for (let j = 0; j < this.col; j++) {
        const col = document.createElement("col");
        col.classList.add("col");
        col.dataset["cell"] = i + ":" + j;
        col.dataset["dvalue"] = i + j;

        if ((i + j) % 2 !== 0) {
          col.style.background = "#000";
          /* console.log(col); */
        }
        row.appendChild(col);
      }
      div.appendChild(row);
    }
    this.el.appendChild(div);
    // console.log(document.querySelector("body"));
  }

  bindEvents() {
    this.el.addEventListener("click", (e) => {
      this.fill(e);
    });
    // document.querySelector("body").addEventListener("click", () => {
    //   console.log("clicked");
    //   this.reset();
    // });
  }

  fill(e) {
    this.reset();
    this.clickedCell = [];
    this.clickedCell = [
      ...this.clickedCell,
      e.target.dataset["cell"].split(":"),
    ];
    const r = parseInt(this.clickedCell[0][0]);
    const c = parseInt(this.clickedCell[0][1]);
    console.log(r, c);
    const d = r + c;
    const cellEl = document.querySelectorAll(`[data-dvalue = "${d}"]`);
    // console.log(cellEl);
    cellEl.forEach((cell) => {
      //   console.log(cell);
      cell.style.background = this.fillColor;
    });

    for (let i = r, j = c; i < this.row, j < this.col; i++, j++) {
      const cell = document.querySelector(`[data-cell = "${i + ":" + j}"]`);
      cell ? (cell.style.background = this.fillColor) : null;
      console.log(cell);
    }
    for (let i = r, j = c; i >= 0, j >= 0; i--, j--) {
      const cell = document.querySelector(`[data-cell = "${i + ":" + j}"]`);
      cell ? (cell.style.background = this.fillColor) : null;
      console.log(cell);
    }
  }

  reset() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        const cell = document.querySelector(`[data-cell = "${i + ":" + j}"]`);
        if ((i + j) % 2 !== 0) {
          cell.style.background = "#000";
        } else {
          cell.style.background = "#FFFFFF";
        }
      }
    }
  }
}

new Board("#board", 8, 8);
