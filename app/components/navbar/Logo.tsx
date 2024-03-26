"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter()
    return (
        <div 
            onClick={() => router.push('/')}
            className="text-3xl sm:text-3xl md:text-4xl font-bold text-green-500 uppercase">
            NexTrips
        </div>  
    )
}

export default Logo