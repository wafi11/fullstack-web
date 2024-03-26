"use client"
import React, { useMemo, useState } from 'react'
import Modal from '../Modal'
import useRentModals from '../../hooks/RentModals'
import Heading from '../../utils/heading/Heading'
import { DataCategories } from '../../categories/data'
import CategoryInput from '../../categories/CategoryInput'
import { FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import RentInput from './RentInput'
import dynamic from 'next/dynamic'
import Counter from './Counter'
import ImageUpload from './ImageUpload'
import Input from '../../utils/input/Input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGE = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModals = () => {
    const RentModal = useRentModals()
    const [steps,setSteps] = useState(STEPS.CATEGORY)
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()


    const {
        register,handleSubmit,setValue,watch,
        formState :{ 
            errors,
        } ,reset
    } = useForm<FieldValues>({
        defaultValues : {
            category : '',
            location : null,
            guestCount :1,
            roomCount : 1,
            bathroomCount : 1,
            imageSrc : '',
            price : 1,
            title : '',
            description : ''
        }
    })

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const bathroomCount = watch('bathroomCount')
    const roomCount = watch('roomCount')
    const imageSrc = watch('imageSrc')
    const description = watch('description')

    const Map = useMemo(() => dynamic(() => import('@/app/components/utils/map/Map'),{
        ssr : false
    }),[location])

    const setCustomValue = (id : string,value : any) => {
        setValue(id,value ,{
            shouldDirty : true,
            shouldTouch : true,
            shouldValidate : true,
        })
        console.log(value)
    }

    const onBack = () => {
        setSteps((value) => value - 1)
    }
    const onNext = () => {
        setSteps((value) => value + 1)
    }

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        if(steps !== STEPS.PRICE){
            return onNext()
        }
        setIsLoading(true)
        axios.post('api/listing',data)
        .then(() => {
            toast.success('Listing Success!')
            router.refresh()
            reset()
            setSteps(STEPS.CATEGORY)
            RentModal.onClose()
        })
        .catch(() =>{
            toast.error('Something went wrong!')
        })
        .finally(() => {
            setIsLoading(false)
        })
    }
    const actionLabel = useMemo(() => {
        if( steps === STEPS.PRICE){
            return 'Create'
        }
        return 'Next'
    },[steps])
    const secondaryActionLabel = useMemo(() => {
        if( steps === STEPS.CATEGORY){
            return undefined
        }
        return 'Back'
    },[steps])

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading 
                title='Which of these best describes your place?'
                subtitle='Pick a Category'
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[58vh] overflow-y-auto'>
                {
                    DataCategories.map((item) => (
                        <div key={item.label} className='col-span-1'>
                            <CategoryInput 
                                onClick={(category) => setCustomValue('category',category)}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                                />
                        </div>
                    ))
                }
            </div>
        </div>
    )
    
    if(steps === STEPS.LOCATION){
        bodyContent =(
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Where is your location ?'
                    subtitle='Help Guest?'
                    />
                <RentInput 
                    value={location} 
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map 
                    center={location?.latIng}
                />
            </div>
        )
    }

    if(steps == STEPS.INFO){
        bodyContent=(
            <div className=' flex flex-col gap-8 '>
                <Heading 
                    title='Share Some basics your place?'
                    subtitle='What amenties do you have?' 
                />
                <Counter 
                   title='Guests'
                   subtitle='How many guests do you allow?'
                    onChange={(value) => setCustomValue("guestCount",value)}
                    value={guestCount}
                />
                <hr />
                <Counter 
                   title='Rooms'
                   subtitle='How many rooms do you have?'
                    onChange={(value) => setCustomValue("roomCount",value)}
                    value={roomCount}
                />
                <hr />
                <Counter 
                   title='Bathrooms'
                   subtitle='How many bathrooms do you have?'
                    onChange={(value) => setCustomValue("bathroomCount",value)}
                    value={bathroomCount}
                />
            </div>
        )
    }

    if(steps === STEPS.IMAGE){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Add a photo of your place?'
                    subtitle='Show guests what your place looks like!'
                />
                <ImageUpload
                    value={imageSrc} 
                    onChange={(value) => setCustomValue('imageSrc',value)}
                />
            </div>
        )
    }

    if(steps === STEPS.DESCRIPTION){
        bodyContent = (
            <div className=' flex flex-col gap-8'>
                <Heading 
                    title='How you would describe your place?'
                    subtitle='Short and sweet works best!'
                />
                <Input
                    id='title'
                    label='Title'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id='description'
                    label='Description'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if(steps === STEPS.PRICE){
        bodyContent =(
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Now, set your price?'
                    subtitle='How much do you charge per night?'
                />
                <Input
                    id='price'
                    label='Price'
                    formatPrice
                    type='number'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    const footer = (
        <div>
            haiii
        </div>
    )

  return (
   <Modal 
        isOpen={RentModal.isOpen}
        onClose={RentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        title='Airbnb your home'
        actionLabel={actionLabel} 
        secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent} 
        footer={footer} 
        secondaryActionLabel={`${secondaryActionLabel}`}   
    />
  )
}

export default RentModals