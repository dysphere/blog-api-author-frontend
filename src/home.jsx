import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "./header";

function unescapeHtmlEntities(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent.slice(0, 60) + "...";
  }

const BlogCard = ({title, author, id, date_posted, content}) => {
    return (
    <Link to={`${id}`}><div className="flex flex-col gap-y-2.5 bg-blue-200 hover:bg-blue-300 text-blue-800 border-l-4 border-blue-800 py-6 pl-4 pr-12 w-screen md:w-[30rem]">
        <h2 className="text-center">{title}</h2>
        <div className="flex gap-x-4">
        <p>{date_posted}</p>
        <p>{author}</p>
        </div>
        <div
      dangerouslySetInnerHTML={{__html: unescapeHtmlEntities(content)}}
    />
    </div></Link>)
}

export const HomePage = () => {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
        try {
            const response = await fetch("https://blog-api-backend.fly.dev/blog/index", {mode: "cors"});
            const data = await response.json();
            setPosts(data);
        }
        catch(error) {
            setError(error);
            throw new Error('server error');
        }
        finally {
            setLoading(false);
        }
        }
        getPost();
    }, [])

    const cards = !error && !loading ? posts.map((post) => {
        return <div key={post._id}>
            <BlogCard
            title={post.title}
            author={post.author.username}
            id={post._id}
            date_posted={post.date_posted_formatted}
            content={post.content}/>
            </div>
    }) : null;

    return (<div className="">
        <Header></Header>
        <div className="bg-blue-100 md:mx-auto mt-24 pb-10">
        <div className="pt-5"><h1 className="text-center text-3xl text-blue-800">All Posts</h1></div>
        {error ? <div><p className="text-center text-blue-800 mt-4">An error was encountered</p></div> :
        loading ? <div><p className="text-center text-blue-800 mt-4">Loading blog posts...</p></div>:
        <div className="flex flex-col items-center gap-y-6 pt-5">{cards}</div>}
        </div>
    </div>)
}