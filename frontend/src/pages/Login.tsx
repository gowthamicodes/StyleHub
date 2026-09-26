import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth-context";
// import type { Product } from "../types/Product";

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");

  // const [users, setUsers] = useState<Product[]>([])
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // useEffect(() => {

    // const fetchUsers = async () => {

    try {

      setLoginError("");

      const response = await fetch(
        "http://localhost:5000/api/users/login",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Login failed");
      }

      console.log("Login response:", responseData);

      login(responseData.user, responseData.token);

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      console.log(error);

      setLoginError(
        error instanceof Error ? error.message : "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />

            {errors.email && (
              <p className="form-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />

            {errors.password && (
              <p className="form-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {loginError && (
            <p className="form-error">
              {loginError}
            </p>
          )}

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;