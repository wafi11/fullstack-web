import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismaDb'


export async function POST(
    request : Request,
){
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const body = await request.json()
    const {
        listingsId,
        startDate,
        endDate,
        totalPrice
    } = body

    if(!listingsId || !startDate || !endDate || !totalPrice){
        return NextResponse.error()
    }

    const listingAndReservation = await prisma.listing.update({
        where : {
            id : listingsId
        },
        data : {
            reservations : {
                create : {
                    userId :currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }

    })
    return NextResponse.json(listingAndReservation)
}