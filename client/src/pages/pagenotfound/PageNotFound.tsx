import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const PageNotFound = (props: Props) => {
  return (
    <div className=' co '><iframe title='404-giphy' src="https://giphy.com/embed/26vIdtMwB9WMaNJ4Y" width="480" height="480" frameBorder="0" className="giphy-embed mx-auto mb-5" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/Bounce-TV-yikes-whoops-my-bad-YrBRYRDN4M5ryrNOND" className='text-4xl text-white'>404 - Page Not Found</a></p>
    <Link to="/">
    <p className='mt-4 hover:cursor-pointer hover:underline text-white'>← back to homepage</p>
    </Link>
    </div>
  )
}

export default PageNotFound