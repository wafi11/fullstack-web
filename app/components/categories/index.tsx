import React from 'react'
import Container from '../utils/Container'
import { DataCategories} from './data'
import CategoryBox from './CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category') 
  const pathname = usePathname()

  const isMainPage = pathname === '/'
  if(!isMainPage){
    return null
  }
  return (
    <Container >
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {
          DataCategories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              // description={item.description}
              teken={category === item.label}
              icon={item.icon}
            />
          ))
        }
      </div>
    </Container>
  )
}

export default Categories