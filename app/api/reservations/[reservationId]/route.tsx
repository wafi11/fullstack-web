import getCurrentUser from '@/app/actions/getCurrentUser'
import {NextResponse} from 'next/server'
import prisma from '../../../libs/prismaDb'


interface Iparmas {
    reservationId? : string
}

export async function DELETE (
    request : Request,
    {params} : {params : Iparmas}
) {
    try{
            const currentUser = await getCurrentUser()

            if(!currentUser){
                return NextResponse.error()
            }

            const {reservationId} = params
            if(!reservationId || typeof reservationId !== 'string'){
                throw new Error('invalid Id')
            }

            const reservation =  await prisma?.reservation.deleteMany({
                where : {
                    id : reservationId,
                    OR : [
                        { userId : currentUser.id},
                        { Listing : {userId : currentUser.id} }
                    ]
                }
            })
            return NextResponse.json(reservation)
    }catch(err){

    }
}