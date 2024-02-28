"use client"

import { convertDateBrazil } from "@/utils/dateBrazil"
import { getCookie, getCookies } from "cookies-next"
import { useEffect, useState } from "react"
import { FaLess } from "react-icons/fa"

export const PointCollaborator = () => {
    const hoursLocal = localStorage.getItem('hours') 
    const hoursInitial = hoursLocal && JSON.parse(hoursLocal)
    
    const [startPoint, setStartPoint] = useState(false)
    const [endPoint, setEndPoint] = useState(true)
    const [lunch, setLunch] = useState(false)

    const [prohibitedHour, setProhibitedHour] = useState<string>('')
    const [lunchTimeStart, setLunchTimeStart] = useState<string>('')
    const [lunchTimeEnd, setLunchTimeEnd] = useState<string>('')
    const [workEnd, setWorkEnd] = useState<string>('')

    const [hours, setHours] = useState<string | number>(hoursInitial ? hoursInitial.slice(0, 2) : "00")
    const [minutes, setMinutes] = useState<string | number>(hoursInitial ? hoursInitial.slice(3, 5) : "00")
    const [seconds, setSeconds] = useState<string | number>(hoursInitial ? hoursInitial.slice(7, 9) : "00")
    
    const date = new Date()
    const hour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    useEffect(() => {
        if(startPoint) {
            setTimeout(() => {
                localStorage.setItem('hours', JSON.stringify(`${Number(hours) >= 10 ? hours : hours}:${Number(minutes) >= 10 ? minutes : `0${minutes}`}:${Number(seconds) >= 10 ? seconds : `0${seconds}`}`))
                setSeconds(Number(seconds) + 1)

                if(Number(seconds) === 60) {
                    setMinutes(Number(minutes) + 1)
                    setSeconds(0)
                }

                if(minutes === 60) {
                    setHours(Number(hours) + 1)
                    setMinutes(0)
                }
            }, 1000)

            return
        } else {
            setTimeout(() => {
                // setSeconds(Number(seconds) + 1)
                if(Number(seconds) === 60) {
                    setMinutes(Number(minutes) + 1)
                    setSeconds(0)
                }
            }, 1000)
        }
    }, [Number(seconds)])

    const start = () => {  
        if(!startPoint && !hoursInitial) {
            setProhibitedHour(hour)
            setSeconds(1)
            setSeconds(0)
            setStartPoint(true)   
            setLunch(true)
        }else {
            setSeconds(Number(seconds) + 1)
            // setSeconds(Number(seconds) - 1)
        }
    }

    const end = () => {
        setStartPoint(false)
        setWorkEnd(hour)
    }
    
    const startLunch = () => {        
        if(lunchTimeStart) {
            setLunchTimeEnd(hour)
            return setLunch(false)
        }
        
        setLunchTimeStart(hour)
    }
    
    return(
        <section className="min-h-screen py-4">
            <h3 className="bg-slate-500 text-white p-4 rounded-full w-24 m-auto text-center">{Number(hours) < 10 ? `0${Number(hours)}` : hours}:{Number(minutes) < 10 ? `0${Number(minutes)}` : minutes}:{Number(seconds) < 10 ? `0${Number(seconds)}` : seconds}</h3>
            <div className="flex justify-center items-center mt-8">
                { startPoint ? 
                    <button onClick={() => end()} className="flex w-6/12 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Encerrar ponto
                    </button>
                : 
                    <button onClick={() => start()} className="flex w-6/12 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        { hoursInitial ? "Retorna ponto" : "Bater ponto" }               
                    </button>
                }                  
            </div> 
            <div className="flex items-center justify-center py-12">
                {
                    startPoint && lunch &&
                    <button onClick={() => startLunch()} className="w-6/12 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        { lunch && !lunchTimeStart && "Almoçar" }
                        { !lunch || lunchTimeStart && "Encerrar almoço" }
                    </button>
                }
            </div>
            <div className="w-full flex flex-col gap-2">
                <div className="flex w-full justify-between">
                    <p className="px-1 w-20 text-center">
                        Entrada
                    </p>
                    <p className="px-1 w-20 text-center">
                        E. Almoço
                    </p>
                    <p className="px-1 w-20 text-center">
                        S. Almoço
                    </p>
                    <p className="px-1 w-20 text-center">
                        Saida
                    </p>
                </div>
                <div className="flex w-full justify-between">
                    <p className="px-1 w-20 text-center">
                        {prohibitedHour ? prohibitedHour : "00:00:00"}
                    </p>
                    <p className="px-1 w-20 text-center">
                        {lunchTimeStart ? lunchTimeStart : "00:00:00"}
                    </p>
                    <p className="px-1 w-20 text-center">
                        {lunchTimeEnd ? lunchTimeEnd : "00:00:00"}
                    </p>
                    <p className="px-1 w-20 text-center">
                        {workEnd ? workEnd : "00:00:00"}
                    </p>
                </div>
            </div>
        </section>
    )
}