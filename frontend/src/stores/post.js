import { fetchPosts, createNewPost, deletePostApi, updatePostApi } from "../services/postsApi";
import { create } from "zustand";

export const usePostStore = create((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),

    createPost: async (newPost) => {
        const data = await createNewPost(newPost);
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({ posts: [...state.posts, data.data] }));
        return { success: true, message: data.message };
    },

    fetchPosts: async () => {
        const data = await fetchPosts();
        set({ posts: data.data });
    },

    deletePost: async (pid) => {
        const data = await deletePostApi(pid);
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            posts: state.posts.filter((post) => post._id !== pid),
        }));
		await fetchPosts();
        return { success: true, message: data.message };
    },

    updatePost: async (pid, updatedPost) => {
        const data = await updatePostApi(pid, updatedPost);
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            posts: state.posts.map((post) => (post._id === pid ? data.data : post)),
        }));
		await fetchPosts();
        return { success: true, message: data.message };
    },

}));
