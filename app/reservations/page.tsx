import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import EmptyState from "../components/main/EmptyState"
import ClientOnly from "../components/utils/ClientOnly"
import Heading from "../components/utils/heading/Heading"
import ReservationsClient from "./reservationsClient"

const Reservations = async() => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized"
                    subTitle="Please Login for acess content"
                />
            </ClientOnly>
        )
    }
    const reservations = await getReservations({
        authorId : currentUser.id
    })
    if(reservations.length === 0){
        return (
            <ClientOnly>
                <EmptyState 
                     title='No Reservation Found'
                     subTitle='Please choose your Destination!'
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
           <ReservationsClient 
                currentUser={currentUser}
                reservations={reservations}
           />
        </ClientOnly>
    )
}

export default Reservations