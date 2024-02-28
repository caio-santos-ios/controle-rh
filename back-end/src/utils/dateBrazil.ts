export const convertDateBrazil = (): Date => {
    const date = new Date()
    let newDate = date.toLocaleString("pt-Br")
    newDate = `${newDate.slice(6, 10)}-${newDate.slice(3, 5)}-${newDate.slice(0, 2)}T${newDate.slice(12, 14)}:${newDate.slice(15, 17)}:${newDate.slice(18, 20)}.000Z`
    
    const dateConverted = new Date(newDate)

    return dateConverted
}