import getCurrentUser from "./getCurrentUser";
import prisma from '../libs/prismaDb'

export default async function getFavorite(){
    try{
        const currentUser = await getCurrentUser()

        if(!currentUser){
            return []
        }

        const Favorite = await prisma.listing.findMany({
            where : {
                id : {
                    in : [...(currentUser.favoriteIds) || []]
                }
            }
        })

        const safeFavorites = Favorite.map((favorite)=> ({
            ...favorite,
            createdAt : favorite.createdAt.toISOString()
        }))

        return safeFavorites
    }catch(error : any) {
        throw new Error(error)
    }
}