const modals = () => {
  function bindModal(
    triggerSelector,
    modalSelector,
    closerSelector,
    closeClickOverlay = true,
  ) {
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const closer = document.querySelector(closerSelector);
    const modalWindows = document.querySelectorAll('[data-modal]');
    const scrollWidth = calculateScroll();
    const windowWidth = document.querySelector('#width');
    const windowHeight = document.querySelector('#height');
		const windowProfile = document.querySelectorAll('.checkbox');

    trigger.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }

				// if window parameters (width and height)are not specified, do not open the next modal
        if (
          (!windowWidth.value || !windowHeight.value) &&
          item.classList.contains('popup_calc_button')
        ) {return;}

				// if window profile is not selected, do not open the next modal
				if(Array.from(windowProfile).every(checkbox => checkbox.checked !== true) && (item.classList.contains('popup_calc_profile_button'))) {return};


        modalWindows.forEach((item) => {
          item.style.display = 'none';
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrollWidth}px`;
      });
    });

    closer.addEventListener('click', () => {
      modalWindows.forEach((item) => {
        item.style.display = 'none';
      });

      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = `0px`;
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeClickOverlay) {
        modalWindows.forEach((item) => {
          item.style.display = 'none';
        });

        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(function () {
      document.querySelector(selector).style.display = 'block';
      document.body.style.overflow = 'hidden';
    }, time);
  }

  function calculateScroll() {
    let div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflow = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
  bindModal(
    '.popup_calc_button',
    '.popup_calc_profile',
    '.popup_calc_profile_close',
    false,
  );
  bindModal(
    '.popup_calc_profile_button',
    '.popup_calc_end',
    '.popup_calc_end_close',
    false,
  );
  // showModalByTime('.popup', 60000);
};

export default modals;
