import checkNumberInputs from './checkNumberInputs';

const forms = (state) => {
  const form = document.querySelectorAll('form');
  const input = document.querySelectorAll('input');

  checkNumberInputs('input[name="user_phone"]');

  const message = {
    loading: 'Loading...',
    success: 'Thank you! Waiting for callback soon.',
    fail: 'Something went wrong',
  };


// do this way if we create and send formData with php-script help
  // const postData = async (url, data) => {
  //   document.querySelector('.status').textContent = message.loading;
  //   let result = await fetch(url, {
  //     method: 'POST',
  //     body: data,
  //   });

  //   return await result.text();
  // };

	const postData = async (url, data) => {
		const result = await fetch(url, {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});
	
		return await result.json();
	};

  const clearInputs = () => {
    input.forEach((element) => {
      element.value = '';
    });
  };

  form.forEach((item) => {
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

			const formJson = JSON.stringify(Object.fromEntries(formData.entries()));

			console.log('formJson', formJson);

			postData('https://65eeb08f08706c584d9bf69f.mockapi.io/api/requests', formJson)
        .then((result) => {
          console.log(result);
          statusMessage.textContent = message.success;
        })
        .catch(() => (statusMessage.textContent = message.fail))
        .finally(() => {
          clearInputs();
					item.reset();

          for (let key in state) {
            if (key !== 'form' && key !== 'type' && key !== 'profile') delete state[key];
          }

          if (item.getAttribute('data-calc') === 'end') {
            setTimeout(() => {
              document.querySelector('.popup_calc_end').style.display = 'none';
              document.body.style.overflow = '';
            }, 3000);
          }

					if (item.getAttribute('data-form') === 'engineer') {
            setTimeout(() => {
              document.querySelector('.popup_engineer').style.display = 'none';
              document.body.style.overflow = '';
            }, 3000);
          }

					if (item.getAttribute('data-form') === 'popup') {
            setTimeout(() => {
              document.querySelector('#popup').style.display = 'none';
              document.body.style.overflow = '';
            }, 3000);
          }

          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        });

// do this way if we create and send formData with php-script help
      // if(item.getAttribute('data-calc') == 'end') {
      // 	for (let key in state) {
      // 		formData.append(key, state[key]);
      // 	}
      // }
			
// do this way if we create and send formData with php-script help
    //   postData('assets/server.php', formData)
    //     .then((result) => {
    //       console.log(result);
    //       statusMessage.textContent = message.success;
    //     })
    //     .catch(() => (statusMessage.textContent = message.fail))
    //     .finally(() => {
    //       clearInputs();

    //       for (let key in state) {
    //         if (key !== 'form' && key !== 'type' && key !== 'profile') delete state[key];
    //       }

    //       if (item.getAttribute('data-calc') === 'end') {
    //         setTimeout(() => {
    //           document.querySelector('.popup_calc_end').style.display = 'none';
    //           document.body.style.overflow = '';
    //         }, 3000);
    //       }

    //       setTimeout(() => {
    //         statusMessage.remove();
    //       }, 2000);
    //     });
    });
  });
};

export default forms;
