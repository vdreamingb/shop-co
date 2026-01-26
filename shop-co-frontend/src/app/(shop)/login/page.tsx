import LoginForm from "@/components/forms/loginForm";

export default function LoginPage():React.JSX.Element{
    return <div className="w-screen h-screen px-3 flex items-center justify-center">
        <div className="border-[rgb(0,0,0,0.1)] border rounded-xl p-13 max-w-125 w-full pulse shadow-xl shadow-neutral-200">
            <h1 className="integral font-medium text-4xl text-center">Log in</h1>
            <LoginForm />
        </div>
    </div>
}