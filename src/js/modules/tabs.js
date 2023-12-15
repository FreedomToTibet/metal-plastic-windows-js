const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = "block") => {
	const header = document.querySelector(headerSelector);
	const tab = document.querySelectorAll(tabSelector);
	const content = document.querySelectorAll(contentSelector);
	// const header = document.querySelector(headerSelector);

	function hideTabContent() {
		content.forEach(item => {item.style.display = "none";});

		tab.forEach(item => {
			item.classList.remove(activeClass);
		})
	}

	function showTabContent(index = 0) {
		content[index].style.display = display;
		tab[index].classList.add(activeClass);
	}

	hideTabContent();
	showTabContent();

	header.addEventListener('click', (e) => {
		const target = e.target;
		if(target && (target.classList.contains(tabSelector.replace(/\./, "")) || target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
			tab.forEach((item, index) => {
				if(target === item || target.parentNode === item) {hideTabContent(); showTabContent(index);}
			})
		}
	});
};

export default tabs;