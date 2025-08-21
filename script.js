const burgerEl = document.querySelector(".header__burger")
const menuEl = document.querySelector(".header__menu")
const dropdownEls = document.querySelectorAll(".dropdown")
const accordionEls = document.querySelectorAll(".accordion")
const filterCategoryExpandButtonEls = document.querySelectorAll(".filter-category__expand-button")
const tabsEls = document.querySelectorAll(".tabs")
// Document
document.addEventListener("click", (e) => {
    const targetEl = e.target

    if (!targetEl.closest(".dropdown")) {
        const openedDropdown = document.querySelector(".dropdown--open")
        openedDropdown && openedDropdown.classList.remove("dropdown--open")
    }
})

// Dropdown
dropdownEls.forEach(dropdownEl => {
    const dropdownHeaderEl = dropdownEl.querySelector(".dropdown__header")
    dropdownEl.addEventListener("click", (e) => {
        const targetEl = e.target
        const currentTarget = e.currentTarget

        if (targetEl.closest(".dropdown__header")) {
            currentTarget.classList.toggle("dropdown--open")
        }

        if (targetEl.closest(".dropdown__list-item")) {
            const dropdownListItemEl = targetEl.closest(".dropdown__list-item")
            dropdownHeaderEl.querySelector("span").innerHTML = dropdownListItemEl.innerHTML
            currentTarget.classList.remove("dropdown--open")
        }
    })
    dropdownHeaderEl.addEventListener("click", (e) => {
    })
})

// Header
burgerEl.addEventListener("click", (e) => {
    const targetEl = e.currentTarget
    targetEl.classList.toggle("header__burger--open")
    menuEl.classList.toggle("menu--open")
    document.body.classList.toggle("_lock")
    window.scrollTo(0, 0)
})

accordionEls.forEach(accordionEl => {
    accordionEl.addEventListener("click", (e) => {
        const targetEl = e.currentTarget
        targetEl.classList.toggle("accordion--open")
    })
})

if (Swiper) {
    const swiper = new Swiper('.main-section__swiper ', {
        // Optional parameters
        loop: true,
        spacing: 20,
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

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

// Filter Category
filterCategoryExpandButtonEls.forEach(buttonEl => (
    buttonEl.addEventListener("click", (e) => {
        const targetEl = e.currentTarget
        const parentEl = e.target.closest(".filter-category")
        const listEl = parentEl.querySelector(".filter-category__list")

        if (listEl.classList.contains("filter-category__list--expanded")) {
            targetEl.innerHTML = "Ещё"
            listEl.classList.remove("filter-category__list--expanded")
        } else {
            targetEl.innerHTML = "Свернуть"
            listEl.classList.add("filter-category__list--expanded")
        }
    })
))

// Tab
tabsEls.forEach(tabsEl => {
    const tabsListEl = tabsEl.querySelector(".tabs__list")
    tabsListEl.addEventListener("click", (e) => {
        const targeEl = e.target
        if (!targeEl.closest(".tabs__tab-item")) {
            return
        }
        const tabValue = targeEl.dataset.tab
        const tabsEl = e.currentTarget.parentElement

        const activeTabItem = tabsEl.querySelector(".tabs__tab-item--active")
        const activeTabPanel = tabsEl.querySelector(".tabs__panel--active")
        const selectedTabPanel = tabsEl.querySelector(`.tabs__panel[data-tab-panel="${tabValue}"]`)

        activeTabItem.classList.remove("tabs__tab-item--active")
        targeEl.classList.add("tabs__tab-item--active")
        activeTabPanel.classList.remove("tabs__panel--active")
        selectedTabPanel.classList.add("tabs__panel--active")
    })
})