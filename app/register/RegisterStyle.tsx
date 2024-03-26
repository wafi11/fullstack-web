"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Button from '../components/utils/button/Button'
import { useRouter } from 'next/navigation'


interface ModalProps {
    onSubmit : () => void
    title : string
    body : React.ReactElement
    footer : React.ReactElement
    actionLabel : string
    disabled? : boolean
    secondaryAction? : () => void
    secondaryActionLabel : string | undefined
}

const RegisterStyle : React.FC<ModalProps> = ({
    onSubmit,
    title,
    body,
    footer,
    actionLabel ,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {
    const router = useRouter()
    const handleSubmit = useCallback(() => {
        if(disabled){
            return
        }
        onSubmit()
        router.push('/login')
    },[onSubmit,disabled])


    
  return (
   <>
        <div className='justify-center items-center flex overflow-hidden overflow-y-auto inset-0 
            z-50 outline-none focus:outline-none '>
                <div className='relative w-full md:w-4/6 lg:w-3/6 xl:2/5 my-6 mx-auto h-screen 
                    lg:h-screen md:h-screen'>
                        {/* Content */}
                            <div 
                                className='translate h-auto lg:h-screen md:h-screen border-0 rounded-lg 
                                shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                                {/* HEADER */}
                                <div className='flex items-center p-6 rounded-t justify-center relative border-b-[1px]'>
                                    <div className='text-lg font-semibold text-green-500'>
                                        {title}
                                    </div>
                                </div>
                                {/* BODY */}
                                <div className='relative p-6 flex-auto'>{body}</div>
                                {/* FOOTER */}
                                <div className='flex flex-col gap-2 p-4'>
                                    <div className='flex flex-row items-center gap-4 w-full'>
                                                <Button 
                                                disabled={disabled} 
                                                label={actionLabel}
                                                onClick={handleSubmit} 
                                                />
                                    </div>
                                    {footer}
                                </div>
                            </div>
                        </div>
                </div>
   </>
  )
}

export default RegisterStyle