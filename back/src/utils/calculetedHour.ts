import { convertDateBrazil } from "./dateBrazil"

export const calculetedHour = (hour: any): any => {

    const date: any = convertDateBrazil()
        
    let stopLunch = date - hour 
    stopLunch /= (1000 * 60 * 60) 
    
    return Math.floor(stopLunch)
}