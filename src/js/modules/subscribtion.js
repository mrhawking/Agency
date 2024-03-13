import { createPopup } from "./helpers";

const subscription = () => {
  const subForm = document.querySelector('.newsletter__form');
  const formInput = subForm.querySelector('.newsletter__input');

  const isInputFilled = (value) => value.length !== 0;

  const emailValidation = (value) => {
    const emailRegexp = /^[\p{L}\p{Nd}!#&%$*+='?_\-`|{}~/^]+@[\p{L}\p{Nd}]+\.\p{L}+$/u;
    const isValid = emailRegexp.test(value) && isInputFilled(value);

    if (!isValid) {
      subForm.classList.add('newsletter__form--error');
    } else {
      subForm.classList.remove('newsletter__form--error');
    }
    return isValid;
  };

  const inputHandler = (evt) => {
    emailValidation(evt.target.value.trim());
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    const isValid = emailValidation(formInput.value);

    if (isValid) {
      createPopup({
        form: subForm,
        popup: {
          tag: 'div',
          classes: ['popup']
        },
        title: {
          tag: 'p',
          classes: ['popup__title', 'title-m', 'title-m--dark'],
          text: 'You are successfully subscribed!'
        },
        btn: {
          tag: 'p',
          classes: ['popup__btn', 'btn', 'btn--accent'],
          text: 'Okay'
        }

      });
      formInput.value = '';
    }
  };

  formInput.addEventListener('keyup', inputHandler)
  subForm.addEventListener('submit', submitHandler);
};

export default subscription;