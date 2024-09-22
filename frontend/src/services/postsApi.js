export const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    return await res.json();
};

export const createNewPost = async (newPost) => {
    const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
    });
    console.log(newPost)
    return await res.json();
};

export const deletePostApi = async (pid) => {
    const res = await fetch(`/api/posts/${pid}`, {
        method: "DELETE",
    });
    return await res.json();
};

export const updatePostApi = async (pid, updatedPost) => {
    const res = await fetch(`/api/posts/${pid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
    });
    return await res.json();
};
