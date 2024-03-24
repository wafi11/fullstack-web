import { Listing, Reservation } from '@prisma/client'
import React from 'react'
import { SafeUser } from '../types'

interface ListingCardProps {
    data : Listing
    reservations? : Reservation
    onAction : (id : string) => void
    disabled? : boolean
    actionLabel? :string
    actionId? : string
    currentUser : SafeUser | null
}

const ListingBox : React.FC <ListingCardProps>= ({
    data,
    reservations,
    actionId,
    onAction,
    actionLabel,
    currentUser
}) => {
  return (
    <div>ListingBox</div>
  )
}

export default ListingBox