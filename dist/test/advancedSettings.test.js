import AdvanceSettings from "../advancedSettings";
describe("test for advancedsettings class functions", () => {
    let advancedSettings;
    beforeEach(() => {
        advancedSettings = new AdvanceSettings();
    });
    test("check type of advancedSettings object", () => {
        expect(advancedSettings).toBeInstanceOf(AdvanceSettings);
    });
    test("Capitalize first letter", () => {
        expect(advancedSettings.capFirstLetter("best")).toBe("B");
    });
    test("format a string to a Date", () => {
        const date = advancedSettings.formatTime("15:30");
        expect(date).toBeInstanceOf(Date);
        expect(date.getHours()).toBe(15);
        expect(date.getMinutes()).toBe(30);
    });
    test("calculating the time difference from now", () => {
        const now = new Date();
        const futureTime = `${now.getHours().toString().padStart(2, "0")}:${(now.getMinutes() + 1)
            .toString()
            .padStart(2, "0")}`;
        const diff = advancedSettings.timeDifference(futureTime);
        expect(diff).toBeGreaterThan(0);
    });
});
