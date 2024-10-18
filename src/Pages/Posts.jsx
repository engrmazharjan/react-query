import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom';

const POSTS = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" }
]

const Posts = () => {
    const queryClient = useQueryClient();

    const postQuery = useQuery({
        queryKey: ["posts"],
        queryFn: () => wait(1000).then(() => [...POSTS])
    });

    // Update Records
    const newPostMutation = useMutation({
        mutationFn: async (title) => {
            await wait(1000);
            POSTS.push({ id: crypto.randomUUID(), title });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    })

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
            {/* Adding New Record */}
            <button
                disabled={newPostMutation.isLoading}
                onClick={() => newPostMutation.mutate("New Post")}
            >
                {newPostMutation.isLoading ? 'Adding' : 'Add New'}
            </button>
            <Link to={"/home"}>Home</Link>
        </>
    )
}


function wait(duration) {
    return new Promise(resolve => setTimeout(resolve, duration))
}

export default Posts