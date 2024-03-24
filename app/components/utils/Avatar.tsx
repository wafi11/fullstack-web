"use client"
import { CursusUser } from 'next-auth/providers/42-school'
import Image from 'next/image'
import React from 'react'

interface AvatarProps {
  src? : string | null
}

const Avatar : React.FC<AvatarProps> = ({
  src
}) => {
  return (
    <Image src={ src || '/images/placeholder.jpg'} alt='.' height={30} width={30} className='rounded-full'/>
  )
}

export default Avatar