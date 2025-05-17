"use strict";

import General from "./general.js";
import { ComponentObjectType } from "../src/generalType";

class Light extends General {
  constructor() {
    super();
  }

  notification(message: string) {
    return `
            <div class="notification">
                <div>
                    <img src="./assets/svgs/checked.svg" alt="checked svg icon on notifications" >
                </div>
                <p>${message}</p>
            </div>
        `;
  }

  displayNotification(
    message: string,
    position: InsertPosition,
    container: HTMLElement
  ) {
    const html = this.notification(message);
    this.renderHTML(html, position, container);
  }

  removeNotification(element: HTMLElement) {
    setTimeout(() => {
      element.remove();
    }, 5000);
  }

  lightSwitchOn(lightButtonElement: HTMLElement) {
    lightButtonElement.setAttribute("src", "./assets/svgs/light_bulb.svg");
    lightButtonElement.setAttribute(
      "data-lightOn",
      "./assets/svgs/light_bulb_off.svg"
    );
  }

  lightSwitchOff(lightButtonElement: HTMLElement) {
    lightButtonElement.setAttribute("src", "./assets/svgs/light_bulb_off.svg");
    lightButtonElement.setAttribute(
      "data-lightOn",
      "./assets/svgs/light_bulb.svg"
    );
  }

  lightComponentSelectors(lightButtonElement: HTMLElement): {
    room: string | null;
    componentData: ComponentObjectType | null;
    childElement: HTMLElement | null;
    background: HTMLElement | null;
  } {
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
    const childElement = lightButtonElement.firstElementChild as HTMLElement | null;
    const background = this.closestSelector(
      lightButtonElement,
      ".rooms",
      "img"
    );
    return { room, componentData, childElement, background };
  }

  toggleLightSwitch(lightButtonElement: HTMLElement) {
    const {
      componentData: component,
      childElement,
      background,
    } = this.lightComponentSelectors(lightButtonElement);
    const slider = this.closestSelector(
      lightButtonElement,
      ".rooms",
      "#light_intensity"
    ) as HTMLInputElement;

    if (!component) return;

    component.isLightOn = component.isLightOn;

    if (component.isLightOn) {
      this.lightSwitchOn(childElement as HTMLElement);
      component.lightIntensity = 5;
      const lightIntensity = component.lightIntensity / 10;
      this.handleLightIntensity(background as HTMLElement, lightIntensity);
      //the value has to be a string
      slider.value = component.lightIntensity.toString();
    } else {
      this.lightSwitchOff(childElement as HTMLElement);
      this.handleLightIntensity(background as HTMLElement, 0);
      slider.value = (0).toString();
    }
  }

  handleLightIntensitySlider(element: HTMLElement, intensity: number) {
    const { componentData: component } = this.lightComponentSelectors(element);
    //return when componentData is null
    if (!component) {
      console.error("Component data is null");
      return;
    }

    if (!component || typeof intensity !== "number" || Number.isNaN(intensity))
      return;

    component.lightIntensity = intensity;

    const lightSwitch = this.closestSelector(
      element,
      ".rooms",
      ".light-switch"
    );

    if (intensity === 0) {
      component.isLightOn = false;
      this.sliderLight(component.isLightOn, lightSwitch as HTMLElement);
      return;
    }
    //bug islightOn is supposed to be true when the slider is not 0
    component.isLightOn = true;
    this.sliderLight(component.isLightOn, lightSwitch as HTMLElement);
  }

  sliderLight(isLightOn: boolean, lightButtonElement: HTMLElement): void {
    const {
      componentData: component,
      childElement,
      background,
    } = this.lightComponentSelectors(lightButtonElement);

    if (!component) return;

    if (isLightOn) {
      this.lightSwitchOn(childElement as HTMLElement);
      const lightIntensity = component.lightIntensity / 10;
      this.handleLightIntensity(background as HTMLElement, lightIntensity);
    } else {
      this.lightSwitchOff(childElement as HTMLElement);
      this.handleLightIntensity(background as HTMLElement, 0);
    }
  }
}

export default Light;
