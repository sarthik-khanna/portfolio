import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='mt-20'>
      <div className='text-center'>
<Image
alt="logo"
src={assets.logo}
className='w-36 mx-auto mb-2'/>
<div className='w-max flex items-center gap-2 mx-auto '>
        <Image
        alt="email logo"
src={assets.mail_icon}
className='w-6'/>
sarthikkhanna28@gmail.com
      </div>
      </div>
      <div className='text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6'>
        <p>2025 sarthik khanna All rights reserved</p>
        <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
            <li><a target = "_blank" href="https://github.com/">Github</a></li>
             <li><a target = "_blank" href="https://www.linkedin.com/feed/">LinkedIn</a></li>
              <li><a target = "_blank" href="https://x.com/2320495K36933?t=cMwWmZTMhltMpUaoZChmkg&s=08">Twitter</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
