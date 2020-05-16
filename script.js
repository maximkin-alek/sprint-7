
// контейнер для карточек
const list = document.querySelector('.places-list');
// кнопка добавить карточку
const buttonAdd = document.querySelector('.user-info__button');
// форма добавления карточки
const cardPopup = document.querySelector('.popup-add-card');
// кнопка отправить данные в форме добавления карточки
const buttonSendCard = document.querySelector('.popup-add-card__button');
// Переменная не используется +

// кнопка закрыть форму добавления
const buttonCloseFormAdd = document.querySelector('.popup-add-card__close');
// кнопка закрыть форму редактирования
const buttonCloseFormEdit = document.querySelector('.popup-edit-card__close');
// форма добавления карточки
const formAdd = document.querySelector('#form-add');
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
  const form = elem.querySelector('.popup__form')
  elem.classList.toggle('popup_is-opened');
  // Надо исправить
  // Метод использован до его определения
  // reserCustomErrors()
  if (elem == cardPopup) {
    cleanCardForm();
  }
  else if (elem == editPopup) {
    cleanUserForm()
  }
  form.reset();
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
  // берем заголовок из массива
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
// функция добавляет карточку в разметку страницы, принимает на вход элементы (к которому добавить, добавляемый)
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
  if (event.target.classList.contains('place-card__delete-icon')) {
    // Если код переносится на следующую за условием строку, то лучше берите его всегда в {} +
    list.removeChild(event.target.closest('.place-card'));
  }
};
// снять и поставить лайк
function addNndRemoveLike(event) {
  if (event.target.classList.contains('place-card__like-icon')) {
    // Если код переносится на следующую за условием строку, то лучше берите его всегда в {} +
    event.target.classList.toggle('place-card__like-icon_liked');
  }
};

// Функция рендера массива, содержащего объекты с карточками
function renderArrow(arr) {
  // Можно лучше
  // (obj) => {...} +
  arr.forEach((obj) => {
    const template = createTemplate(obj);
    addCard(list, template)
  })
};

// ФУНКЦИИ 7 СПРИНТА

// сбрасывает все кастомные ошибки на странице
function reserCustomErrors() {
  /*
    Массив инпутов лучше один раз получить и тут просто его использовать, чтобы каждый раз не собирать.
    Это может не самое изящное решение, как и чистка всех инпутов разом, а не у конкретной формы,
    но сейчас вполне допустимое, тем более скоро вы научитесь решать и такие задачи используя ООП, например.

    Хотя сейчас могу предложить вам интересное решение.

    Функция может вернуть как результат другую функцию. Это важный и полезный момент.

    Делаете функцию, например, makeCleaner, которая принимает форму или попап на вход. Эта функция собирает
    оттуда все инпуты и подстрочники в массивы. Далее внутри функции задаете другую функцию:

    const errorCleaner = () =>{
      тут вы в цикле бежите по массиву и все чистите
    };

    Важно, что созданная внутри функция errorCleaner не должна принимать параметров, она берет
    массив из верхней, родительской области видимости.
    и делаем теперь просто

    return errorCleaner;

    в теле скрипта делаем 2 вызова

    const cleanUserForm = makeCleaner(userFormPopup);
    const cleanCardForm = makeCleaner(userCardPopup);

    Все, у нас есть по функции чистки индивидуально для каждой формы.

    Теперь если вам надо очистить ошибки то вы просто выполняете cleanerUserForm(); или cleanCardForm();
    И теперь уже каждый раз элементы не будут выбираться из DOM.

    Созданная вами функция будет иметь доступ к массиву инпутов, она будет брать его из замыкания.
    Прочитать про замыкание можно https://learn.javascript.ru/closure
  */
  const errorsМessage = document.querySelectorAll('.error-messege')
  const errorsCustomValue = document.querySelectorAll('.popup__input')
  // Можно лучше +
  // (elem) => {...} +
  errorsМessage.forEach((elem) => {
    elem.textContent = '';
  });
  // Можно лучше +
  // (elem) => {...} +
  errorsCustomValue.forEach((elem) => {
    elem.setCustomValidity('');
  });
}

// функция сбрасывает ошибку поля, принимает элемент поля и элемент ошибки
function resetInputError(input, error) {
  input.setCustomValidity('');
  error.textContent = '';
}

