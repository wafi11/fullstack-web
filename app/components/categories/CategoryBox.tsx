import qs from 'query-string'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
interface CategoryBoxProps{
    label : string,
    // description : string
    icon : IconType
    teken? :boolean
}

const CategoryBox : React.FC<CategoryBoxProps> = ({
    label,
    icon : Icon,
    teken 
}) => {

    const router = useRouter()
    const params = useSearchParams()

   
  const handleClick = useCallback(() => {
    let currentQuery = {};
    
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [label, router, params]);

  return (
    <div 
        onClick={handleClick}
        className={
            `flex flex-col items-center justify-center gap-2 p-3 border-b-2 
             hover:text-neutral-800 transition cursor-pointer
            ${teken ? 'border-b-neutral-800' : 'border-transparent'}
            ${teken ? "text-neutral-800" : "text-neutral-500"}`}
        >
        <Icon size={20} />
        <div className='font-medium text-sm'>
            {label}
        </div>
    </div>
  )
}

export default CategoryBox