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

    // Writing in file button
    let saveBtn = document.getElementById("saveBtn");
    saveBtn.onclick = saveScheduleToFile;

    // Output file back into constructor button
    let loadBtn = document.getElementById("loadBtn");
    let fileInput = document.getElementById("fileInput");
    loadBtn.onclick = function() {
        fileInput.click();
    };
    fileInput.onchange = loadScheduleFromFile;

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

    // Automatic mode
    autoAddBtn.onclick = function() {
        let subject = autoSubjectInput.value.trim();
        let type = autoTypeInput.value;

        if(subject === "") {
            alert("Введите название предмета");
            return;
        }

        subjects.push({ name: subject, type: type});

        refreshList();

        autoSubjectInput.value = "";
    };
    clearBtn.onclick = function() {
        subjects = [];
        refreshList();
    };
    generateBtn.onclick = function() {
        if(subjects.length === 0) {
            alert("Добавьте хотя бы один предмет в список");
            return;
        }

        if(subjects.length > 42) {
            alert("Слишком много предметов. Максимально допустимое значение 42");
            return;
        }
        
        let table = document.getElementById("schedule");
        for(let r = 1; r <= 6; r++) {
            for(let c = 1; c <= 7; c++) {
                table.rows[r].cells[c].innerHTML = "";
                table.rows[r].cells[c].className = "";
            }
        }

        let lectures = subjects.filter(s => s.type === "Лекция");
        let practices = subjects.filter(s => s.type === "Практика");

        let cells = [];
        for(let r = 1; r <= 6; r++) {
            for(let c = 1; c <= 6; c++) {
                cells.push({ row: r, col: c });
            }
        }

        cells.sort(() => Math.random() - 0.5);

        let usedCells = [];

        for(let lecture of lectures) {
            let placed = false;
            for(let cell of cells) {
                if(usedCells.includes(cell)) continue;

                let countInDay = usedCells.filter(c => c.col == cell.col).length;

                if(countInDay < 3) {
                    usedCells.push(cell);
                    table.rows[cell.row].cells[cell.col].innerHTML = lecture.name + "<br><small>Лекция</small>";
                    table.rows[cell.row].cells[cell.col].className = "filled";
                    placed = true;
                    break;
                }
            }
            if(!placed) {
                alert("Не удалось разместить все лекции");
                return;
            }
        }

        for(let practise of practices) {
            let placed = false;
            for(let cell of cells) {
                if(usedCells.includes(cell)) continue;

                let countInDay = usedCells.filter(c => c.col === cell.col).length;

                if(countInDay < 3) {
                    usedCells.push(cell);
                    table.rows[cell.row].cells[cell.col].innerHTML = practise.name + "<br><small>Практика</small>";
                    table.rows[cell.row].cells[cell.col].className = "filled";
                    placed = true;
                    break;
                }
            }
            if(!placed) {
                alert("Не удалось разместить все практики");
                return;
            }
        }
    };


    // Updating list on the screen
    function refreshList() {
        subjectList.innerHTML = "";

        for(let i = 0; i < subjects.length; i++) {
            let s = subjects[i];
            let li = document.createElement("li");
            li.textContent = s.name + " (" + s.type + ") ";

            let delBtn = document.createElement("button");
            delBtn.textContent = "x";
            delBtn.onclick = function() {
                subjects.splice(i, 1);
                refreshList();
            };

            li.appendChild(delBtn);
            subjectList.appendChild(li);
        }

        let lectures = subjects.filter(s => s.type === "Лекция").length;
        let practices = subjects.filter(s => s.type === "Практика").length;
        document.getElementById("countInfo").textContent = subjects.length + " (лекций: " + lectures + ", практик: " + practices + ")";
    }


    // Writing table in file
    function saveScheduleToFile() {
        const table = document.getElementById("schedule");
        const scheduleData = [];

        for (let r = 1; r <= 6; r++) {
            for (let c = 1; c <= 7; c++) {
                const cellContent = table.rows[r].cells[c].innerHTML.trim();
                if (cellContent !== "") {
                    scheduleData.push({
                        day: table.rows[0].cells[c].innerText,
                        slot: table.rows[r].cells[0].innerText,
                        subject: cellContent
                    });
                }
            }
        }
        if (scheduleData.length === 0) {
            alert("Расписание пустое. Добавьте предметы");
            return;
        }

        const dataStr = JSON.stringify(scheduleData, null, 2);

        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'schedule.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);

        linkElement.click();

        alert("Файл 'schedule.json' создан и сохранён");
    }

    function loadScheduleFromFile(event) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function(e) {
            try {
                const loadedData = JSON.parse(e.target.result);

                const table = document.getElementById("schedule");
                for (let r = 1; r <= 6; r++) {
                    for (let c = 1; c <= 7; c++) {
                        table.rows[r].cells[c].innerHTML = "";
                        table.rows[r].cells[c].className = "";
                    }
                }

                loadedData.forEach(item => {
                    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
                    const slots = ["1 пара", "2 пара", "3 пара", "4 пара", "5 пара", "6 пара"];

                    const rowIndex = slots.indexOf(item.slot);
                    const columnIndex = days.indexOf(item.day) + 1;

                    if (rowIndex !== -1 && columnIndex !== -1) {
                    table.rows[rowIndex + 1].cells[columnIndex].innerHTML = item.subject;
                    table.rows[rowIndex + 1].cells[columnIndex].className = "filled";
                    }
                });

                alert("Расписание успешно загружено");
            } catch (error) {
                console.error("Ошибка загрузки файлы: ", error);
                alert("Ошибка, не удалось прочитать файл расписания");
            }
        };

        reader.readAsText(file);
    }
};