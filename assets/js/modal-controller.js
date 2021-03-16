const mealModal = document.getElementById("meal-modal");
const menu = document.getElementById("hamburger-nav");
const mealTrigger = document.getElementById("meal-modal-toggle");
const mealClose = document.getElementById("close");

mealTrigger.onclick = function () {
    menu.click();
    mealModal.style.display = "block";
}
mealClose.onclick = function () {
    document.getElementById("name").value = '';
    document.getElementById("description").value = '';
    document.getElementById("price").value = '';
    document.getElementById("picture").value = '';
    mealModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === mealModal) {
        mealModal.style.display = "none";
    }
}

function closeMealModal() {
    document.getElementById("name").value = '';
    document.getElementById("description").value = '';
    document.getElementById("price").value = '';
    document.getElementById("picture").value = '';
    document.getElementById("meal-modal").style.display = "none";
}
