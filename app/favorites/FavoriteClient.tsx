import React from 'react'
import { SafeListing, SafeUser } from '../components/types'
import Container from '../components/utils/Container'
import Heading from '../components/utils/heading/Heading'
import ListingCard from '../components/main/ListingCard'

interface FavoriteClientProps{
    currentUser? : SafeUser | null
    listing : SafeListing[]
}

const FavoriteClient : React.FC<FavoriteClientProps> = ({
    currentUser,
    listing
}) => {
  return (
    <Container>
        <Heading 
            title='Favorite'
            subtitle='List of places you have favorited!'
        />
        <div className='
            mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                {listing.map((listing) => {
                    return (        
                        <ListingCard 
                            key={listing.id}
                            data={listing}                           
                            currentUser={currentUser}
                        />
                    )
                })}
        </div>
    </Container>
  )
}

export default FavoriteClient