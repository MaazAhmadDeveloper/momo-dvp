import { useState, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import { supabase } from "../services/supabase";
import Loading from "../../components/Loading";
import LeftArrowIcon from "../../assets/left-arrow-icon.svg";
import ErrorMessage from "../../components/ErrorMsg";


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        const registerUser = async () => {
            setLoading(true);
            setError("");
            setSuccess("");

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            setLoading(false);

            if (error) {
                setError(error.message);
                return;
            }
            if (data?.user) {
                setSuccess(
                    "Registration successful! Please check your email to confirm your account."
                );
                return;
            }
            setError("Something went wrong. Please try again.");
        };
        registerUser();

    }, [email, password, confirmPassword]);


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-white rounded-xl shadow p-8 m-auto">
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

                {success && <div className="text-green-600 bg-green-50 p-2"> {success} </div>}

                <h2 className="text-2xl font-semibold text-center mb-2">Create Account</h2>
                <p className="text-center text-gray-500 mb-6">Sign up to get started</p>


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


                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />


                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        {loading && <Loading size={22} />} Register
                    </button>
                </form>


                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <NavLink to="/login" className="text-blue-500">Sign in</NavLink>
                </p>
            </div>
        </div>
    );
}