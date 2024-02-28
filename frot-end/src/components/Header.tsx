"use client"

import { useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";
import { MdAccountCircle, MdOutlineAddPhotoAlternate, MdDriveFileRenameOutline } from "react-icons/md";
import "@/style/Header.css"

export const Header = () => {
    const router = useRouter()

    const openMenu = () => {
        console.log("Abrir modal")
    }

    return(
        <header className="border-b border-slate-300 flex justify-center items-center gap-12 py-4">
            <div onBlur={openMenu} className="menu_open rounded-full text-5xl text-slate-600 relative">
                <MdAccountCircle />
                <div className="w-36 h-20 bg-slate-300 hidden absolute z-10 right-[-3rem] top-11 rounded-sm text-base cursor-pointer p-2">
                    <p className="flex items-center h-5 gap-1">
                        Alterar foto
                        <MdOutlineAddPhotoAlternate />
                    </p>    
                    <p className="flex items-center h-5 gap-1">
                        Alterar nome
                        <MdDriveFileRenameOutline />
                    </p>
                </div>
            </div>
            <div className="cursor-pointer text-red-500 flex gap-1 items-center" onClick={() => router.push("/")}>
                <span>Sair</span>
                <IoLogOutOutline />
            </div>
        </header>
    )
}