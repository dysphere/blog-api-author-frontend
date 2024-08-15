import { Header } from "./header"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import { TextInput, Checkbox, Button } from '@mantine/core';

const NewPostForm = () => {
    const newpostAction = `https://blog-api-backend.fly.dev/blog/create-post`
    const [value, setValue] = useState("");
    const [text, setText] = useState("");

    const navigate = useNavigate();

    const onEditorInputChange = (newValue, editor) => {
      setValue(newValue);
      setText(editor.getContent());
}

    async function SubmitNewPost(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        data.set('content', text);
        const dataEntries = Object.fromEntries(data.entries());
        const dataJson = JSON.stringify(dataEntries);
        const jwt_token = localStorage.getItem("jwt_token");
        try {
            let response = await fetch(newpostAction,
            {   method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt_token}`
                },
                body: dataJson,
                mode: "cors"});
                await response.json();
        }
        catch(error) {
            console.error("Error:", error);
        }
        navigate("/blog")
    }

    return (<div className="bg-blue-200">
        <div className="text-center text-3xl text-blue-800">Create a New Post</div>
        <form action={newpostAction} method="POST" onSubmit={SubmitNewPost}>
            <div className="flex flex-col items-center gap-y-2">
            <TextInput
            label="Title: "
            name="title"></TextInput>
            <Editor
            label="Content: "
            textareaName="content"
            apiKey='ful941xckaqsyqgyp47o67n6i6w9l1yhj9lkm31l0s3icbyr'
            onEditorChange={(newValue, editor) => onEditorInputChange(newValue, editor)}
            onInit={(evt, editor) => setText(editor.getContent())}
            init={{
              allow_html_in_named_anchor: true,
            }}
            ></Editor>
            <TextInput
            label="Tag: "
            name="tag"></TextInput>
            <Checkbox
            label="Publish "
            name="published"></Checkbox>
            <Button type="submit">Post</Button>
            </div>
        </form>
    </div>)
}

export const NewPost = () => {
    return (<div>
        <Header></Header>
        <NewPostForm></NewPostForm>
    </div>)
}