import { Metadata } from "next";

const metadata: Metadata = {
  title: "Login - My Shop",
  description: "Login to your account to access exclusive features and offers.",
};

export default function LoginPage(){
    return (
        <main className="w-full h-screen flex items-center justify-center">
          <div className="p-10 border-[rgb(0,0,0,0.1)] border rounded-xl animate-pulse count ">
            <h1 className="uppercase font-integral font-bold text-4xl">Log in</h1>

          </div>
        </main>
    );
}