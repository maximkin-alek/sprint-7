
// контейнер для карточек
const list = document.querySelector('.places-list');
// кнопка добавить карточку
const buttonAdd = document.querySelector('.user-info__button');
// форма добавления карточки
const cardPopup = document.querySelector('.popup-add-card');
// кнопка отправить данные в форме добавления карточки
const buttonSendCard = document.querySelector('.popup-add-card__button');
// кнопка отправки в форме редактирования
const buttonEditCard = document.querySelector('.popup-edit-card__button');
//кнопка закрыть форму добавления
const buttonCloseFormAdd = document.querySelector('.popup-add-card__close');
// кнопка закрыть форму редактирования
const buttonCloseFormEdit = document.querySelector('.popup-edit-card__close');
// форма редактирования карточки
const formEdit = document.querySelector('#form-edit');
// попап редактировать карточку
const editPopup = document.querySelector('.popup-edit-card');
// инпут имя
const cardTitle = document.querySelector('.popup__input_type_name');
// инпут ссылка на картинку
const cardLink = document.querySelector('.popup__input_type_link-url');
// кнопка редактировать карточку
const buttonEdit = document.querySelector('.user-info__edit-button');
// имя в форме редактирования
const formEditName = document.querySelector('.popup__input_type_author-name');
// информация о пользователе в форме редактирования
const formEditInfo = document.querySelector('.popup__input_type_info');
// имя пользователя
const userName = document.querySelector('.user-info__name');
// инфо пользователя
const userInfo = document.querySelector('.user-info__job');
// попап с картинкой
const popupImage = document.querySelector('.popup-image');
// кнопка закрыть попап с картинкой
const buttonCloseImage = document.querySelector('.popup-image__close');


// открыть форму 
function openPopup(elem) {
  elem.classList.toggle('popup_is-opened');
};

// закрыть форму
function closePopup(elem) {
  elem.classList.toggle('popup_is-opened');
};
// добавить элемент
function addElem(elem) {
  return document.createElement(elem);
};
// добавить класс элементу
function addClass(name, attribute) {
  return name.classList.add(attribute);
};
// добавить новую карточку, принимает на вход объект с данными
function createTemplate(obj) {
  // создать разметку карточки
  const cardItem = addElem('div');
  addClass(cardItem, 'place-card');

  const cardImage = addElem('div');
  addClass(cardImage, 'place-card__image');
  // берем фоновое изображение из массива
  cardImage.style.backgroundImage = `url('${obj.link}')`;

  const buttonDelete = addElem('button');
  addClass(buttonDelete, 'place-card__delete-icon');

  const cardDescription = addElem('div');
  addClass(cardDescription, "place-card__description");

  const cardName = addElem('h3');
  addClass(cardName, "place-card__name");
  //берем заголовок из массива
  cardName.textContent = obj.name;

  const buttonLike = addElem('button');
  addClass(buttonLike, "place-card__like-icon");

  cardImage.appendChild(buttonDelete);
  cardDescription.appendChild(cardName);
  cardDescription.appendChild(buttonLike);

  cardItem.appendChild(cardImage);
  cardItem.appendChild(cardDescription);

  return cardItem;
};
//функция добавляет карточку в разметку страницы, принимает на вход элементы (к которому добавить, добавляемый)
function addCard(item, elem) {
  item.appendChild(elem);
};
// создать карточку из формы
function createCard(event) {
  // отмена действия по умолчанию
  event.preventDefault();
  // получить данные от пользователя
  const cardObject = {};
  const popupForm = document.querySelector('.popup__form');
  // занести их в объект
  cardObject.name = cardTitle.value;
  cardObject.link = cardLink.value;
  // записать разметку в переменную
  const template = createTemplate(cardObject);
  // добавить разметку на страницу
  addCard(list, template);
  //  сбросить данные в форме
  popupForm.reset();
  // закрыть форму по отправке
  closePopup(cardPopup);
}
// удалить карточку
function deleteCard(event) {
  if (event.target.classList.contains('place-card__delete-icon'))
    list.removeChild(event.target.closest('.place-card'));
};
// снять и поставить лайк
function addNndRemoveLike(event) {
  if (event.target.classList.contains('place-card__like-icon'))
    event.target.classList.toggle('place-card__like-icon_liked');
};

