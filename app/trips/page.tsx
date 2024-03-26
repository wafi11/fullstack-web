import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/utils/ClientOnly'
import EmptyState from '../components/main/EmptyState'
import getReservations from '../actions/getReservations'
import TripsClient from './TripsClient'

const TripsPage = async() => {
    const currentUser = await getCurrentUser()
    
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized"
                    subTitle="Please Login before Accsess Page"
                    />
            </ClientOnly>
        )
    }
    const reservations = await getReservations({
        userId : currentUser.id
    })

    if(reservations.length === 0) {
        return (
           <ClientOnly>
                <EmptyState 
                    title='No Trips Found'
                    subTitle='Please choose your Destination!'
                />
           </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <TripsClient 
            reservations={reservations}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default TripsPage