import React from 'react'
import Link from 'next/link'
const Nav = () => {
  return (
    <div className='my-4 flex gap-4 justify-center border-gray-500 border-2 p-2'>
        <Link href="/" className='bg-blue-400 p-2'>Home</Link>
        <Link href="/inuse" className='bg-blue-400 p-2'>Inuse</Link>
    </div>
  )
}

export default Nav