import { createElem } from "./helpers";
import { createPopup } from "./helpers";

const formValidation = () => {
  const contactForm = document.querySelector('.contact-form');
  const inputEmail = contactForm.querySelector('.contact-form__item-email');
  const inputText = contactForm.querySelector('.contact-form__item-message');
  const inputSubject = contactForm.querySelector('.select-input-js');
  const selectBtn = contactForm.querySelector('.contact-form__dropdown-button');


  const classToggle = (isValid, input) => {
    const parentNode = input.closest('.contact-form__box');

    if (!isValid) {
      parentNode.classList.add('contact-form__box--error')
    } else {
      parentNode.classList.remove('contact-form__box--error')
    }
  };

  const isInputFilled = (value) => value.length !== 0;

  const emailValidation = (value, input) => {
    const emailRegexp = /^[\p{L}\p{Nd}!#&%$*+='?_\-`|{}~/^]+@[\p{L}\p{Nd}]+\.\p{L}+$/u;
    const isValid = emailRegexp.test(value) && isInputFilled(value);
    classToggle(isValid, input);
    return isValid;
  }

  const textValidation = (value, input) => {
    const isValid = (value.length >= 2 && value.length <= 500) && isInputFilled(value);
    classToggle(isValid, input);
    return isValid;
  };

  const selectValidation = () => {
    const isValid = isInputFilled(inputSubject.value);
    classToggle(isValid, inputSubject);
    return isValid;
  };

  const emailHandler = (evt) => {
    const value = evt.target.value.trim();
    emailValidation(value, inputEmail);
  };

  const textHandler = (evt) => {
    const value = evt.target.value.trim();
    textValidation(value, inputText);
  };

  const selectHandler = () => {
    selectValidation();
  };

  // const createPopup = () => {
  //   const popup = createElem('div', ['popup']);
  //   const title = createElem('p', ['popup__title', 'title-m', 'title-m--dark'], 'Your message has been successfully sent');
  //   const text = createElem('p', ['popup__text', 'title-s', 'title-s--dark'], 'We will reply to you within three days');
  //   const btn = createElem('button', ['popup__btn', 'btn', 'btn--accent'], 'Okay');
  //   popup.append(title, text, btn);
  //   contactForm.after(popup);

  //   const btnHandler = (evt) => {
  //     evt.stopPropagation();
  //       popup.remove();
  //       btn.removeEventListener('click', btnHandler);
  //       document.removeEventListener('click', btnHandler);
  //       document.removeEventListener('keydown', btnHandler);

  //   };

  //   btn.addEventListener('click', (evt) => btnHandler(evt));
  //   document.addEventListener('click', (evt) => {
  //     if (evt.target !== popup) {
  //       btnHandler(evt)
  //     }
  //   });
  //   document.addEventListener('keydown', (evt) => {
  //     if (evt.key === 'Escape' || evt.key === 'Esc') {
  //       btnHandler(evt);
  //     }
  //   });
  // };


  const submitHandler = (evt) => {
    evt.preventDefault();
    const isSelectValid = selectValidation();
    const isEmailValid = emailValidation(inputEmail.value, inputEmail);
    const isTextValid = textValidation(inputText.value, inputText);

    if (isSelectValid && isEmailValid && isTextValid) {
      createPopup({
        form: contactForm,
        popup: {
          tag: 'div',
          classes: ['popup']
        },
        title: {
          tag: 'p',
          classes: ['popup__title', 'title-m', 'title-m--dark'],
          text: 'Your message has been successfully sent'
        },
        text: {
          tag: 'p',
          classes: ['popup__text', 'title-s', 'title-s--dark'],
          text: 'We will reply to you within three days'
        },
        btn: {
          tag: 'p',
          classes: ['popup__btn', 'btn', 'btn--accent'],
          text: 'Okay'
        }

      });
      selectBtn.classList.remove('contact-form__dropdown-button--filled')
      selectBtn.innerText = 'Subject'
      inputEmail.value = '';
      inputText.value = '';
    }

  };

  inputEmail.addEventListener('change', (evt) => emailHandler(evt));
  inputText.addEventListener('change', (evt) => textHandler(evt));
  inputText.addEventListener('focus', selectHandler);
  contactForm.addEventListener('submit', (evt) => submitHandler(evt));
};

export default formValidation;