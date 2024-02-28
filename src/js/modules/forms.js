import checkNumberInputs from "./checkNumberInputs";

const forms = (state) => {
	const form = document.querySelectorAll('form');
	const input = document.querySelectorAll('input');

	checkNumberInputs('input[name="user_phone"]');

	const message = {
		loading: 'Loading...',
		success: 'Thank you! Waiting for callback soon.',
		fail: 'Something went wrong'
	}

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = message.loading;
		let result = await fetch(url, {
			method: "POST",
			body: data
		});

		return await result.text();
	};

	const clearInputs = () => {
		input.forEach(element => {
			element.value = '';
		});
	};

	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);

			const formData = new FormData(item);

			if(item.getAttribute('data-calc') == 'end') {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}

			postData('assets/server.php', formData)
				.then(result => {
					console.log(result);
					statusMessage.textContent = message.success;
				})
				.catch(() => statusMessage.textContent = message.fail)
				.finally(() => {
					clearInputs();

					for (let key in state) {
						if(key !== 'form' && key !== 'type' && key !== 'profile')
						delete state[key];
					}

					if (item.getAttribute('data-calc') === 'end') {
						setTimeout(() => {
							document.querySelector('.popup_calc_end').style.display = 'none';
							document.body.style.overflow = '';
						}, 3000);
					}

					setTimeout(() => {
						statusMessage.remove();
					}, 2000);
				});
		});
	});
};

export default forms;