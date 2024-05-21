const currentUser = localStorage.getItem("userid")
const url = `/api/getFavorites/{userid}`;
export const getFavorites = async () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const options = {
        method: "GET",
    };
    const result = await fetch(url, { ...options, headers });

    if (result.ok) {
        const posts = await result.json();
        return posts
            .sort((a, b) => (a.id > b.id ? 1 : -1));
    }
    return [];
};