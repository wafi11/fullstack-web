import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/utils/ClientOnly'
import EmptyState from '../components/main/EmptyState'
import getFavorite from '../actions/getFavorite'
import FavoriteClient from './FavoriteClient'

const Favorite = async() => {
    const currentUser = await getCurrentUser()
    const favorite = await getFavorite()
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState 
                    title='Unauthorized'
                    subTitle='Please Login for access content'
                />
            </ClientOnly>
        )
    }

    if(favorite.length === 0){
        return (
            <ClientOnly>
                <EmptyState 
                    title='No Favoites found'
                    subTitle='Looks like you have on home page'
                />
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <FavoriteClient 
            currentUser={currentUser}
            listing={favorite}
        />
    </ClientOnly>
  )
}

export default Favorite