import { useNavigate } from "react-router-dom";
import { Header } from "./header";
import { TextInput, PasswordInput, Button } from "@mantine/core";

const SignupForm = () => {

  const navigate = useNavigate();

    async function SignupSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const data = new FormData(form);
        const dataEntries = Object.fromEntries(data.entries());
        const dataJson = JSON.stringify(dataEntries);
        try {
            let response = await fetch("https://blog-api-backend.fly.dev/blog/author-sign-up",
                {   method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: dataJson,
                    mode: "cors"});
                await response.json();
                }
        catch (error) {
                console.error("Error:", error);
            }
          navigate("/login");
        }

    return (<div className="text-blue-800 bg-blue-100 md:mx-[44rem] mt-24">
        <h2 className="text-center text-3xl mt-10 pt-5">Author Sign Up</h2>
        <form action="https://blog-api-backend.fly.dev/blog/author-sign-up" method="POST" onSubmit={SignupSubmit}>
            <div className="flex flex-col items-center gap-y-2 py-5">
            <TextInput
            label="First Name: "
            name="first_name"
            styles={{
                label: {
                  fontSize: 18,
                  color: 'rgb(30, 64, 175)',
                }
              }}/>
            <TextInput
            label="Last Name: "
            name="last_name"
            styles={{
                label: {
                  fontSize: 18,
                  color: 'rgb(30, 64, 175)',
                }
              }}/>
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
            <Button type="submit" className="mt-2" color="rgb(30, 64, 175)" radius="10px">
              Sign Up</Button>
            </div>
        </form>
        </div>)
}

export const SignupPage = () => {
    return (<div>
        <Header></Header>
        <SignupForm></SignupForm>
    </div>)
}