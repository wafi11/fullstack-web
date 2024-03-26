"use client"
import React from 'react'
import { SafeUser } from '../types'
import useContries from '../modal/rent/useCountries'
import Heading from '../utils/heading/Heading'
import Image from 'next/image'
import Heart from '../utils/button/Heart'

interface ListingHeadProps {
    id : string
    imageSrc : string
    locationValue : string
    title : string
    currentUser? : SafeUser | null
}

const ListingHead : React.FC<ListingHeadProps> = ({
    id,
    imageSrc,
    locationValue,
    title,
    currentUser
}) => {
  const {getByValue} = useContries()
  const location = getByValue(locationValue)
  return (
   <>
      <Heading 
        title={title}
        subtitle={`${location?.region},${location?.label}`}
      />
      <div className='w-full h-[60vh] rounded-xl overflow-hidden relative'>
          <Image 
            alt='../'
            src={imageSrc}
            fill
            className='object-cover w-full'
          />
        <div className='absolute right-5 top-5'>
          <Heart listingId={id} currentUser={currentUser} />
        </div>
      </div>
   </>
  )
}

export default ListingHead