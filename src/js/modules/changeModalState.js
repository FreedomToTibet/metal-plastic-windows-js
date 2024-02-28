import checkNumberInputs from "./checkNumberInputs";

const changeModalState = (state) => {
	const windowForm = document.querySelectorAll('.balcon_icons_img');
	const windowWidth = document.querySelectorAll('#width');
	const windowHeight = document.querySelectorAll('#height');
	const windowType = document.querySelectorAll('#view_type');
	const windowProfile = document.querySelectorAll('.checkbox');

	checkNumberInputs('#width');
	checkNumberInputs('#height');

	function bindActionToElements(event, element, property) {
		element.forEach((item, index) => {
			item.addEventListener(event, () => {
				switch(item.nodeName) {
					case "SPAN" : state[property] = index;
												break;
					case "INPUT" : if(item.getAttribute('type') === 'checkbox') {
													index === 0 ? state[property] = "Cold" : state[property] = "Warm";
													element.forEach((box, j) => {j == index ? box.checked = true : box.checked = false})
												} 
													else {state[property] = item.value};
													break;
					case "SELECT" : state[property] = item.value;
													break;
				}
				console.log(state);
			});
		});
	}

	bindActionToElements('click', windowForm, 'form');
	bindActionToElements('input', windowHeight, 'height');
	bindActionToElements('input', windowWidth, 'width');
	bindActionToElements('change', windowType, 'type');
	bindActionToElements('change', windowProfile, 'profile');
};

export default changeModalState;