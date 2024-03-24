"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import Heading from '../utils/heading/Heading'
import Button from '../utils/button/Button'

interface EmptyStateProps {
    title? : '',
    subTitle? : "",
    showReset? : boolean
}

const EmptyState : React.FC<EmptyStateProps>= ({
    title ="No exact Matches",
    subTitle = "Try changing or removing some of your filters",
    showReset
}) => {
    const router = useRouter()
  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
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
    </div>
  )
}

export default EmptyState