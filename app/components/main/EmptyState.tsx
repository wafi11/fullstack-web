"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import Heading from '../utils/heading/Heading'
import Button from '../utils/button/Button'

interface EmptyStateProps {
    title? : string,
    subTitle? : string,
    showReset? : boolean
    showRegister? : boolean
}

const EmptyState : React.FC<EmptyStateProps>= ({
    title ="No exact Matches",
    subTitle = "Try changing or removing some of your filters",
    showReset,
    showRegister
}) => {
    const router = useRouter()
  return (
    <div className='h-[400px] flex flex-col gap-2 justify-center items-center'>
        <Heading 
            title={title}
            subtitle={subTitle}
            center
        />
        <div className='w-48 mt-4'>
            {
                showReset && (
                    <Button outline  onClick={() => router.push('/')} label='Remove All Filters'/>
                )
            }
        </div>
        <div className='w-48 mt-4'>
            {
                showRegister && (
                    <Button outline  onClick={() => router.push('/register')} label='Register'/>
                )
            }
        </div>
    </div>
  )
}

export default EmptyState