import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// https://jsonplaceholder.typicode.com/todos
// https://jsonplaceholder.typicode.com/posts

const getPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await res.json();
}

const updatePosts = async (newPost) => {
    // Make a POST request to the server with the new post data
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })
    return await res.json();
}
const Todos = () => {
    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
        // staleTime: 60000 // When tab is stale for 60 seconds
        // refetchInterval: 60000 // Get data each 60 seconds
    });

    const { mutate, isPending, isError } = useMutation({
        /**
         * This mutation function will be called when the mutation is executed.
         * It will make a POST request to the server with the new post data.
         * The response from the server will be passed to the onSuccess callback.
         * 
         * @param {Object} newPost - The new post to be added
         */
        mutationFn: updatePosts,

        /**
         * This callback function will be called when the mutation is successful.
         * It will cache the new post in the QueryClient cache.
         * @param {Object} newPost - The new post that was added
         */
        onSuccess: (newPost) => {
            // Invalidate the cache for the "posts" query. This will cause the useQuery hook to re-fetch the data from the server.
            // queryClient.invalidateQueries({ queryKey: ["posts"] });
            // Set the new post in the cache, so we can immediately see the new post without having to wait for the server to respond.
            return queryClient.setQueryData(["posts"], (oldPosts) => [...oldPosts, newPost]);
        }
    })

    console.log("data:::::::::", data);
    if (isLoading || isPending) return <h1>DATA IS LOADING...</h1>
    if (error || isError) return <h1>THERE IS AN ERROR</h1>
    return (
        <>
            <h1>POSTS</h1>
            <p>Total Posts: {data.length}</p>
            <button onClick={() => mutate({
                userId: 4000,
                id: 5000,
                title: "New post title",
                body: "New post body",
            })}> Create Post</button>

            {
                data.length > 0 && data.map((post, index) => (
                    <>
                        <div key={index} style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <h6 style={{ margin: "0px", color: "white", fontWeight: "bold" }}>ID: {post?.id}</h6>
                            <h6 style={{ margin: "0px", color: "white", fontWeight: "bold" }}>USER_ID: {post?.userId}</h6>
                            <h6 style={{ margin: "0px", color: "white", fontWeight: "bold" }}>TITLE: {post?.title}</h6>
                            <h6 style={{ margin: "0px", color: "white", fontWeight: "bold" }}>BODY: {post?.body}</h6>
                        </div>
                        <hr />
                    </>
                ))
            }
        </>
    )
}

export default Todos