function accordion() {
  const accordionBtns = document.querySelectorAll('.faq-accordion__btn');
  const accordionItems = document.querySelectorAll('.faq-accordion__item');

  const accordionToggler = (index) => {
    accordionItems[index].classList.toggle('faq-accordion__item--closed');
    accordionItems[index].classList.toggle('faq-accordion__item--opened');
  }

  accordionBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => accordionToggler(index));
  })
}

export default accordion;