"use client"
import React, { useMemo } from 'react'
import { SafeUser } from '../types'
import { IconType } from 'react-icons'
import useContries from '../modal/rent/useCountries'
import Avatar from '../utils/Avatar'
import ListingCategory from './ListingCategory'
import dynamic from 'next/dynamic'


interface ListingInfoProps {
    user : SafeUser ,
    guestCount : number
    roomCount : number
    description : string
    bathroomCount : number
    category : {
        icon : IconType,
        description : string,
        label : string
    } | undefined
    locationValue : string
}

const ListingInfo : React.FC<ListingInfoProps> = ({
    user,
    locationValue,
    guestCount,
    roomCount,
    description,
    category,
    bathroomCount
}) => {
    const {getByValue} = useContries()
    const coordinate = getByValue(locationValue)?.latIng
    const Map = useMemo(() => dynamic(() => import('@/app/components/utils/map/Map'),{
        ssr : false
    }),[coordinate])
  return (
    <div className='col-span-4 flex flex-col gap-8 '>
        <div className='fkex flex-col gap-2'>
            <div className='text-xl font-semibold flex flex-row items-center gap-2'>
                <div>Hosted by : {user?.name}</div>
                <Avatar src={user?.image}/>
            </div>
            <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
                <div>
                    {guestCount} guest
                </div>
                <hr />
                <div>
                    {roomCount} room
                </div>
                <hr />
                <div>
                    {bathroomCount} bathroom
                </div>
            </div>
        </div>
        <hr />
        {
            category && (
                <ListingCategory 
                    icon = {category.icon}
                    label = {category.label}
                    description = {category.description}
                />
            )
        }
        <hr />
        <div className='text-lg font-light text-neutral-500'>
            {description}
        </div>
        <hr />
        <Map center={coordinate} />
    </div>
  )
}

export default ListingInfo