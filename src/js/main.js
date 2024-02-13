import './slider.js';
import modals from './modules/modals.js';
import tabs from './modules/tabs.js';
import forms from './modules/forms.js';
import changeModalState from './modules/changeModalState.js';
import timer from './modules/timer.js';
import images from './modules/images.js';

window.addEventListener('DOMContentLoaded', () => {
	"use strict";

	let modalState = {
		form: 0,
		type: "Cold"
	};

	let deadline = '2024-03-15';

	changeModalState(modalState);
	modals();
	tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'activ');
	tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
	tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
	forms(modalState);
	timer('.container1', deadline);
	images();
});