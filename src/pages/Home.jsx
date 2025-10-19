import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        setLoading(true); // Start loading whenever user changes
        if (userData) {
            // If user is logged in, fetch their posts
            appwriteService.getPosts([]).then((response) => {
                if (response) {
                    const userPosts = response.documents.filter(
                        (post) => post.userid === userData.$id
                    );
                    setPosts(userPosts);
                }
                setLoading(false);
            });
        } else {
            // If user is logged out, clear the posts array
            setPosts([]);
            setLoading(false);
        }
    }, [userData]); // Effect depends on user data

    if (loading) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </Container>
            </div>
        )
    }
    
    return (
        <div className='w-full py-8'>
            <Container>
                {posts.length === 0 ? (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">No Posts Found</h1>
                        <p className="mt-2">Login to create or view your posts.</p>
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold text-center mb-8">My Posts</h1>
                        <div className='flex flex-wrap -mx-2'>
                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </Container>
        </div>
    )
}

export default Home