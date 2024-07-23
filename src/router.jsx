import { HomePage } from "./home";
import { SignupPage } from "./signup";
import { LoginPage } from "./login";
import { BlogPost } from "./blogpost";
import { NewPost } from "./newpost";

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/blog" replace={true}/>
        },
        {
            path: "new",
            element: <NewPost/>
        },
        {
            path: "blog",
            element: <HomePage/>,
        },
        {
            path:"blog/:id",
            element: <BlogPost/>
        },
        {
            path: "signup",
            element: <SignupPage/>
        },
        {
            path: "login",
            element: <LoginPage/>
        }
    ]);

    return <RouterProvider router={router}/>
}

export default Router;