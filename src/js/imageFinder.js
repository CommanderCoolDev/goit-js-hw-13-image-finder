import template from '../templates/imageCard.hbs';//ипорт шаблона
import { searchForm, input, ul, modalDiv, modalDivButton, modalImg, addPictures } from './refs';// импорт ссылок
import getPictures from '../helpers/apiService';
import { error } from '@pnotify/core/dist/PNotify';

// объект значений которые будут использоваться для запросов
const state = {
  page: 1,
  query: '',
};

// слушалки
searchForm.addEventListener(`submit`, sendSubmit);
ul.addEventListener(`click`, opneModal);
addPictures.addEventListener(`click`, addNewPictures);
modalDiv.addEventListener(`click`, closeModalWindow);

// таргеты за которыми будем следить observer
const targets = document.getElementsByClassName('modal-img');
// настройки нашего observer
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

// Функция которая догружает изображения, когда срабатывает observer
const loadImage = function () {
  if (state.page > 1) {
    state.page += 1;
    getPictures(state.query, state.page).then(resp => {
      const data = resp.data.hits;
      const mark = template(data);
      ul.insertAdjacentHTML(`beforeend`, mark);
    });
  }
};

// инициализируем объект observer
const observer = new IntersectionObserver(loadImage, options);
// говорим обзерверу следить за картинкой перебирая массив всех картинок
[...targets].forEach(target => {
  observer.observe(target);
});

// функция отправки сабмита
function sendSubmit(e) {
  e.preventDefault();
  ul.innerHTML = ``;
  state.query = `${input.value}`;
 console.log(state.query);
  if (state.query === '') {
      console.log(state.query);
    return error({ delay: 1500, text: 'Enter something...' });
  } else if (state.query.length === 0 || !state.query.trim()) {
    return error({ delay: 1500, text: 'not space' });
  }
  addPictures.style.visibility = `hidden`;
  getPictures(state.query, state.page).then(response => {
    const data = response.data.hits;
    if (data.length >= 1) {
      addPictures.style.visibility = `visible`;
    }
    const markup = template(data);
    ul.insertAdjacentHTML(`beforeend`, markup);
  });
}

// при клике на кнопку load more догружаются картинки, после того как один раз на нее кликнули6 срабатывает observer
function addNewPictures() {
  state.page += 1;
  getPictures(state.query, state.page).then(resp => {
    const data = resp.data.hits;
    const mark = template(data);
    ul.insertAdjacentHTML(`beforeend`, mark);
  });
  addPictures.removeAttribute('style');
}

// Функция открытия модалки
function opneModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  document.addEventListener(`keyup`, closeByEscape);
  modalDiv.setAttribute(`class`, `lightbox__overlay`);
  modalDivButton.setAttribute(`class`, `lightbox__button`);
  modalImg.setAttribute(`src`, `${e.target.src}`);
}

// функция закрытия модалки по эскейп
function closeByEscape(e) {
  if (e.key !== `Escape`) {
    return;
  }
  closeModalWindow();
}

// функция закрытия модалки
function closeModalWindow(e) {
  if (e?.target === modalImg) {
    return;
  }
  document.removeEventListener(`keyup`, closeByEscape);
  modalDiv.setAttribute('class', '');
  modalDivButton.setAttribute('class', 'invisible');
  modalImg.setAttribute('src', '');
}
