'use script';
// elements declarations
const homepageButton = document.querySelector('.entry_point');
const homepage = document.querySelector('main');
const mainRoomsContainer = document.querySelector('.application_container');
const advanceFeaturesContainer = document.querySelector('.advanced_features_container');
const nav = document.querySelector('nav');
const loader = document.querySelector('.loader-container');
// imports
import Light from './basicSettings.js';
import AdvanceSettings from './advancedSettings.js';
// object creation
const lightController = new Light();
const advancedSettings = new AdvanceSettings();
// global variables
let selectedComponent = null;
let isWifiActive = true;
// Event handlers
// hide homepage after button is clicked
homepageButton?.addEventListener('click', function (e) {
    lightController.addHidden(homepage);
    lightController.removeHidden(loader);
    setTimeout(() => {
        lightController.removeHidden(mainRoomsContainer);
        lightController.removeHidden(nav);
    }, 1000);
});
mainRoomsContainer?.addEventListener('click', (e) => {
    const selectedElement = e.target;
    // when click occurs on light switch
    if (selectedElement?.closest(".light-switch")) {
        const lightSwitch = selectedElement.closest(".basic_settings_buttons")?.firstElementChild;
        if (!lightSwitch)
            return;
        lightController.toggleLightSwitch(lightSwitch);
        return;
    }
    // when click occurs on advance modal
    if (selectedElement.closest('.advance-settings_modal')) {
        const advancedSettingsBtn = selectedElement.closest('.advance-settings_modal');
        advancedSettings.modalPopUp(advancedSettingsBtn);
    }
});
mainRoomsContainer?.addEventListener('change', (e) => {
    const slider = e.target;
    if (!slider || !slider.value) {
        console.log('Invalid slider value');
        return;
    }
    const value = parseInt(slider.value);
    // const value = +slider.value;
    if (isNaN(value)) {
        return;
    }
    lightController.handleLightIntensitySlider(slider, value);
});
// advance settings modal
advanceFeaturesContainer?.addEventListener('click', (e) => {
    console.log(e.target);
    const selectedElement = e.target;
    if (selectedElement.closest('.close-btn')) {
        advancedSettings.closeModalPopUp();
    }
    // display customization markup
    if (selectedElement.closest('.customization-btn')) {
        advancedSettings.displayCustomization(selectedElement);
    }
    // set light on time customization
    if (selectedElement.matches('.defaultOn-okay')) {
        advancedSettings.customizeAutomaticOnPreset(selectedElement);
    }
    // set light off time customization
    if (selectedElement.matches('.defaultOff-okay')) {
        advancedSettings.customizeAutomaticOffPreset(selectedElement);
    }
    // cancel light time customization
    if (selectedElement.textContent?.includes("Cancel")) {
        if (selectedElement.matches('.defaultOn-cancel')) {
            advancedSettings.customizationCancelled(selectedElement, '.defaultOn');
        }
        else if (selectedElement.matches('.defaultOff-cancel')) {
            advancedSettings.customizationCancelled(selectedElement, '.defaultOff');
        }
    }
});
