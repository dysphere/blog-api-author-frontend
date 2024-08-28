import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Header } from "./header";
import { TextInput, PasswordInput, Button } from "@mantine/core";

const LoginForm = () => {

    const { addToken } = useContext(UserContext);
    const navigate = useNavigate();

    async function LoginSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const dataEntries = Object.fromEntries(data.entries());
        const dataJson = JSON.stringify(dataEntries);
        addToken(dataJson);
        navigate("/blog");
    }

    return (<div className="text-blue-800 bg-blue-100 md:mx-[44rem] mt-24">
        <h2 className="text-center text-3xl mt-10 pt-5">Author Log In</h2>
        <form action="https://blog-api-backend.fly.dev/blog/author-log-in" method="POST" onSubmit={LoginSubmit}>
            <div className="flex flex-col items-center gap-y-2 py-5">
            <TextInput
            label="Username: "
            name="username"
            styles={{
                label: {
                  fontSize: 18,
                  color: 'rgb(30, 64, 175)',
                }
              }}/>
            <PasswordInput
            label="Password"
            name="password"
            className="w-52"
            styles={{
                label: {
                  fontSize: 18,
                  color: 'rgb(30, 64, 175)',
                }
              }}/>
            <Button type="submit" className="mt-2" color="rgb(30, 64, 175)" radius="10px">Log In</Button>
            </div>
        </form>
        </div>)
}

export const LoginPage = () => {
    return (<div>
        <Header></Header>
        <LoginForm></LoginForm>
    </div>)
}