// функция получает данные для формы редактирования из разметки и сбрасывает ошибки
function toGetData() {
  // получить данные из со страницы и подставить их в форму
  formEditName.value = userName.textContent;
  formEditInfo.value = userInfo.textContent;
  reserCustomErrors()
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

// функция блокирует/разблокирует кнопку сабмита
function setSubmitButtonState(elem, button) {
  if (!elem) {
    button.setAttribute('disabled', true);
  }
  else {
    button.removeAttribute('disabled');
  }
}

// Функция проверки одного поля, принимает элемент поля, проверяет на валидность, возвращает false
function checkInputValidity(element) {
  const errorМessage = document.querySelector(`#error-${element.id}`);
  // Надо исправить

  // 1) Задайте инпутам атрибуты maxlength, minlength, required, а инпуту с ссылкой -- type="URL" +
  // 2) Забудьте вообще как звали какой-то инпут, это все хардкод, особенно как вы URL отрабатываете +
  //    Все надо проверять обезличенно +
  // 3) Читйте https://developer.mozilla.org/ru/docs/Learn/HTML/Forms/Валидация_формы
  //    Раздел про проверку средствами HTML+JS
  // 4) Через validity атрибуты проверяете каждый поступивший элемент, не разбирая что там. +
  //    Все атрибуты все равно проставлены в HTML будут, тип text или URL, обязательный или нет +

  // Тут все надо переделать. +

  if (!element.value) {
    element.setCustomValidity(erorMessages.empty);
    errorМessage.textContent = element.validationMessage;
    return false;
    // После return не надо ставить else if +
    // Просто начинайте с if -- не стоит сложные логические ветвления делать без особой надобности +
  }
  if (element.validity.tooShort || element.validity.tooLong) {
    element.setCustomValidity(erorMessages.shortOrLong);
    errorМessage.textContent = element.validationMessage;
    return false;
  }
  if (element.validity.typeMismatch) {
    element.setCustomValidity(erorMessages.notUrl);
    errorМessage.textContent = element.validationMessage;
    return false;
  }
  resetInputError(element, errorМessage);
  return true;
}

// основная функция setEventListeners, содержит обработчики + 
// Вам как раз нужен метод setEventListeners -- пока что его нет. +
// Метод setEventListeners принимает на вход форму. +
// Из формы вибирает инпуты и кнопку +
// На элемент формы ставится обработчик события input +
//
// formElement.addEventListener('input',() => { +
//    Тут бежим по инпутам, проверяем их валидность и командуем кнопкой +
//    Массив не передаем сюда, просто к нему обращемся, как и к кнопке. +
// }) +
// Для установки валидации на форму вызываете 1 раз в основном теле скрипта +
// setEventListeners с переданной в него формой +

function setEventListeners(form) {
  const formElement = form;
  // Из формы вибирает инпуты и кнопку
  const formElements = Array.from(formElement.elements);
  const currentButton = formElement.querySelector('.button');
  const inputs = formElements.filter((elem) => {
    return elem.classList.contains('popup__input')
  });
  // На элемент формы ставится обработчик события input
  form.addEventListener('input', () => {
    let valid = true;
    inputs.forEach((elem) => {
      if (checkInputValidity(elem) == false) {
        valid = false;
      }
      setSubmitButtonState(valid, currentButton)
    });
  });
}
// 




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

// Ставить слушатели надо на форму а не на инпуты, если их завтра 100 будет, то мы в них потонем +
// Выше объяснение есть. +


setEventListeners(formEdit);
setEventListeners(formAdd);
// Здравствуйте
// Код у вас неплохой, но с валидацией и установкой слушателей вы немного не дошли до финала.
// Все комментарии я оставил. Исправьте замечания и присылайте на проверку.

// переделки: 
// 1. чистка всех форм
function makeCleaner(popup) {
  const errorsМessage = popup.querySelectorAll('.error-messege')
  const errorsCustomValue = popup.querySelectorAll('.popup__input')
  const errorCleaner = () => {
    errorsМessage.forEach((elem) => {
      elem.textContent = '';
    });
    errorsCustomValue.forEach((elem) => {
      elem.setCustomValidity('');
    });
  };
  return errorCleaner;
}

const cleanUserForm = makeCleaner(editPopup);
const cleanCardForm = makeCleaner(cardPopup);

/*
    Массив инпутов лучше один раз получить и тут просто его использовать, чтобы каждый раз не собирать.
    Это может не самое изящное решение, как и чистка всех инпутов разом, а не у конкретной формы,
    но сейчас вполне допустимое, тем более скоро вы научитесь решать и такие задачи используя ООП, например.

    Хотя сейчас могу предложить вам интересное решение.

    Функция может вернуть как результат другую функцию. Это важный и полезный момент.

    Делаете функцию, например, makeCleaner, которая принимает форму или попап на вход. Эта функция собирает
    оттуда все инпуты и подстрочники в массивы. Далее внутри функции задаете другую функцию:

    const errorCleaner = () =>{
      тут вы в цикле бежите по массиву и все чистите
    };

    Важно, что созданная внутри функция errorCleaner не должна принимать параметров, она берет
    массив из верхней, родительской области видимости.
    и делаем теперь просто

    return errorCleaner;

    в теле скрипта делаем 2 вызова

    const cleanUserForm = makeCleaner(userFormPopup);
    const cleanCardForm = makeCleaner(userCardPopup);

    Все, у нас есть по функции чистки индивидуально для каждой формы.

    Теперь если вам надо очистить ошибки то вы просто выполняете cleanerUserForm(); или cleanCardForm();
    И теперь уже каждый раз элементы не будут выбираться из DOM.

    Созданная вами функция будет иметь доступ к массиву инпутов, она будет брать его из замыкания.
    Прочитать про замыкание можно https://learn.javascript.ru/closure
  */