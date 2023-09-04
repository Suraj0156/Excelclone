//const { get } = require("cheerio/lib/api/traversing");

const theadRow = document.getElementById("table-heading-row");
const tbody = document.getElementById("table-body");
const boltbutton = document.getElementById("bold-button");
const italicbutton = document.getElementById("italic-button");
const underline = document.getElementById("underline-button");
const la=document.getElementById("left-al");
const ca=document.getElementById("ct");
const ra=document.getElementById("right-al");
const fontsize= document.getElementById("fontsize");
const fontfamily=document.getElementById("fontfamily");
const cut =document.getElementById("cut");
const copy=document.getElementById("copy");
const paste=document.getElementById("paste");
const tc=document.getElementById("textcolor");
const bc=document.getElementById("bgcolor");



let currentCell;
let cutValue = {};
// sheet no




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
//uplod function
document.getElementById("json").addEventListener("change",readJsonFile);
function readJsonFile(event){
    const file=event.target.file[0];
    if(file){
        //READING FILE
        const reader = new FileReader();
        reader.onload=function(e){
            const fileContent=e.target.result;
            try{
                
                const jsonData=new JSON.parse(fileContent);
                matrx=jsonData;
                jsonData.forEach((row)=>{
                    row.forEach((cell)=>{
                        if(cell.id){
                            var myCell=document.getElementById(cell.id);
                            myCell.innerText=cell.text;
                            myCell.style.cssText=cell.cell.style;
                        }
                    })
                })

            }catch(err){
                console.log("Error in reding Json file",err);

            }
        }
        reader.readAsText(file);
    }
}
//BLD BUTTON
boltbutton.addEventListener("click",()=>{
    if( currentCell.style.fontWeight=="bold"){
        currentCell.style.fontWeight="normal";
    }
   else currentCell.style.fontWeight="bold";
})
italicbutton.addEventListener("click",()=>{
    if(currentCell.style.fontStyle=="italic"){
        currentCell.style.fontStyle="normal";
        }
        else currentCell.style.fontStyle="italic"
})
underline.addEventListener("click", () => {
    if (currentCell.style.textDecoration === "underline") {
        currentCell.style.textDecoration = "none";
    } else {
        currentCell.style.textDecoration = "underline";
    }
});

// text color
tc.addEventListener("change",()=>{
    currentCell.style.color=tc.value;
})
//background color
bc.addEventListener("change",()=>{
    currentCell.style.backgroundColor=bc.value;
})
//align
la.addEventListener("click",()=>{
        currentCell.style.textAlign = "left"
     })
    ca.addEventListener("click",()=>{
        if(currentCell.style.textAlign == "center"){
            currentCell.style.textAlign = "left"
        }
        else currentCell.style.textAlign = "center";
        })

ra.addEventListener("click",()=>{
    if(currentCell.style.textAlign == "right"){
        currentCell.style.textAlign = "left"
    }
    else currentCell.style.textAlign = "right";
    })
    // fontsize
    fontsize.addEventListener("change", () => {
        currentCell.style.fontSize = fontsize.value;
    });
    //fontfamily
    
    fontfamily.addEventListener("change", () => {
        currentCell.style.fontFamily = fontfamily.value;
    });
    // cut 
    cut.addEventListener("click", () => {
        cutValue = {
            style: currentCell.style.cssText,
            text: currentCell.innerText,
        };
        currentCell.innerText = ""; 
    });
    //paste
    //paste
paste.addEventListener("click", () => {
    if (cutValue.style || cutValue.text) {
        currentCell.style.cssText = cutValue.style;
        currentCell.innerText = cutValue.text;
    }
});
copy.addEventListener("click", () => {
    cutValue = {
        style: currentCell.style.cssText,
        text: currentCell.innerText,
    }
});


    
    function onfocusFunction(event) {
        currentCell = event.target;
        document.getElementById("current-cell").innerText = event.target.id;
    }
    
    
    
    
    
    