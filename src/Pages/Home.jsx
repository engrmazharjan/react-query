import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';

const POSTS = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" }
]

// /posts -> ["posts"]
// /posts/1 -> ["posts", post.id]
// /posts?authorId=1 -> ["posts", {authorId:1}]
// /posts/2/comments -> ["posts", post.id, "comments"]
const Home = () => {
    const postQuery = useQuery({
        queryKey: ["posts"],
        queryFn: async (obj) => {
            console.log("query obj", obj);
            await wait(1000);
            return [...POSTS];
        }
    });

    if (postQuery.isLoading) {
        return <h1>Loading...</h1>
    }
    if (postQuery.isError) {
        return <pre>{JSON.stringify(postQuery.error)}</pre>
    }
    return (
        <>
            <h1>React Query</h1>
            <div>
                {
                    postQuery.data.map((post, index) => (
                        <div key={post.id}>{post.title}</div>
                    ))
                }
            </div>
            <Link to={"/posts"}>Posts</Link>
        </>
    )
}


function wait(duration) {
    return new Promise(resolve => setTimeout(resolve, duration))
}

export default Home