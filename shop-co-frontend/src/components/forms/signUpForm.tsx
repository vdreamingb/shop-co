"use client"

import { ISignUp } from "@/shared/types/signup.type"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { redirect } from "next/navigation"
import { authService } from "@/services/auth.service"

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>()

  const onSubmit: SubmitHandler<ISignUp> = async (data) => {
    const res = await authService.signup(data)

    if (res === 201 || res === 200) {
      redirect("/admin")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-9 text-center flex items-center flex-col gap-4"
    >
      {/* Email */}
      <input
        type="email"
        {...register("email", {
          required: true,
          minLength: 4,
          pattern: /^\S+@\S+\.\S+$/,
        })}
        className="form-input focus:outline-none"
        placeholder="Email"
      />
      {errors.email && (
        <p className="text-red-500">Email is not valid.</p>
      )}

      {/* First Name */}
      <input
        type="text"
        {...register("firstName", { required: true, minLength: 2 })}
        className="form-input focus:outline-none"
        placeholder="First Name"
      />
      {errors.firstName && (
        <p className="text-red-500">First name must be at least 2 characters.</p>
      )}

      {/* Last Name */}
      <input
        type="text"
        {...register("lastName", { required: true, minLength: 2 })}
        className="form-input focus:outline-none"
        placeholder="Last Name"
      />
      {errors.lastName && (
        <p className="text-red-500">Last name must be at least 2 characters.</p>
      )}

      {/* Phone Number */}
      <input
        type="tel"
        {...register("phoneNumber", {
          required: true,
          pattern: /^[0-9+\-\s()]+$/,
        })}
        className="form-input focus:outline-none"
        placeholder="Phone Number"
      />
      {errors.phoneNumber && (
        <p className="text-red-500">Phone number is not valid.</p>
      )}

      {/* Password */}
      <input
        type="password"
        {...register("password", {
          required: true,
          minLength: 6,
        })}
        className="form-input focus:outline-none"
        placeholder="Password"
      />
      {errors.password && (
        <p className="text-red-500">
          Password must be at least 6 characters.
        </p>
      )}

      <button
        className="bg-black px-16 text-white py-2 rounded-2xl block text-lg hover:bg-neutral-800 cursor-pointer duration-300 ease-in-out font-medium"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  )
}