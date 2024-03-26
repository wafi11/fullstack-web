"use client"
import React, { useCallback, useMemo, useState } from 'react'
import Modal from './Modal'
import useSearchModal from '../hooks/useSearchModals'
import { useRouter, useSearchParams } from 'next/navigation'
import { Range } from 'react-date-range'
import RentInput, { CountryType } from './rent/RentInput'
import dynamic from 'next/dynamic'
import useContries from './rent/useCountries'
import qs from 'query-string'
import { formatISO } from 'date-fns'
import Heading from '../utils/heading/Heading'
import Calender from '../utils/Calender'
import Counter from './rent/Counter'

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const searchModal = useSearchModal()
    console.log(SearchModal)
    const router = useRouter()
    const params = useSearchParams()

    const [step,setStep] = useState(STEPS.LOCATION)
    const [location,setLocation] =useState<CountryType>()
    const [guestCount,setGusetCount] = useState(1)
    const [roomCount,setRoomCount] = useState(1)
    const [bathroomCount,setBathroomCount] = useState(1)
    const [dateRange,setDateRange] = useState<Range>({
        startDate : new Date(),
        endDate : new Date(),
        key : 'selection'
    })
    const Map = useMemo(() => dynamic(() => import('../utils/map/Map'),{
        ssr : false,
    }),[location])

    const {getAll} = useContries()
    const onBack = () => {
        setStep((value) => value - 1)
    }
    const onNext = () => {
        setStep((value) => value + 1)
    }
    const onSubmit = useCallback(async() => {
        if(step !== STEPS.INFO){
            return onNext()
        }
 
    let currentQuery = {}
    if(params){
        currentQuery = qs.parse(params.toString())
    }
    const updatedQuery : any= {
        ...currentQuery,
        locationValue : location?.value,
        guestCount,
        roomCount,
        bathroomCount
    }

    if(dateRange.startDate){
        updatedQuery.startDate = formatISO(dateRange.startDate)
    }
    if(dateRange.endDate){
        updatedQuery.endDate = formatISO(dateRange.endDate)
    }
    const url = qs.stringifyUrl({
        url : '/',
        query : updatedQuery
    },{skipNull : true})

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)
},[ step, 
    searchModal, 
    location, 
    router, 
    guestCount, 
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params])

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO){
            return 'Search'
        }
        return 'Next'
    },[step])
    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.LOCATION){
            return undefined
        }

        return 'Back'
    },[step])
    
    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading 
                title='Where Do you wanna go'
                subtitle='Find your location'
            />
            <RentInput 
                value={location}
                onChange={(value) => 
                    setLocation(value as CountryType)
                }
            />
            <hr />
            <Map center={location?.latIng} />
        </div>
    )

    if(step === STEPS.DATE){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='When you plan to go?'
                    subtitle='Make Sure Everyone is free!'
                />
                <Calender 
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if(step === STEPS.INFO){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Add your rooms'
                    subtitle='Booking your perfect rooms'
                />
               <Counter 
                   title='Guests'
                   subtitle='How many guests do you allow?'
                    onChange={(value) => setGusetCount(value)}
                    value={guestCount}
                />
                <hr />
                <Counter 
                   title='Rooms'
                   subtitle='How many rooms do you have?'
                    onChange={(value) => setRoomCount(value)}
                    value={roomCount}
                />
                <hr />
                <Counter 
                   title='Bathrooms'
                   subtitle='How many bathrooms do you have?'
                    onChange={(value) => setBathroomCount(value)}
                    value={bathroomCount}
                />
            </div>
        )
    }


    
  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  )
}

export default SearchModal