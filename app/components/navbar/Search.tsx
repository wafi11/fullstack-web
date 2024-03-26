"use client"
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import useSearchModal from '../hooks/useSearchModals'
import { SafeUser } from '../types'

interface SearchProps {
  currentUser? : SafeUser | null
}

const Search : React.FC<SearchProps> = ({
  currentUser
}) => {
    const searchModal = useSearchModal()
    if(!currentUser){
      return null
    }
  return (
    <div 
        onClick={searchModal.onOpen}
        className='justify-center border-[1px] w-full md:w-[40%] py-2 
        rounded-full shadow-sm hover:shadow-md transition cursor-pointer '>
            <div className='flex flex-row justify-between items-center px-5'>
                    <div className="font-light text-sm sm:text-md">Search your destination....</div>
                    <div className='p-2 bg-green-500 text-white rounded-full'>
                        <BiSearch size={18}/>
                    </div>
            </div>
    </div>
  )
}

export default Search