//Функция рендера массива, содержащего объекты с карточками
function renderArrow(arr) {
  arr.forEach(function (obj) {
    const template = createTemplate(obj);
    addCard(list, template)
  })
};

// ФУНКЦИИ 7 СПРИНТА

// функция получает данные для формы редактирования из разметки
function toGetData() {
  // получить данные из со страницы и подставить их в форму
  formEditName.value = userName.textContent;
  formEditInfo.value = userInfo.textContent;
}

// функция записывает данные пользователя на страницу из полей ввода
function writeData() {
  userName.textContent = formEditName.value;
  userInfo.textContent = formEditInfo.value;
}

// функция меняет данные пользователя по закрытии формы
function editForm(event) {
  event.preventDefault();
  writeData();
  closePopup(editPopup);
};

// функция открыть картинку
function openImage(event) {
  // элемент img
  const popupPicture = document.querySelector('.popup-image__picture');

  // отслеживаем место клика
  if (event.target.classList.contains('place-card__image')) {
    openPopup(popupImage);
    const cardPicture = event.target;
    // получаем адрес изображения
    let url = cardPicture.style.backgroundImage;
    url = url.split('"')[1];
    // передаем адрес
    popupPicture.setAttribute('src', url);
  }
}

// функция выключения кнопки формы, принимает инпуты и кнопку
function disableButton(field1, field2, button) {
  if (field1.value.length === 0 || field2.value.length === 0) {
    button.setAttribute('disabled', true);
  }
  else {
    button.removeAttribute('disabled');
  }
};

// пройти по исходному массиву функцией, чтобы получить данные для каждой карточки
renderArrow(initialCards);



// слушатели
buttonAdd.addEventListener('click', () => openPopup(cardPopup));
buttonEdit.addEventListener('click', () => openPopup(editPopup));
buttonEdit.addEventListener('click', toGetData);
buttonCloseFormAdd.addEventListener('click', () => closePopup(cardPopup));
buttonCloseFormEdit.addEventListener('click', () => closePopup(editPopup));
buttonCloseImage.addEventListener('click', () => closePopup(popupImage));
cardPopup.addEventListener('submit', createCard);
list.addEventListener('click', addNndRemoveLike);
list.addEventListener('click', deleteCard);
editPopup.addEventListener('submit', editForm);
list.addEventListener('click', openImage);
cardPopup.addEventListener('input', () => disableButton(cardTitle, cardLink, buttonSendCard));



// текущие задачи 


formEditName.addEventListener('input', () => validationForm(formEdit));
formEditInfo.addEventListener('input', () => validationForm(formEdit));


// нужна основная функция setEventListeners, содержит обработчики
function validationForm(form) {
  const inputs = Array.from(form.elements);
  let valid = true;
  inputs.forEach(function (elem) {
    if (elem.classList.contains('popup__input')) {
      checkInputValidity(elem);
      if (checkInputValidity(elem) == false) {
        valid = false;
      }
    }
    setSubmitButtonState(valid, buttonEditCard)
  })

}

// Функция проверки одного поля, принимает элемент поля, проверяет на валидность, возвращает false
function checkInputValidity(element) {
  const errorМessage = document.querySelector(`#error-${element.id}`)
  // const element = element;
  // проверить элемент на ошибку
  console.log(element.validity)
  if (element.value.length === 0) {
    // показывает ошибку
    element.setCustomValidity(erorMessages.empty);
    errorМessage.textContent = element.validationMessage;
    console.log(element.validity)
    return false;
  }
  else if (element.value.length < 2 || element.value.length > 30) {
    element.setCustomValidity(erorMessages.shortOrLong);
    errorМessage.textContent = element.validationMessage;
    console.log(element.validity)
    return false;
  }
  else {
    element.setCustomValidity = ''
    errorМessage.textContent = '';
  }
}




// функция блокирует/разблокирует кнопку сабмита
function setSubmitButtonState(elem, button) {
  if (!elem) {
    button.setAttribute('disabled', true);
  }
  else {
    button.removeAttribute('disabled');
  }

}
