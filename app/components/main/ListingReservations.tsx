import React from 'react'
import {Range} from 'react-date-range'
import Calender from '../utils/Calender'
import Button from '../utils/button/Button'

interface ListingReservationsProps {
    price : number,
    totalPrice : number,
    disabled : boolean,
    disabledDate : Date[],
    onChangeDate : (value : Range) => void
    onSubmit : () => void
    dateRange : Range
}

const ListingReservations :React.FC<ListingReservationsProps>= ({
    price,
    totalPrice,
    dateRange,
    disabled,
    disabledDate,
    onChangeDate,
    onSubmit
}) => {
  return (
    <div className='bg-white rounded-xl border-neutral-200 border-[1px] overflow-hidden'>
        <div className='flex flex-row items-center gap-1 p-4'>
            <div className='text-2xl font-semibold'>
                    $ {price}
            </div>
            <div className='font-light text-neutral-600'>
                / night
            </div>
        </div>
        <hr />
        <Calender 
            value={dateRange}
            disabledDates={disabledDate}
            onChange={(value) => onChangeDate(value.selection)}
        />
        <hr />
        <div className='p-4'>
            <Button 
                disabled={disabled}
                label='reserve'
                onClick={onSubmit}  
                />
        </div>
        <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
            <div>Total : </div>
            <div>$ {totalPrice}</div>
        </div>
    </div>
  )
}

export default ListingReservations