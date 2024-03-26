"use client"
import { Listing, Reservation } from '@prisma/client'
import React, { useCallback, useMemo } from 'react'
import { SafeUser, SafeListing, SafeReservation } from '../types'
import { useRouter } from 'next/navigation'
import useContries from '../modal/rent/useCountries'
import { format } from 'date-fns'
import Image from 'next/image'
import Heart from '../utils/button/Heart'
import Button from '../utils/button/Button'

interface ListingCardProps {
    data : SafeListing
    reservations : SafeReservation
    onAction? : (id : string) => void
    disabled? : boolean
    actionLabel? :string
    actionId? : string
    currentUser? : SafeUser | null
}

const ListingCard : React.FC <ListingCardProps>= ({
    data,
    reservations,
    onAction,
    disabled,
    actionLabel,
    currentUser,
    actionId = '',
}) => {
  const router = useRouter()
  const {getByValue} = useContries()
  const location = getByValue(data.locationValue)

  const handleCancel = useCallback((
    e : React.MouseEvent<HTMLButtonElement>
    ) => {
      e.stopPropagation()
    if(disabled){
      return 
    }
    onAction?.(actionId)
  },[onAction,actionId,disabled])

  const price = useMemo(() => {
    if(reservations){
      return reservations.totalPrice
    }
    return data.price
  },[reservations,data.price])

  const reservationsDate = useMemo(() => {
    if(!reservations){
      return null
    }

    const start = new Date(reservations.startDate)
    const end = new Date(reservations.endDate)

    return `${format(start,'PP')} - ${format(end,'PP')}`
  },[reservations])
  return (
    <div 
      onClick={() => router.push(`/listings/${data.id}`)}
      className='col-span-1 cursor-pointer group'
    >
        <div className='flex flex-col w-full gap-2'>
          <div className='aspect-square w-full rounded-xl relative overflow-hidden '>
              <Image 
                src={data.imageSrc} 
                alt='Listing'
                fill
                className='object-cover w-full h-full group-hover:scale-110 transition'
              />
              <div className='absolute top-3 right-3'>
                <Heart currentUser={currentUser} listingId={data.id}/>
              </div> 
          </div>
          <div className='font-semibold text-lg'>
            {location?.region}, {location?.label}
          </div>
          <div className='font-light text-neutral-500'>
            {reservationsDate || data.category }
          </div>
          <div className='flex flex-row items-center gap-1'>
            <div className='font-semibold'>
              $ {price}
            </div>
            {!reservations && (
              <div className=''>/ night </div>
            )}
          </div>
          {
            onAction && actionLabel  && (
              <Button
                disabled={disabled}
                small
                label={actionLabel}
                onClick={handleCancel}
              />
            )
          }
        </div>
    </div>
  )
}

export default ListingCard