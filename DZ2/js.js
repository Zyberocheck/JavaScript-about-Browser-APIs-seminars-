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
const containerViewEl = document.querySelector('.containerView');

let count = 0;
let minNum = 0;
let indexImg = imgsEls.length;

document.addEventListener('DOMContentLoaded', function (e) {
  imgsEls.forEach((element, j) => {
    const togglesEl = document.createElement('button');
    togglesEl.classList.add('togglesBtn');
    containerViewEl.appendChild(togglesEl);

    const numTogglesBtn = containerViewEl.querySelectorAll('.togglesBtn');

    numTogglesBtn.forEach((el, i) => {
      el.addEventListener('click', function (e) {
        minNum = i + 1;
        for (let i = 0; i < imgsEls.length; i++) {
          imgsEls[i].style.display = 'none';
        }

        if (minNum <= 0) {
          minNum = imgsEls.length;
        }
        if (minNum > imgsEls.length) {
          minNum = 1;
        }
        imgsEls[minNum - 1].style.display = 'block';
      });
    });
  });
});

nextImgEl.addEventListener('click', function (e) {
  count++;
  imgsEls.forEach((element, i) => {
    if (count === i) {
      element.style.display = 'block';
      // console.log(element.nextSibling);
      // console.log(`Это индекс 1 if ${i}`);
      // console.log(`Это каунт из 1 ${count}`);
    } else {
      element.style.display = 'none';
    }
    // if (count > 0 && count === i) {
    //   element.style.display = 'block';
    //   imgsEls[i - 1].style.display = 'none';
    //   console.log(`Это индекс 2 if ${i}`);
    //   console.log(`Это каунт из 2 ${count}`);
    // }
    if (count === imgsEls.length) {
      // i = 0;
      count = 0;
      // console.log(`Это индекс 3 if ${i}`);
      // console.log(`Это каунт из 3 ${count}`);
      element.style.display = 'block';
    }
  });

  console.log(`Это каунт после прибавления ${count}`);
  //
  //
  // Через for
  // for (let i = 0; i < imgsEls.length; i++) {
  //   // console.log(imgsEls[i]);
  //   if (count === i) {
  //     imgsEls[i].style.display = 'block';
  //     console.log(`Это индекс 1 if ${i}`);
  //     console.log(`Это каунт из 1 ${count}`);
  //   } else {
  //     imgsEls[i].style.display = 'none';
  //   }
  //   // if (count > 0 && count === i) {
  //   //   imgsEls[i].style.display = 'block';
  //   //   imgsEls[i - 1].style.display = 'none';
  //   //   console.log(`Это индекс 2 if ${i}`);
  //   //   console.log(`Это каунт из 2 ${count}`);
  //   // }
  //   if (count === imgsEls.length) {
  //     i = 0;
  //     count = 0;
  //     console.log(`Это индекс 3 if ${i}`);
  //     console.log(`Это каунт из 3 ${count}`);
  //     imgsEls[i].style.display = 'block';
  //   }
  // }
  // count++;
  //
  //
  //
});

preImgEl.addEventListener('click', function (e) {
  // if (count < 0) {
  //   count = 0;
  // }
  console.log(count);

  for (let i = 0; i < imgsEls.length; i++) {
    // console.log(imgsEls[count]);
    if (count === i && count === 0) {
      imgsEls[count].style.display = 'none';
      imgsEls[count + imgsEls.length - 1].style.display = 'block';
    }
    if (count === i && count > 0) {
      imgsEls[i].style.display = 'none';
      imgsEls[i - 1].style.display = 'block';
    }
    if (count < 0) {
      count = imgsEls.length - 1;
    }
    // if (count <= -imgsEls.length) {
    //   count = -imgsEls.length + 1;
    // }
  }
  count--;
  console.log(`Это каунт из предыдущей ${count}`);
});
