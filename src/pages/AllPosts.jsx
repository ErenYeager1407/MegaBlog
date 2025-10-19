import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Call getPosts() with NO arguments to use the default 'active' filter
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <h1 className='text-2xl font-bold text-center'>Loading...</h1>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <h1 className='text-2xl font-bold text-center w-full'>
                            No Active Posts Found
                        </h1>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;