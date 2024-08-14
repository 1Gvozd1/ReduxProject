import { useEffect, useState } from "react";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";
import { IPost } from "../models/IPost";


const PostContainer = () => {
    const [limit, setLimit] = useState(100);
    const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllPostsQuery(limit, {
        pollingInterval: 100000 //в определенный промежуток времени мы получаем новые данные (анаалоог вебсокетов)
    }) // передастся users?=5 5 постов всего покажет 
    // Еси будет 2 компонент который использует useFetchAllPostsQuery то мы не будем делать несколько запросов
    // refetch нужен для того чтобы отправить данные заного
    //const [createPost, {}] = postAPI.useCreatePostMutation()
    const [createPost, {}] = postAPI.useCreatePostMutation()
      const [updatePost, {}] = postAPI.useUpdatePostMutation()
    const [deletePost, {}] = postAPI.useDeletePostMutation()

    useEffect(() => {
        // setTimeout(() => {
        //     setLimit(3)
        // }, 2000) // уменьшится но 3 а второй комопнент не изменит количество постов
    }, [])

    const handleCreate = async () => {
        const title = prompt()
        await createPost({title, body: title} as IPost)
    }

    const handleRemove = (post: IPost) => {
        deletePost(post)
    }

    const handleUpdate = (post: IPost) => {
        updatePost(post)
    }


    return (
        <div>
            <div className="post__list">
            <button onClick={handleCreate}>Add new post</button>
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка при загрузке</h1>}
            {posts && posts.map(post =>
                    <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post}/>
                )}
            </div>                
        </div>
    );
};

export default PostContainer;