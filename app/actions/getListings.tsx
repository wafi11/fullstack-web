export interface ListingParams {
    userId? : string
    guestCount? : number
    roomCount? : number
    bathroomCount? : number
    startDate? : string
    endDate? : string
    locationValue? : string
    category? : string
}

export default async function getListings (
    params : ListingParams
){
    try{
        const {
            userId ,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            category,
        }= params

        let query : any = {}
        
        if(userId){
            query.userId = userId
        }
        if(category){
            query.category = category
        }
        if(roomCount){
            query.roomCount = {
                gte : +roomCount
            }
        }
        if(guestCount){
            query.guestCount = {
                gte : +guestCount
            }
        }
        if(bathroomCount){
            query.bathroomCount = {
                gte : +bathroomCount
            }
        }
        if(locationValue){
            query.locationValue = locationValue
        }
        if(startDate && endDate){
            query.NOT = {
                reservations : {
                    some : {
                        OR : [
                            {
                                endDate : {gte : startDate},
                                startDate : {lte : endDate }
                            },
                            {
                                startDate : {lte : startDate },
                                endDate : {gte : endDate},
                            },

                        ]
                    }
                }
            }
        }
        const listings = await prisma?.listing.findMany({
            where : query,
            orderBy : {
                createdAt : 'desc'
            }
        })
        const SafeListing = listings?.map((listing) => ({
            ...listing,
            createdAt : listing.createdAt.toISOString(),
        }))

        return SafeListing
    }catch(err : any){
        throw new Error(err)
    }
}

