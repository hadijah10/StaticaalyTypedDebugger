"use strict";
import General from "./general.js";
class Light extends General {
    constructor() {
        super();
    }
    notification(message) {
        return `
            <div class="notification">
                <div>
                    <img src="./assets/svgs/checked.svg" alt="checked svg icon on notifications" >
                </div>
                <p>${message}</p>
            </div>
        `;
    }
    displayNotification(message, position, container) {
        const html = this.notification(message);
        this.renderHTML(html, position, container);
    }
    removeNotification(element) {
        setTimeout(() => {
            element.remove();
        }, 5000);
    }
    lightSwitchOn(lightButtonElement) {
        lightButtonElement.setAttribute("src", "./assets/svgs/light_bulb.svg");
        lightButtonElement.setAttribute("data-lightOn", "./assets/svgs/light_bulb_off.svg");
    }
    lightSwitchOff(lightButtonElement) {
        lightButtonElement.setAttribute("src", "./assets/svgs/light_bulb_off.svg");
        lightButtonElement.setAttribute("data-lightOn", "./assets/svgs/light_bulb.svg");
    }
    lightComponentSelectors(lightButtonElement) {
        //get the room name from the light button element
        const room = this.getSelectedComponentName(lightButtonElement);
        if (!room)
            return {
                room: null,
                componentData: null,
                childElement: null,
                background: null,
            };
        //this.getComponent room[0] changed
        const componentData = this.getComponent(room);
        const childElement = lightButtonElement.firstElementChild;
        const background = this.closestSelector(lightButtonElement, ".rooms", "img");
        return { room, componentData, childElement, background };
    }
    toggleLightSwitch(lightButtonElement) {
        const { componentData: component, childElement, background, } = this.lightComponentSelectors(lightButtonElement);
        const slider = this.closestSelector(lightButtonElement, ".rooms", "#light_intensity");
        if (!component)
            return;
        component.isLightOn = component.isLightOn;
        if (component.isLightOn) {
            this.lightSwitchOn(childElement);
            component.lightIntensity = 5;
            const lightIntensity = component.lightIntensity / 10;
            this.handleLightIntensity(background, lightIntensity);
            //the value has to be a string
            slider.value = component.lightIntensity.toString();
        }
        else {
            this.lightSwitchOff(childElement);
            this.handleLightIntensity(background, 0);
            slider.value = (0).toString();
        }
    }
    handleLightIntensitySlider(element, intensity) {
        const { componentData: component } = this.lightComponentSelectors(element);
        //return when componentData is null
        if (!component) {
            console.error("Component data is null");
            return;
        }
        if (!component || typeof intensity !== "number" || Number.isNaN(intensity))
            return;
        component.lightIntensity = intensity;
        const lightSwitch = this.closestSelector(element, ".rooms", ".light-switch");
        if (intensity === 0) {
            component.isLightOn = false;
            this.sliderLight(component.isLightOn, lightSwitch);
            return;
        }
        //bug islightOn is supposed to be true when the slider is not 0
        component.isLightOn = true;
        this.sliderLight(component.isLightOn, lightSwitch);
    }
    sliderLight(isLightOn, lightButtonElement) {
        const { componentData: component, childElement, background, } = this.lightComponentSelectors(lightButtonElement);
        if (!component)
            return;
        if (isLightOn) {
            this.lightSwitchOn(childElement);
            const lightIntensity = component.lightIntensity / 10;
            this.handleLightIntensity(background, lightIntensity);
        }
        else {
            this.lightSwitchOff(childElement);
            this.handleLightIntensity(background, 0);
        }
    }
}
export default Light;
