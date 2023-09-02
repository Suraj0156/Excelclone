const theadRow = document.getElementById("table-heading-row");
const tbody = document.getElementById("table-body");
let currentCell;

for (let col = 65; col <= 90; col++) {
    let th = document.createElement("th");
    th.innerText = String.fromCharCode(col);
    theadRow.appendChild(th);
}

for (let row = 1; row <= 100; row++) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.innerText = row;
    tr.appendChild(th);
    for (let col = 1; col <= 26; col++) {
        let td = document.createElement("td");
        td.setAttribute("contenteditable", "true");
        td.setAttribute("id", `${String.fromCharCode(col + 64)}${row}`);
        td.addEventListener("focus", (event) => onfocusFunction(event));
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
}

function onfocusFunction(event) {
    currentCell = event.target;
    document.getElementById("current-cell").innerText = event.target.id;
}
