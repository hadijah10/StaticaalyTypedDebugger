interface ComponentObjectType{
    name:string,
    lightIntensity:number,
    numOfLights:number,
    isLightOn:boolean,
    autoOn:string,
    autoOff:string,
    usage:number[],
    element?: HTMLElement | Element | null;
    [key:string]:string | number | boolean |string[] | number[] | HTMLElement | Element | null | undefined;
}

interface TComponentsDataType{
    [prop: string] : ComponentObjectType
}
interface WifiObject{
    id:number,
    wifiName:string,
    signal:string
}

export {ComponentObjectType, TComponentsDataType,WifiObject}