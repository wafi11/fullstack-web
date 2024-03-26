import React from 'react'
import getCurrentUser from './actions/getCurrentUser'
import ClientOnly from './components/utils/ClientOnly'
import Container from './components/utils/Container'
import EmptyState from './components/main/EmptyState'
import ListingCard from './components/main/ListingCard'
import getListings, { ListingParams } from './actions/getListings'

interface HomeProps {
  searchParams: ListingParams
};

const Home = async({searchParams} : {searchParams : ListingParams}) => {
  const currentUser = await getCurrentUser()
  const listing = await getListings(searchParams)
    if(listing?.length === 0){
      <ClientOnly>
      <EmptyState showReset/>
    </ClientOnly>
}
  return (
    <ClientOnly>
      <Container>
        <div className='pt-24 
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {
            listing?.map((list : any) => {
              return (
                <ListingCard 
                  currentUser={currentUser}
                  key={list.id}
                  data={list}
                />
            )})
          }
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home