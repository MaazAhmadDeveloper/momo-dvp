import { useState, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import { supabase } from "../services/supabase";
import LeftArrowIcon from "../../assets/left-arrow-icon.svg";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMsg";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        const loginUser = async () => {
            setLoading(true);
            setError("");

            let { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })

            if (error) {
                setError(error.message);
            }

            setLoading(false);
        }

        loginUser();

    }, [email, password]);


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
                <ErrorMessage message={error} />
                <Link to="/">    
                <img
                    className="inline-block"
                    src={LeftArrowIcon}
                    alt="loading"
                    width={30}
                    height={30}
                />
                </Link>
                <h2 className="text-2xl font-semibold text-center mb-2">Sign In</h2>
                <p className="text-center text-gray-500 mb-6">Enter your credentials to continue</p>


                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />


                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        {loading && <Loading size={22} />} Sign In
                    </button>
                </form>


                <p className="text-center text-sm text-gray-600 mt-6">
                    Don&apos;t have an account?{" "}
                    <NavLink to="/register" className="text-blue-500">Create one</NavLink>
                </p>
            </div>
        </div>
    );
}