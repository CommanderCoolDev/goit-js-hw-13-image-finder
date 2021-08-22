const refs = {
  searchForm: document.querySelector(`.search-form`),// форма поиска
  input: document.querySelector(`input`),// ввод - оинпут - там где тыцают кнопками
  ul: document.querySelector(`.gallery`),// галерея (список)
  modalDiv: document.querySelector(`.lightbox`),// подсветка
  modalDivButton: document.querySelector(`button[data-action="close-lightbox"]`),// кнопашка
  modalImg: document.querySelector(`.modal-img`),// модал
  addPictures: document.querySelector(`.add-more`),// добавка
};//ссылямбы мои

export const { searchForm, input, ul, modalImg, modalDivButton, modalDiv, addPictures } = refs;// експорт ссылок
