'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Cookie message

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies to improve website functionality and analystics. <button class="btn btn--close-cookie">OK</button>';

header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

///////////////////////////////////////
// Scolling

btnScollTo.addEventListener('click', function (event) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

// Should use event bubbling on common parent element
// rather than attach each addEventListener to each element to improve perfomance
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault();

    if (event.target.classList.contains('nav__link')) {
      const id = event.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (event) {
  // No matter of clicking to the button or span
  const clickedTab = event.target.closest('.operations__tab');

  if (!clickedTab) return;

  // Remove active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active')
  );

  // Activate tab
  clickedTab.classList.add('operations__tab--active');

  // Activate tab content
  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation

const handleMouseHover = function (event) {
  const link = event.target;
  if (link.classList.contains('nav__link')) {
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleMouseHover.bind(0.5));

nav.addEventListener('mouseout', handleMouseHover.bind(1));
