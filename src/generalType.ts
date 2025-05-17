interface ComponentObjectType {
        name: string,
        lightIntensity: number,
        numOfLights: number,
        isLightOn: boolean,
        autoOn: string,
        autoOff: string,
        usage: number[],
        element?: HTMLElement
    }


interface WifiObject {
    id: number,
    wifiName: string,
    signal: string
}

export { ComponentObjectType, WifiObject }