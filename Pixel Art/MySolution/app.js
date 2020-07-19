class Board {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.board = document.getElementById("board");
    this.board.style = `
    height: 80%;
    width: 80%;
    display: grid;
    grid-template-columns: repeat(${this.row}, 1fr);
    grid-template-rows: repeat(${this.col}, 1fr);
    border: 1px solid #000000;
    `;

    this.activeColor = "red";
    this.total = this.row * this.col;
    this.pickerEL = document.getElementById("picker");

    this.init();
    this.bindEvents();
    this.colorPicker();
  }

  init() {
    this.board.className = "grid";
    const div = document.createDocumentFragment("div");

    for (let i = 0; i < this.total; i++) {
      const divEL = document.createElement("div");
      divEL.className = "box";
      divEL.dataset["Value"] = i;

      div.appendChild(divEL);
    }

    this.board.appendChild(div);
    console.log(this.board);
  }

  bindEvents() {
    this.board.addEventListener("click", (e) => {
      const num = e.target.dataset["Value"];
      console.log(e.target.dataset["Value"]);
      this.fill(num);
    });

    this.board.addEventListener("dragover", (e) => {
      const num = e.target.dataset["Value"];
      console.log(e.target.dataset["Value"]);
      this.fill(num);
    });

    this.pickerEL.addEventListener("click", (e) => {
      this.activeColor = e.target.dataset["pick"];
      console.log(e.target.dataset["pick"]);
    });
  }

  fill(num) {
    const boxEL = document.querySelectorAll(".box");
    for (let i = 0; i < this.total; i++) {
      if (boxEL[i].dataset["Value"] === num) {
        boxEL[i].style = `
            background:${this.activeColor};
        `;
      }
    }
  }

  colorPicker() {
    const div = document.createElement("div");

    div.innerHTML = `
        <button class="pick" data-pick="red">RED</button>
        <button class="pick" data-pick="yellow">YELLOW</button>
        <button class="pick" data-pick="blue">BLUE</button>
      `;

    console.log(this.pickerEL);
    this.pickerEL.appendChild(div);
  }
}

new Board(10, 10);
