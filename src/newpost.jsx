import { Header } from "./header"
import { Link } from "react-router-dom";
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { TextInput, Textarea, Checkbox, Button } from '@mantine/core';

const NewPostForm = () => {
    const newpostAction = `https://blog-api-backend.fly.dev/blog/create-post`

    const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

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

    return (<div className="bg-blue-200">
        <div className="text-center text-3xl text-blue-800">Create a New Post</div>
        <form action={newpostAction} method="POST" onSubmit={SubmitNewPost}>
            <div className="flex flex-col items-center gap-y-2">
            <TextInput
            label="Title: "
            name="title"></TextInput>
            <Editor
            label="Content: "
            name="content"
            apiKey='ful941xckaqsyqgyp47o67n6i6w9l1yhj9lkm31l0s3icbyr'
            onInit={(_evt, editor) => editorRef.current = editor}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}></Editor>
            <TextInput
            label="Tag: "
            name="tag"></TextInput>
            <Checkbox
            label="Publish "
            name="published"></Checkbox>
            <Button type="submit"><Link to="/blog">Post</Link></Button>
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