window.onload = function() {
    let manualBtn = document.getElementById("manualBtn");
    let autoBtn = document.getElementById("autoBtn");
    let manual = document.getElementById("manual");
    let auto = document.getElementById("auto");

    // Manual mode
    let button = document.getElementById("addBtn");
    let subjectInput = document.getElementById("subject");
    let typeInput = document.getElementById("type");
    let dayInput = document.getElementById("day");
    let slotInput = document.getElementById("slot");

    // Automatic mode
    let autoSubjectInput = document.getElementById("autoSubject");
    let autoTypeInput = document.getElementById("autoType");
    let autoAddBtn = document.getElementById("autoAddBtn");
    let generateBtn = document.getElementById("genBtn");
    let clearBtn = document.getElementById("clearBtn");
    let subjectList = document.getElementById("subjectList");

    let subjects = [];

    // Modes chanching
    manualBtn.onclick = function() {
        manual.style.display = "flex";
        auto.style.display = "none";
        manualBtn.style.background = "#86e79d";
        autoBtn.style.background = "";
    };
    autoBtn.onclick = function() {
        manual.style.display = "none";
        auto.style.display = "flex";
        manualBtn.style.background = "";
        autoBtn.style.background = "#86e79d";
    };

    // Manual mode
    button.onclick = function() {
        let subject = subjectInput.value.trim();
        let type = typeInput.value;

        if(subject === "") {
            alert("Введите корректное название предмета");
            return;
        }
        
        let days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
        let columnIndex = days.indexOf(dayInput.value) + 1;
        let slots = ["1 пара", "2 пара", "3 пара", "4 пара", "5 пара", "6 пара"];
        let rowIndex = slots.indexOf(slotInput.value);

        let table = document.getElementById("schedule");

        let cell = table.rows[rowIndex + 1].cells[columnIndex];

        if(cell.innerHTML !== "") {
            alert("Эта ячейка занята");
            return;
        }

        cell.innerHTML = subject + "<br><small>" + type + "</small>";
        cell.className = "filled";
        subjectInput.value = "";
    };
};