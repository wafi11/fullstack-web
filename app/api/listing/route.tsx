import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismaDb";

export async function POST(
    request : Request
){
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return NextResponse.error()
    }
    const body = await request.json()
    const {
        title ,
        description ,
        category,
        location, 
        guestCount,
        roomCount ,
        bathroomCount ,
        imageSrc ,
        price ,
    } = body

    Object.keys(body).forEach((value) => {
        if(!body[value]){
            return NextResponse.error()
        }
    })

    const listing =await prisma.listing.create({
        data: {
            title,        
            description,
            category,  
            imageSrc,     
            roomCount,     
            bathroomCount, 
            guestCount,    
            locationValue : location.value, 
            userId : currentUser.id,         
            price : parseInt(price,10),         
          
         } 
     });
     console.log(listing)
     return NextResponse.json(listing);
}
