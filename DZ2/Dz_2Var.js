'use strict';

// Домашнее задание:

// Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице.

// Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

// Для создания элементов интерфейса используйте HTML.
// При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
// При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
// При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.

// Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.

// Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.

const togglesEl = document.querySelector('.toggles');
const preImgEl = document.querySelector('.preImg');
const nextImgEl = document.querySelector('.nextImg');
const imgsEls = document.querySelectorAll('img');

let count = 0;

nextImgEl.addEventListener('click', function (e) {
  let index = count + 1;
  if (index >= imgsEls.length) {
    index=0
  }
  imgsEls[count].style.display = 'none';
  imgsEls[index].style.display = 'block';
  count = index;
});

preImgEl.addEventListener('click', function (e) {
  let index = count - 1;
  if (index < 0) {
    index = imgsEls.length - 1;
  }
  imgsEls[count].style.display = 'none';
  imgsEls[index].style.display = 'block';
  count = index;
});
