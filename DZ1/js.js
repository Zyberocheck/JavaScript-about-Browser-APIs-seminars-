'use strict';

const classScheduleBD = `[
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8,
        "turnOff": "off"
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5,
        "turnOff": "off"
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15,
        "turnOff": "off"
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 12,
        "turnOff": "off"
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6,
        "turnOff": "off"
    }
]`;
// ---создаю переменную с названием ключа локалсторидж---
const keyEl = 'lessons';

// ---нахожу всю таблицу---
const tableClassSchedule = document.querySelector('.classSchedule');

// ---загружаю в локал сторидж данные из джейсона---
if (!localStorage.getItem(keyEl)) {
  localStorage.setItem(keyEl, classScheduleBD);
}

// ---создаю переменную в которую засовываю значения и присваиваю ключ---
const lesson = JSON.parse(localStorage.getItem(keyEl));

// ---создаю событие на загруску страницы в которой поверяю была ли сделана запись на занятие и проверяю есть ли свободные места для записи---
document.addEventListener('DOMContentLoaded', function (e) {
  const tableEl = tableClassSchedule.querySelectorAll('.objectTable');
  tableEl.forEach((element) => {
    const per = element.querySelector('.on');
    if (per) {
      per.innerHTML = 'Вы уже записаны!';
      per.style.height = '40px';
      per.disabled = true;
      const offBtn = element.querySelector('.cancelApp');
      offBtn.style.display = 'inline';
    }
  });

  lesson.forEach((element) => {
    const curMax = element.maxParticipants;
    const curNum = element.currentParticipants;
    if (curNum === curMax) {
      const tableEl = tableClassSchedule.querySelectorAll('.objectTable');
      tableEl.forEach((elem) => {
        const findCur = +elem.querySelector('#curVal').innerHTML;
        if (findCur === curMax) {
          const uPBtn = elem.querySelector('.makeApp');
          uPBtn.disabled = true;
        }
      });
    }
  });
});

// ---отображаю таблицу с занятиями на странице---
lesson.forEach((element) => {
  tableClassSchedule.insertAdjacentHTML(
    `beforeend`,
    createLessonsTable(element)
  );
});

// ---отлавливаю все кнопки отмены записи---
const cancelBtnEl = document.querySelectorAll('.cancelApp');

// отключаю кнопки с отменой записи
cancelBtnEl.forEach((element) => {
  element.style.display = 'none'; // inline
});

// ---создаю собыние нажатия на кнопку записи---
tableClassSchedule.addEventListener('click', function (e) {
  if (!e.target.classList.contains('makeApp')) {
    return;
  }
  const tableEl = e.target.closest('.objectTable');
  const currentParticipantsEl = lesson.find(
    (cuid) => cuid.id === +tableEl.getAttribute('data-id')
  );
  currentParticipantsEl.currentParticipants++;
  tableEl.querySelector('.currentParticipants').innerHTML =
    currentParticipantsEl.currentParticipants;
  currentParticipantsEl.turnOff = 'on';
  e.target.disabled = true; // false
  e.target.nextSibling.style.display = 'inline';
  localStorage.setItem(keyEl, JSON.stringify(lesson));
});

// ---создаю событие нажатия на кнопку отмены записи---
tableClassSchedule.addEventListener('click', function (e) {
  if (!e.target.classList.contains('cancelApp')) {
    return;
  }
  const tableEl = e.target.closest('.objectTable');
  const currentParticipantsEl = lesson.find(
    (cuid) => cuid.id === +tableEl.getAttribute('data-id')
  );
  currentParticipantsEl.currentParticipants--;
  currentParticipantsEl.turnOff = 'off';
  tableEl.querySelector('.currentParticipants').innerHTML =
    currentParticipantsEl.currentParticipants;
  e.target.previousSibling.disabled = false;
  e.target.style.display = 'none';
  e.target.previousSibling.innerHTML = 'Записаться';
  e.target.previousSibling.style.height = '25px';
  localStorage.setItem(keyEl, JSON.stringify(lesson));
});

// ---функция создания таблицы занятий---
function createLessonsTable(lesson) {
  return `<tr class="objectTable" data-id='${lesson.id}'>
  <td class="name">${lesson.name}</td>
    <td class="time">${lesson.time}</td>
    <td class="maxParticipants">${lesson.maxParticipants}</td>
    <td class="currentParticipants" id="curVal">${lesson.currentParticipants}</td>
    <td class="tdbtn"><button class="makeApp ${lesson.turnOff}">Записаться</button><button class="cancelApp">Отменить запись</button></td></tr>`;
}
