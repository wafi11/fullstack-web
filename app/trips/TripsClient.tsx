"use client"
import React, { useCallback, useState } from 'react'
import {  SafeReservation, SafeUser } from '../components/types'
import Heading from '../components/utils/heading/Heading'
import Container from '../components/utils/Container'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingCard from '../components/main/ListingCard'

interface TripsClientProps {
    reservations: SafeReservation[]
    currentUser? : SafeUser | null
}

const TripsClient : React.FC<TripsClientProps> = ({
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
            toast.error(error?.response?.data?.error)
            console.log(error)
        })
        .finally(() => {
            setDeleteId('')
        })
    },[router])

  return (
    <Container>
        <Heading 
            title='Trips'
            subtitle="Where you've been where you going"
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

export default TripsClient