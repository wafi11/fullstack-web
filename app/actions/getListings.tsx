
export const getListings = async() => {
    try{
        const listings = await prisma?.listing.findMany({
            where : {
                createdAt : 'desc'
            }
        })
        return listings
    }catch(err : any){
        throw new Error(err)
    }
}

