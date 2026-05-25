const { generateSchedule } = require("../scheduleGen");

function countSubjectsInSchedule(schedule) {
    return schedule.flat().filter((item) => item !== null).length;
}

describe("Функция автогенерации расписания", () => {
    test("Должна выбросить ошибку, если передан пустой массив", () => {
        expect(() => generateSchedule([])).toThrow("Массив предметов не может быть пустым");
    });

    test("Должна выбросить ошибку, если предметов больше 42", () => {
        const tooManySubjects = Array(43).fill({ name: "Math", type: "Лекция" });
        expect(() => generateSchedule(tooManySubjects)).toThrow("Слишком много предметов");
    });

    test("Должна корректно разместить один предмет", () => {
        const subjects = [{ name: "Математика", type: "Лекция" }];

        const schedule = generateSchedule(subjects);

        expect(schedule).toHaveLength(6);
        expect(schedule[0]).toHaveLength(7);

        expect(countSubjectsInSchedule(schedule)).toBe(1);
    });

    test("Должна разместить несколько предметов без ошибок", () => {
        const subjects = [
            { name: "Математика", type: "Лекция" },
            { name: "Физика", type: "Лекция" },
            { name: "Химия", type: "Практика" },
        ];

        const schedule = generateSchedule(subjects);

        expect(countSubjectsInSchedule(schedule)).toBe(3);
    });

    test("Не должна размещать более 3 предметов в один день", () => {
        const subjects = [
            { name: "Лекция 1", type: "Лекция" },
            { name: "Лекция 2", type: "Лекция" },
            { name: "Лекция 3", type: "Лекция" },
            { name: "Лекция 4", type: "Лекция" },
            { name: "Лекция 5", type: "Лекция" },
            { name: "Лекция 6", type: "Лекция" },
        ];

        const schedule = generateSchedule(subjects);

        schedule.forEach((day) => {
            const countInDay = day.filter((item) => item !== null).length;
            expect(countInDay).toBeLessThanOrEqual(3);
        });

        expect(countSubjectsInSchedule(schedule)).toBe(6);
    });
});
