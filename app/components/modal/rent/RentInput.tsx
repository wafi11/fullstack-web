import React from 'react'
import Select from 'react-select'
import useContries from './useCountries'
import Map from '../../utils/map/Map'

export type CountryType = {
    region : string
    flag : string
    latIng : number[]
    label : string
    value : string
}

interface CountrySelectProps {
    value? : CountryType,
    onChange : (value : CountryType) => void
}

const RentInput : React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {
    const {getAll} = useContries()
  return (
    <div>
        <Select  
            placeholder='Anywhere'
            isClearable
            options={getAll()}
            value={value}
            onChange={(value) => onChange(value as CountryType)}
            formatOptionLabel={(option : any) => (
                <div className='flex flex-row gap-3 items-center'>
                    <div>{option.flag}</div>
                    <div>
                        {option.label},
                        <span className='text-neutral-500 ml-1'>
                            {option.region}
                        </span>
                    </div>
                </div>
            )}
            classNames={{
                input : () => 'text-lg',
                option : () => 'text-lg',
                control : () => 'p-3 border-2'
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius : 6,
                colors : {
                    ...theme.colors,
                    primary : 'black',
                    primary25 : '#ffe4e6'
                }
            })}
        />
    </div>
  )
}

export default RentInput