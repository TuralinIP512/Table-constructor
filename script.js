window.onload = function() {
    let button = document.getElementById("addBtn");
    let subjectInput = document.getElementById("subject");
    let daySelect = document.getElementById("day");
    let slotInput = document.getElementById("slot");

    button.onclick = function() {
        let subject = subjectInput.value;
        let day = daySelect.value;
        let slot = slotInput.value;

        alert("Предмет: " + subject + "\nДень: " + day + "\nПара: " + slot);
    };
};