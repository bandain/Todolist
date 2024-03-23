const ary = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')):
            [];

const input = document.querySelector('.input');
const button = document.querySelector('.addBtn');

button.addEventListener('click',() => {
    createItem();
})

function createItem() {
    ary.push(input.value);
    localStorage.setItem('items',JSON.stringify(ary));
    location.reload();
}

window.onload = function () {
    displayItem();
}

function displayItem () {
    let items = "";
    for (let i = 0; i < ary.length; i++) {
        items += `
                <div class="item">
                    <div class="inputController">
                        <textarea disabled>${ary[i]}</textarea>
                        <div class="edit">
                            <i class="fa-solid fa-check deleteBtn"></i>
                            <i class="fa-solid fa-pen-to-square editBtn"></i>
                        </div>
                    </div>
                    <div class="updateController">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>
                `        
    }
    document.querySelector('.todolist').innerHTML = items;
    deleteBtnListener();
    editBtnListener();
    saveBtnListener();
    cancelBtnListener();
}

function deleteBtnListener() {
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((db,i) => {
        db.addEventListener('click',() => {
            deleteItem(i);
        })
    });
}

function deleteItem(i) {
    ary.splice(i,1);
    localStorage.setItem('items',JSON.stringify(ary));
    location.reload();
}

function editBtnListener() {
    const editBtn = document.querySelectorAll('.editBtn');
    const updateController = document.querySelectorAll('.updateController');
    const textarea = document.querySelectorAll('.inputController textarea');
    editBtn.forEach((eb,i) => {
        eb.addEventListener('click',() => {
            updateController[i].style.display = "inline";
            textarea[i].disabled = false;
        })
    });
}

function saveBtnListener() {
    const updateController = document.querySelectorAll('.updateController');
    const textarea = document.querySelectorAll('.inputController textarea');
    const saveBtn = document.querySelectorAll('.saveBtn');
    saveBtn.forEach((sb,i) => {
        sb.addEventListener('click',() => {
          updateItem(textarea[i].value,i);
          updateController.style.display = "none";
        })
    })
}

function updateItem(text,i) {
    ary[i] = text;
    localStorage.setItem('items',JSON.stringify(ary));
    location.reload();
}

function cancelBtnListener() {
    const updateController = document.querySelectorAll('.updateController');
    const cancelBtn = document.querySelectorAll('.cancelBtn');
    const textarea = document.querySelectorAll('.inputController textarea');
    cancelBtn.forEach((cb,i) => {
        cb.addEventListener('click',() => {
            updateController[i].style.display = "none";
            textarea[i].disabled = true;
        })
    })
}