"user client"

import { cn } from '@/lib/utils';
import { SquareDashedMousePointer } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function Logo({
    fontSize = '2xl',
    iconSize = 20
    } : {fontSize?:string; iconSize?:number}) {
  return (
    <Link 
    href="/"
    className={cn("text-2xl font-extrabold flex items-center gap-2", fontSize)}>
        <div className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 p-2">
            <SquareDashedMousePointer size={iconSize} className='stroke-white'></SquareDashedMousePointer>
        </div>
        <div className="">
            <span className='bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent'>
                Spoodle
            </span>
            <span className='text-stone-700 dark:text-stone-300'>Scratch</span>
        </div>
    </Link>
  )
}

export default Logo