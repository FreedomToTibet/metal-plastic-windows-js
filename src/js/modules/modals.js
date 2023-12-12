const modals = () => {
	function bindModal(triggerSelector, modalSelector, closerSelector) {
		const trigger = document.querySelectorAll(triggerSelector);
		const modal = document.querySelector(modalSelector);
		const closer = document.querySelector(closerSelector);

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if(e.target) {e.preventDefault();}
	
				modal.style.display = "block";
				document.body.style.overflow = "hidden"
			});
		});

		closer.addEventListener('click', () => {
			modal.style.display = "none";
			document.body.style.overflow = "";
		});

		modal.addEventListener('click', (e) => {
			if(e.target === modal) {
				modal.style.display = "none";
				document.body.style.overflow = "";
			}
		});
	}

	function showModalByTime(selector, time) {
		setTimeout(function() {
			document.querySelector(selector).style.display = 'block';
			document.body.style.overflow = "hidden"
		}, time);
	};

	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	// showModalByTime('.popup', 60000);
};

export default modals;