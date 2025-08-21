const burgerEl = document.querySelector(".header__burger")
const menuEl = document.querySelector(".header__menu")
const accordionEls = document.querySelectorAll(".accordion")

burgerEl.addEventListener("click", (e) => {
    const targetEl = e.currentTarget
    targetEl.classList.toggle("header__burger--open")
    menuEl.classList.toggle("menu--open")
})

accordionEls.forEach(accordionEl => {
    accordionEl.addEventListener("click", (e) => {
        const targetEl = e.currentTarget
        targetEl.classList.toggle("accordion--open")
    })
})


// Calendar
const monthSelect = document.getElementById('month-select');
const yearSelect = document.getElementById('year-select');
const calendarBody = document.getElementById('calendar-body');

const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

function populateSelectors() {
    monthNames.forEach((name, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = name;
        monthSelect.appendChild(option);
    });

    const currentYear = new Date().getFullYear();
    for (let y = currentYear - 10; y <= currentYear + 10; y++) {
        const option = document.createElement('option');
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    }

    monthSelect.value = new Date().getMonth();
    yearSelect.value = new Date().getFullYear();
}

function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function getStartDay(month, year) {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Пн = 0
}

function renderCalendar(month, year) {
    calendarBody.innerHTML = '';

    const daysInMonth = getDaysInMonth(month, year);
    const startDay = getStartDay(month, year);

    const prevMonth = (month - 1 + 12) % 12;
    const nextMonth = (month + 1) % 12;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const nextMonthYear = month === 11 ? year + 1 : year;

    const daysInPrevMonth = getDaysInMonth(prevMonth, prevMonthYear);

    let days = [];

    // Добавляем дни из предыдущего месяца
    for (let i = startDay - 1; i >= 0; i--) {
        days.push({
            day: daysInPrevMonth - i,
            faded: true
        });
    }

    // Дни текущего месяца
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({
            day: i,
            faded: false
        });
    }

    // Добавляем дни из следующего месяца
    while (days.length % 7 !== 0) {
        days.push({
            day: days.length - (daysInMonth + startDay) + 1,
            faded: true
        });
    }

    // Убедимся, что всегда 6 строк (6 * 7 = 42 ячейки)
    while (days.length < 35) {
        days.push({
            day: days.length - (daysInMonth + startDay) + 1,
            faded: true
        });
    }

    for (let i = 0; i < days.length; i += 7) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            cell.textContent = days[i + j].day;
            if (days[i + j].faded) {
                cell.classList.add('faded');
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
}

monthSelect.addEventListener('change', () => {
    renderCalendar(+monthSelect.value, +yearSelect.value);
});

yearSelect.addEventListener('change', () => {
    renderCalendar(+monthSelect.value, +yearSelect.value);
});

// Инициализация
populateSelectors();
renderCalendar(+monthSelect.value, +yearSelect.value);