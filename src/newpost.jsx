import { UserContext } from "./UserContext";
import { useContext } from "react";
import { Header } from "./header"
import { TextInput, Textarea } from '@mantine/core';

const NewPostForm = () => {
    const { user } = useContext(UserContext);
    const newpostAction = `https://blog-api-backend.fly.dev/blog/create-post`

    async function SubmitNewPost(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const dataEntries = Object.fromEntries(data.entries());
        const dataJson = JSON.stringify(dataEntries);
        const jwt_token = localStorage.getItem("jwt_token");
        try {
            await fetch(newpostAction,
            {   method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt_token}`
                },
                body: dataJson,
                mode: "cors"});
                location.reload();
        }
        catch(error) {
            console.error("Error:", error);
        }
    }

    return (<div>
        <form></form>
    </div>)
}

export const NewPost = () => {
    return (<div>
        <Header></Header>
        <NewPostForm></NewPostForm>
    </div>)
}