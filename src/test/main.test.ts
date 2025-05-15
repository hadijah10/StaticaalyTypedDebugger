// @jest-environment jsdom
import "@testing-library/jest-dom";
import Light from "../basicSettings";
import AdvanceSettings from "../advancedSettings";

// Mock DOM elements
function setupDOM() {
	document.body.innerHTML = `
    <button class="entry_point"></button>
    <main></main>
    <div class="application_container"></div>
    <div class="advanced_features_container"></div>
    <nav></nav>
    <div class="loader-container"></div>
  `;
}

describe("Event handler for main.ts", () => {
	let lightController: Light;
	let advancedSettings: AdvanceSettings;

	beforeEach(() => {
		setupDOM();
		lightController = new Light();
		advancedSettings = new AdvanceSettings();
	});

	test("hide homepage and show loader on homepagebutton click", () => {
		const homepageButton = document.querySelector(".entry_point")!;
		const homepage = document.querySelector("main")!;
		const loader = document.querySelector(".loader-container")!;

		homepage.classList.remove("hidden");
		loader.classList.add("hidden");

		homepageButton.dispatchEvent(new Event("click"));

		expect(homepage.classList.contains("hidden")).toBe(false);
		expect(loader.classList.contains("hidden")).toBe(true);
	});

	test("toggle light switch when mainroomscontainer is clicked", () => {
		const mainRoomsContainer = document.querySelector(
			".application_container"
		)!;
		const lightSwitch = document.createElement("div");
		lightSwitch.className = "light-switch basic_settings_buttons";
		mainRoomsContainer.appendChild(lightSwitch);
		jest.spyOn(lightController, "toggleLightSwitch");

		mainRoomsContainer.dispatchEvent(new Event("click", { bubbles: true }));
	});
});