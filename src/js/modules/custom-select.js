function customSelect() {
  // Полифил для NodeList forEach
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (let i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  const dropDown = document.querySelector('.contact-form__dropdown');
  const dropDownBtn = dropDown.querySelector('.contact-form__dropdown-button');
  const dropDownList = dropDown.querySelector('.contact-form__dropdown-list');
  const dropDownItems = dropDownList.querySelectorAll('.contact-form__dropdown-item');
  const dropDownInput = dropDown.querySelector('.select-input-js');

  const hideSelectList = (btn, list) => {
    list.classList.remove('contact-form__dropdown-list--visible');
    btn.classList.remove('contact-form__dropdown-button--active');
  };

  const handleItemClick = (listItem) => {
    return (evt) => {
      evt.stopPropagation();
      dropDownBtn.innerText = listItem.innerText;
      dropDownBtn.classList.add('contact-form__dropdown-button--filled');
      listItem.classList.add('contact-form__dropdown-item--chosen')
      dropDownInput.value = listItem.dataset.value;
      dropDownBtn.focus(); 
      hideSelectList(dropDownBtn, dropDownList);
    }
  };

  dropDownItems.forEach((listItem) => {
    listItem.addEventListener('click', handleItemClick(listItem));
  });

  const toggleListVisibility = () => {
    dropDownList.classList.toggle('contact-form__dropdown-list--visible');
    dropDownBtn.classList.add('contact-form__dropdown-button--active');
  };

  dropDownBtn.addEventListener('click', toggleListVisibility);

  document.addEventListener('click', (evt) => {
    if (evt.target !== dropDownBtn) {
      hideSelectList(dropDownBtn, dropDownList);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Tab' || evt.key === 'Escape' || evt.key === 'Esc') {
      hideSelectList(dropDownBtn, dropDownList);
    }
  });

}

export default customSelect;