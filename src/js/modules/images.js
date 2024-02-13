const images = () => {
	const imgPopup = document.createElement('div');
	const workSection = document.querySelector('.works');
	const bigImage = document.createElement('img');
	const scrollWidth = calculateScroll();

	imgPopup.classList.add('popup');
	workSection.appendChild(imgPopup);

	imgPopup.style.justifyContent = 'center';
	imgPopup.style.alignItems = 'center';
	imgPopup.style.display = 'none';

	imgPopup.appendChild(bigImage);

	workSection.addEventListener('click', (event) => {
		event.preventDefault();

		let target = event.target;

		if(target && target.classList.contains('preview')) {
			imgPopup.style.display = 'flex';
			const path = target.parentNode.getAttribute('href');
			bigImage.setAttribute('src', path);
			document.body.style.overflow = "hidden"
			document.body.style.marginRight = `${scrollWidth}px`;
		}

		if(target && target.matches('div.popup')) {
			imgPopup.style.display = 'none';
			document.body.style.overflow = "";
			document.body.style.marginRight = `0px`;
		}
	})

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
}

export default images;