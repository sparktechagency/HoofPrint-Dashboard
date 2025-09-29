import { Checkbox, Form, Input, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useLogInMutation } from "../../../features/api/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../../features/slices/authSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(true);
  // Loading state for form submission
  const [loading, setLoading] = useState(false);

  // RTK Query mutation hook for login API call
  const [logIn] = useLogInMutation();


  // Toggle password input visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Form submit handler
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Call login API
      const result = await logIn(values).unwrap();

      if (result?.data?.accessToken) {
        dispatch(setToken(result.data.accessToken));
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/dashboard");
      } else {
        message.error("Login failed, please try again.");
      }
    } catch (err) {
      // Handle errors from backend or network
      const backendMessage =
        err?.data?.message ??
        err?.error ??
        "Login failed. Please check your credentials.";
      message.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between w-full gap-2 mx-auto md:max-w-screen-md md:flex-row md:gap-20">
          <div className="md:h-[100vh] w-full flex items-center justify-center ">
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
              className="py-10 md:py-28 mx-2 md:mx-0 px-6 md:px-10 rounded-2xl w-[580px] h-[525px] bg-opacity-25 border-2 border-[#eef6ff] mt-10"
            >
              <div className="mb-4 text-center">
                <h2 className="mb-6 text-2xl md:text-3xl">
                  Login to Your Account
                </h2>
                <Typography.Text className="text-base text-black">
                  Please enter your email and password to continue
                </Typography.Text>
              </div>
              {/* Email Field */}
              <Form.Item
                name="email"
                label={<p className="text-md">Email</p>}
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input className="text-md" placeholder="Your Email" />
              </Form.Item>
              {/* Password Field with toggle visibility */}
              <Form.Item
                name="password"
                label={<p className="text-md">Password</p>}
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <div className="relative flex items-center justify-center">
                  <Input
                    className="text-md"
                    type={showPassword ? "password" : "text"}
                    placeholder="Password"
                  />
                  <div className="absolute right-0 flex justify-center px-3">
                    <button
                      onClick={togglePasswordVisibility}
                      type="button"
                      aria-label={showPassword ? "Show password" : "Hide password"}
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                </div>
              </Form.Item>

              {/* Remember Password Checkbox and Forgot Password Link */}
              <div className="flex items-center justify-between my-2">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-black text-md hover:text-black">
                    Remember Password
                  </Checkbox>
                </Form.Item>
                <Link to="/forgate-password">
                  <p className="text-red-600 hover:text-red-600 text-md">
                    Forgate Password
                  </p>
                </Link>
              </div>

              {/* Submit Button */}
              <Form.Item className="my-10 text-center">
                <button
                  className="bg-[#101749] p-2 px-10 py-2 font-semibold text-white rounded-md"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
