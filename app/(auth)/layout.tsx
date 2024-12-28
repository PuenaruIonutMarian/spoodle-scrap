import Logo from '@/components/Logo'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <Logo />
        <div className='h-8'></div>
        {children}
    </div>
  )
}

export default layout