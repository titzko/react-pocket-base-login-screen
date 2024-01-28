import useLogout from "hooks/useLogout";
import useLogin from "hooks/useLogin";
import pb from "lib/pocketbase";
import { useState } from "react";
import { useForm } from "react-hook-form"

export default function Auth() {
    const logout = useLogout();
    const {mutate: login, isLoading, isError} = useLogin();
    const { register, handleSubmit, reset } = useForm();
    const isLoggedIn = pb.authStore.isValid;

    async function onSubmit(data) {
        login({email: data.email, password: data.password});
        reset();
    }

    if (isLoggedIn)
        return <>
            <h1>Logged in: {isLoggedIn && pb.authStore.model.email}</h1>
            <button onClick={logout}>LogOut</button>
        </>

    return <>
        {isLoading && <p>Loading...</p>}
        {isError && <p style={{color: 'red'}}>Invalid email or password</p>}

        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="email" {...register("email")} />
            <input type="password" placeholder="password" {...register("password")} />
            <button type="submit" disabled={isLoading} >{isLoading ? "Loading" : "Login"}</button>
        </form>
    </>


}