// src/pages/EditPost.jsx

import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null)
    const {id} = useParams() // CHANGE: The parameter should be the post ID
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            // CHANGE: Use the new service function to get post by its ID
            appwriteService.getPostById(id).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [id, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost