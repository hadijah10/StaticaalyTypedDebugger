import General from "../general";

describe("functions on general class", () => {
	let general: General;

	beforeEach(() => {
		general = new General();
	});

	test("verify the object", () => {
		expect(general).toBeInstanceOf(General);
	});

	test("check the name of a component", () => {
		const component = general.getComponent("bedroom");
		expect(component).toBeDefined();
		expect(component?.name).toBe("bedroom");
	});


	test("updateing the value of markup", () => {
		const text = document.createElement("span");
		general.updateMarkupValue(text, "biy");
		expect(text.textContent).toBe("biy");
	});

	test('add,remove and togle hidden class', () => {
		const targetElement = document.createElement("span");
		general.addHidden(targetElement);
		expect(targetElement.classList.contains("hidden")).toBe(true);
		general.removeHidden(targetElement);
		expect(targetElement.classList.contains("hidden")).toBe(false);
		general.toggleHidden(targetElement);
		expect(targetElement.classList.contains("hidden")).toBe(true);
	});
});