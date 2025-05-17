'use strict';
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AdvanceSettings_instances, _AdvanceSettings_markup, _AdvanceSettings_analyticsUsage;
import Light from './basicSettings.js';
class AdvanceSettings extends Light {
    constructor() {
        super();
        _AdvanceSettings_instances.add(this);
    }
    modalPopUp(element) {
        const selectedRoom = this.getSelectedComponentName(element);
        //check the selected roo is null and return 
        if (!selectedRoom)
            return;
        const componentData = this.getComponent(selectedRoom);
        if (!componentData)
            return;
        const parentElement = this.selector('.advanced_features_container');
        if (!parentElement)
            return;
        this.removeHidden(parentElement);
        // display modal view
        this.renderHTML(__classPrivateFieldGet(this, _AdvanceSettings_instances, "m", _AdvanceSettings_markup).call(this, componentData), 'afterbegin', parentElement);
        // graph display
        __classPrivateFieldGet(this, _AdvanceSettings_instances, "m", _AdvanceSettings_analyticsUsage).call(this, componentData['usage']);
    }
    displayCustomization(selectedElement) {
        const element = this.closestSelector(selectedElement, '.customization', '.customization-details');
        if (!element)
            return;
        this.toggleHidden(element);
    }
    closeModalPopUp() {
        const parentElement = this.selector('.advanced_features_container');
        const childElement = this.selector('.advanced_features');
        // remove child element from the DOM
        childElement?.remove();
        // hide parent element
        this.addHidden(parentElement);
    }
    customizationCancelled(selectedElement, parentSelectorIdentifier) {
        const element = this.closestSelector(selectedElement, parentSelectorIdentifier, 'input');
        if (element) {
            element.value = '';
            return;
        }
    }
    customizeAutomaticOnPreset(selectedElement) {
        console.log("i was clicked");
        const element = this.closestSelector(selectedElement, '.defaultOn', 'input');
        if (!element)
            return;
        const { value } = element;
        console.log(value);
        // when value is falsy
        if (!value)
            return;
        const component = this.getComponentData(element, '.advanced_features', '.component_name');
        console.log(component);
        if (!component)
            return;
        component.autoOn = value;
        element.value = '';
        // selecting display or markup view
        const spanElement = this.selector('.auto_on > span:last-child');
        console.log(spanElement);
        this.updateMarkupValue(spanElement, component.autoOn);
        // update room data with element
        this.setComponentElement(component);
        // handle light on automation
        this.automateLight(component['autoOn'], component);
    }
    customizeAutomaticOffPreset(selectedElement) {
        const element = this.closestSelector(selectedElement, '.defaultOff', 'input');
        if (!element)
            return;
        const { value } = element;
        // when value is falsy
        if (!value)
            return;
        const component = this.getComponentData(element, '.advanced_features', '.component_name');
        if (!component)
            return;
        component.autoOff = value;
        element.value = '';
        // selecting display or markup view
        const spanElement = this.selector('.auto_off > span:last-child');
        this.updateMarkupValue(spanElement, component.autoOff);
        // update room data with element
        this.setComponentElement(component);
        // handle light on automation
        this.automateLight(component['autoOff'], component);
    }
    getSelectedComponent(componentName) {
        if (!componentName) {
            const firstKey = Object.keys(this.componentsData)[0];
            return firstKey ? this.componentsData[firstKey] : null;
        }
        const component = this.componentsData[componentName.toLowerCase()];
        return component;
    }
    getSelectedSettings(componentName) {
        //added .# to select the markup
        const component = this.getSelectedComponent(componentName);
        if (!component)
            return null;
        return __classPrivateFieldGet(this, _AdvanceSettings_instances, "m", _AdvanceSettings_markup).call(this, component);
    }
    setNewData(component, key, data) {
        const selectedComponent = this.componentsData[component.toLowerCase()];
        return selectedComponent[key] = data;
    }
    capFirstLetter(word) {
        if (!word)
            return word;
        return word[0].toUpperCase();
    }
    getObjectDetails() {
        return this;
    }
    formatTime(time) {
        const [hour, min] = time.split(':');
        const dailyAlarmTime = new Date();
        dailyAlarmTime.setHours(parseInt(hour));
        dailyAlarmTime.setMinutes(parseInt(min));
        dailyAlarmTime.setSeconds(0);
        return dailyAlarmTime;
    }
    ;
    timeDifference(selectedTime) {
        const now = new Date();
        //bug fixed here .getTime function was added to 
        const setTime = this.formatTime(selectedTime).getTime() - now.getTime();
        // console.log(setTime, now);
        return setTime;
    }
    async timer(time, component) {
        return new Promise((resolve, reject) => {
            const checkAndTriggerAlarm = () => {
                const now = new Date();
                if (now.getHours() === time.getHours() &&
                    now.getMinutes() === time.getMinutes() &&
                    now.getSeconds() === time.getSeconds()) {
                    //bug here. The 
                    const element = component.element;
                    if (!element) {
                        reject(new Error(`Component's element not found`));
                        return;
                    }
                    resolve(this.toggleLightSwitch(element));
                    // stop timer
                    clearInterval(intervalId);
                }
            };
            // Check every second
            const intervalId = setInterval(checkAndTriggerAlarm, 1000);
        });
    }
    async automateLight(time, component) {
        const formattedTime = this.formatTime(time);
        return await this.timer(formattedTime, component);
    }
}
_AdvanceSettings_instances = new WeakSet(), _AdvanceSettings_markup = function _AdvanceSettings_markup(component) {
    const { name, numOfLights, autoOn, autoOff } = component;
    return `
        <div class="advanced_features">
            <h3>Advanced features</h3>
            <section class="component_summary">
                <div>
                    <p class="component_name">${this.capFirstLetter(name)}</p>
                    <p class="number_of_lights">${numOfLights}</p>
                </div>
                <div>

                    <p class="auto_on">
                        <span>Automatic turn on:</span>
                        <span>${autoOn}</span>
                    </p>
                    <p class="auto_off">
                        <span>Automatic turn off:</span>
                        <span>${autoOff}</span>
                    </p>
                </div>
            </section>
            <section class="customization">
                <div class="edit">
                    <p>Customize</p>
                    <button class="customization-btn">
                        <img src="./assets/svgs/edit.svg" alt="customize settings svg icon">
                    </button>
                </div>
                <section class="customization-details hidden">
                    <div>
                        <h4>Automatic on/off settings</h4>
                        <div class="defaultOn">
                            <label for="">Turn on</label>
                            <input type="time" name="autoOnTime" id="autoOnTime">
                            <div>
                                <button class="defaultOn-okay">Okay</button>
                                <button class="defaultOn-cancel">Cancel</button>
                            </div>
                        </div>
                        <div class="defaultOff">
                            <label for="">Go off</label>
                            <input type="time" name="autoOffTime" id="autoOffTime">
                            <div>
                                <button class="defaultOff-okay">Okay</button>
                                <button class="defaultOff-cancel">Cancel</button>
                            </div>
                        </div>

                    </div>
                </section>
                <section class="summary">
                    <h3>Summary</h3>
                    <div class="chart-container">
                        <canvas id="myChart"></canvas>
                    </div>
                </section>
                <button class="close-btn">
                    <img src="./assets/svgs/close.svg" alt="close button svg icon">
                </button>
            </section>
            <button class="close-btn">
                <img src="./assets/svgs/close.svg" alt="close button svg icon">
            </button>
        </div>
        `;
}, _AdvanceSettings_analyticsUsage = function _AdvanceSettings_analyticsUsage(data) {
    const ctx = this.selector('#myChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
            datasets: [{
                    label: 'Hours of usage',
                    data: data,
                    borderWidth: 1
                }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};
export default AdvanceSettings;
