const input= document.getElementById("task-input");
const addbtn= document.getElementById("add-btn");
const board= document.getElementById("board");
const colors=["gold","skyblue","green","pink"];
let notes=JSON.parse(localStorage.getItem("notes")) || [];
function createNoteElement(text,id,done=false){
    const note=document.createElement("div");
    note.className="note";
    if(done) note.classList.add("done");
    note.style.backgroundColor=colors[Math.floor(Math.random()*colors.length)];
    note.draggable=true;
    note.dataset.id=id;
    note.innerHTML =`
        <button class="delete">x</button>
        <p>${text}</p>
        `;
    note.querySelector(".delete").onclick=()=>{
        notes=notes.filter(n=> n.id!==id);
        updateBoard();
    };
    note.onclick=(e)=>{
        if(e.target.tagName !=="BUTTON") {
            notes=notes.map(n=>n.id===id ? {...n,done:!n.done}:n);
            updateBoard();
        }
    };
    return note;
}
function updateBoard() {
    board.innerHTML = "";
    notes.forEach(note => {
        const el = createNoteElement(note.text, note.id, note.done);
        board.appendChild(el);
    });
    localStorage.setItem("notes",JSON.stringify(notes));
}
addbtn.onclick = () => {
    const text = input.value.trim();
    if (text === "") return;
    notes.unshift({ id: Date.now(), text, done:false });
    input.value = "";
    updateBoard();
};
updateBoard();