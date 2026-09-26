import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";


const signupSchema = z.object({
    name: z
        .string()
        .min(2, "Username must be at least 2 characters"),

    email: z
        .string()
        .email("Please enter a valid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;


const Signup = () => {


    const navigate = useNavigate()
    const [signupError, setSignupError] = useState("")

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        setSignupError("");

        try {

            const response = await fetch(
                "https://stylehub-backend-pq06.onrender.com/api/users/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            )
            const responseData = await response.json();

            if (!response.ok || !responseData) {
                throw new Error(responseData?.message || "Signup failed");
            }

            console.log("Signup response:", responseData);

            alert("Signup successfully!");

            reset();

            navigate("/login");
        } catch (error) {
            console.log(error);
            setSignupError(
                error instanceof Error ? error.message : "Signup failed. Please try again."
            );
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container" >
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                      {signupError && (
    <p className="signup-error">{signupError}</p>
  )}


                    <div className="form-group" >

                        <label>Name</label>

                        <input type="text"
                            placeholder="Enter your name"
                            {...register("name")}
                        />

                        {errors.name && (
                            <p className="form-error">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                        />

                        {errors.email && (
                            <p className="form-error" >
                                {errors.email.message}
                            </p>

                        )}
                    </div>


                    <div className="form-group" >

                        <label>Password</label>

                        <input type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                        />

                        {errors.password && (
                            <p className="form-error" >
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button type="submit" className="auth-button"  >Sign Up </button>


                </form>

                <p className="auth-switch" >
                    Already have an account?{" "}
                    <Link to="/login" > Login</Link>
                </p>

            </div>
        </div>
    )
}

export default Signup;