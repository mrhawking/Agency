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

  const CLASS_VISIBLE = 'dropdown__list--visible';
  const CLASS_ACTIVE = 'dropdown__button--active';
  const CLASS_FILLED = 'dropdown__button--filled';

  const hideSelectList = (btn, list) => {
    list.classList.remove(CLASS_VISIBLE);
    btn.classList.remove(CLASS_ACTIVE);
  };

  const handleItemClick = (item, btn, input, list, btnClass) => {
    return (evt) => {
      evt.stopPropagation();
      btn.innerText = item.innerText;
      btn.classList.add(btnClass);
      btn.focus();
      input.value = item.dataset.value;
      hideSelectList(btn, list);
    };
  };

  const dropDowns = document.querySelectorAll('.dropdown');

  dropDowns.forEach((dropdown) => {
    const dropDownBtn = dropdown.querySelector('.dropdown__button');
    const dropDownList = dropdown.querySelector('.dropdown__list');
    const dropDownItems = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropDownInput = dropdown.querySelector('.dropdown__input-hidden');

    const toggleListVisibility = () => {
      dropDownList.classList.toggle(CLASS_VISIBLE);
      dropDownBtn.classList.add(CLASS_ACTIVE);
    };

    dropDownBtn.addEventListener('click', toggleListVisibility);

    dropDownItems.forEach((listItem) => {
      listItem.addEventListener('click', handleItemClick(listItem, dropDownBtn, dropDownInput, dropDownList, CLASS_FILLED));
    });

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
  });
}

export default customSelect;