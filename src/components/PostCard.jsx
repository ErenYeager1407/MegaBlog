import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage, slug}) {
  return (
    // Add 'block' so the link takes up the full space of the grid item
    <Link to={`/post/${slug}`} className="block h-full">
        {/* Make the card a flex container with full height */}
        <div className='w-full h-full bg-gray-100 rounded-xl p-4 flex flex-col'>
            {/* This div will now grow to fill available space */}
            <div className='w-full mb-4 flex-1'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                // Image will cover the container without stretching
                className='rounded-xl w-full h-full object-cover' />
            </div>
            <h2
            className='text-xl font-bold truncate'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard;