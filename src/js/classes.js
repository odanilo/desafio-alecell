function classes() {
  const $containerClasses = document.querySelector('[data-js="list"]');
  const $buttonsContainer = document.querySelector('.header-classes__buttons');
  const disableButton = document.querySelector('[data-js="remove-btn"]');

  function countClassesIntoDOM(nodeContainer = $containerClasses) {
    return nodeContainer.querySelectorAll('[data-js="class-item"]').length;
  }

  function createClassItem() {
    const nextClassNumber = countClassesIntoDOM() + 1;
    const nextClassTitle =
      nextClassNumber < 10
        ? `Turma 0${nextClassNumber}`
        : `Turma ${nextClassNumber}`;

    const container = document.createElement('li');
    container.classList.add('header-classes__item');
    container.dataset.js = 'class-item';

    const link = document.createElement('a');
    link.classList.add('header-classes__link');
    link.setAttribute('href', '#');
    link.setAttribute('title', `Saiba mais detalhes da ${nextClassTitle}`);

    const title = document.createElement('span');
    title.classList.add('header-classes-link__content');
    title.textContent = nextClassTitle;

    link.append(title);
    container.append(link);

    return container;
  }

  function controlRemoveButton(action = true) {
    disableButton.disabled = action;
  }

  function addClassIntoDOM() {
    const classNode = createClassItem();
    $containerClasses.append(classNode);
    controlRemoveButton(false);
  }

  function removeLastClassFromDOM() {
    if (countClassesIntoDOM() <= 1) {
      return;
    }

    const lastClass = $containerClasses.lastElementChild;
    $containerClasses.removeChild(lastClass);

    if (countClassesIntoDOM() <= 1) {
      controlRemoveButton();
      return;
    }
  }

  function init() {
    $containerClasses.addEventListener('click', function (e) {
      const targetElement = e.target;
      const isClassLink = targetElement.classList.contains(
        'header-classes__link'
      );

      if (isClassLink) {
        targetElement.classList.toggle('header-classes__link--is-full');
      }
    });

    $buttonsContainer.addEventListener('click', function (e) {
      const targetElement = e.target;
      const typeOfAction = targetElement.dataset.js;

      const actions = {
        'add-btn': addClassIntoDOM,
        'remove-btn': removeLastClassFromDOM,
      };

      actions[typeOfAction]();
    });
  }

  init();
}

classes();
