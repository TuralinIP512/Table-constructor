window.onload = function() {
    let button = document.getElementById("addBtn");
    let subjectInput = document.getElementById("subject");
    let typeInput = document.getElementById("type");
    let dayInput = document.getElementById("day");
    let slotInput = document.getElementById("slot");

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