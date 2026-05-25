// Эта функция будет принимать массив предметов и возвращать сгенерированное расписание
// В виде двумерного массива (матрицы) для удобства тестирования.

function generateSchedule(subjects) {
    if (!subjects || subjects.length === 0) {
        throw new Error("Массив предметов не может быть пустым");
    }
    if (subjects.length > 42) {
        throw new Error("Слишком много предметов. Максимально допустимое значение 42");
    }

    // Создаем пустую матрицу 6x7 (6 пар на 7 дней)
    const schedule = Array(6)
        .fill()
        .map(() => Array(7).fill(null));

    // Массив для отслеживания количества занятий в каждом дне (столбце)
    const dayOccupancy = new Array(7).fill(0); // Индексы 0-6

    // Функция для попытки разместить предмет
    function placeSubject(subject) {
        // Собираем все доступные ячейки
        const availableCells = [];
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                if (schedule[row][col] === null && dayOccupancy[col] < 3) {
                    availableCells.push({ row, col });
                }
            }
        }

        if (availableCells.length === 0) {
            return false;
        }

        // Выбираем случайную ячейку
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const { row, col } = availableCells[randomIndex];

        // Размещаем предмет
        schedule[row][col] = subject;

        // Увеличиваем счетчик для дня
        dayOccupancy[col]++;

        return true;
    }

    // Разделяем предметы на лекции и практики
    const lectures = subjects.filter((s) => s.type === "Лекция");
    const practices = subjects.filter((s) => s.type === "Практика");

    // Размещаем лекции
    for (const lecture of lectures) {
        if (!placeSubject(lecture)) {
            throw new Error("Не удалось разместить все лекции");
        }
    }

    // Размещаем практики
    for (const practice of practices) {
        if (!placeSubject(practice)) {
            throw new Error("Не удалось разместить все практики");
        }
    }

    return schedule;
}

module.exports = { generateSchedule };
