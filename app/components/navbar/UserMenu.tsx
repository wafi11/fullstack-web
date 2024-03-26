"use client"
import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../utils/Avatar"
import React, { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import { log } from "console"
import { useRegisterModal } from "../hooks/UserRegister"
import useLoginModal from "../hooks/UserLogin"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import { SafeUser } from "../types"
import useRentModals from "../hooks/RentModals"
import { useRouter } from "next/navigation"

interface NavbarProps {
    currentUser? : SafeUser | null
}

const UserMenu : React.FC<NavbarProps>  = ({
    currentUser
}) => {
    const RegisterModal = useRegisterModal()
    const LoginModal = useLoginModal()
    const RentModals = useRentModals()
    const [nav,setNav] = useState(false)
    const router = useRouter()
    
    const handleLogOut = () => {
        signOut()
        router.push('/login')
    }
    const handleOpen = useCallback(() => {
        setNav((value) => !value)
    },[])

    const openRentModals = useCallback(() => {
        if(!currentUser){
           return LoginModal.onOpen()
        }
        return RentModals.onOpen()

    },[LoginModal,currentUser])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                onClick={openRentModals}
                className="hideen md:block text-sm font-semibold py-3 px-4 hover:bg-neutral-100 
                transition cursor-pointer">
                    AirBnb your Home
                </div>
                <div
                onClick={handleOpen}
                className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center
                gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image } />
                    </div>
                </div>
            </div>
            {
                nav && (
                    <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden 
                        right-0 top-12 text-sm">
                            <div className="flex flex-col cursor-pointer">
                            {
                               currentUser  ? (
                                <>
                                    <MenuItem onClick={() => router.push('/trips')} label="My Trips" />
                                    <MenuItem onClick={() => router.push('/favorites')} label="My Favorites" />
                                    <MenuItem onClick={() => router.push('/reservations')} label="My Reservations" />
                                    <MenuItem onClick={() => {}} label="My Properties" />
                                    <MenuItem onClick={handleLogOut} label="Logout" />
                                </>
                               ) : (
                                <>
                                    <MenuItem onClick={() => router.push('/login')} label="Login" />
                                    <MenuItem onClick={() => router.push('register')} label="SignUp" />
                                </>
                               )
                            }
                            </div>
                    </div>
                )
            }
        </div>
    )
}

export default UserMenu