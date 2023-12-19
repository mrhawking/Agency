const createElem = (tag, classesArr, text) => {
  const element = document.createElement(tag);
  classesArr.forEach((item) => {
    element.classList.add(item);
  });
  if (text) {
    element.textContent = text;
  }
  return element;
};

const createPopup = ({form, popup, title, text, btn}) => {
  const popupEl = createElem(popup.tag, popup.classes);
  const titleEl = createElem(title.tag, title.classes, title.text);
  const btnEl = createElem(btn.tag, btn.classes, btn.text);
  const textEl = text ? createElem(text.tag, text.classes, text.text) : '';
  popupEl.append(titleEl, textEl, btnEl);
  form.after(popupEl);

  const btnHandler = (evt) => {
    evt.stopPropagation();
      popupEl.remove();
      btnEl.removeEventListener('click', btnHandler);
      document.removeEventListener('click', btnHandler);
      document.removeEventListener('keydown', btnHandler);

  };

  btnEl.addEventListener('click', (evt) => btnHandler(evt));
  document.addEventListener('click', (evt) => {
    if (evt.target !== popup) {
      btnHandler(evt)
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      btnHandler(evt);
    }
  });
};

export {createElem, createPopup};