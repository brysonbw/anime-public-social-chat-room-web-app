import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const PageNotFound = (props: Props) => {
  return (
    <div className=' co '>
    <Link to="/">
    <p className='mt-4 hover:cursor-pointer hover:underline text-white'>← back to homepage</p>
    </Link>
    </div>
  )
}

export default PageNotFound