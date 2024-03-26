"use client"
import React, { useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../components/types'
import Heading from '../components/utils/heading/Heading'
import ListingCategory from '../components/main/ListingCategory'
import ListingCard from '../components/main/ListingCard'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import Container from '../components/utils/Container'

interface ReservationsClientProps {
    reservations: SafeReservation[]
    currentUser? : SafeUser | null
}
const ReservationsClient : React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter()
    const [deleteId,setDeleteId] = useState('')

    const onCancel = useCallback((id : string) => {
        setDeleteId(id)

        axios.delete(`/api/reservations/${id}`)
        .then(() => [
            toast.success('Succes'),
            router.refresh()
        ])
        .catch((error) => {
            toast.error('Something went wrong')
            console.log(error)
        })
        .finally(() => {
            setDeleteId('')
        })
    },[router])
  return (
    <Container>
        <Heading 
            title='Reservations'
            subtitle='Booking on your properties'
        />
       <div className='
            mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                {reservations.map((reservations) => {
                    return (        
                        <ListingCard 
                            key={reservations.id}
                            data={reservations.Listing}
                            reservations={reservations}
                            actionId={reservations.id}
                            onAction={onCancel}
                            disabled={deleteId === reservations.id}
                            actionLabel='Cancel'
                            currentUser={currentUser}
                        />
                    )
                })}
        </div>
    </Container>
  )
}

export default ReservationsClient