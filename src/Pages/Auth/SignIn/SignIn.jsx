import { Checkbox, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const navigate = useNavigate();
  const [showpassword, setShowpassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowpassword(!showpassword);
  };

  const onFinish = (values) => {
    setLoading(true);
    // Simulating login without actual API call
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
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
              className="py-10 md:py-28 mx-2 md:mx-0 px-6 md:px-10 rounded-2xl w-[580px] h-[525px]  bg-opacity-25 border-2 border-[#eef6ff] mt-10"
            >
              <div className="mb-4 text-center">
                <h2 className="mb-6 text-2xl text-center md:text-3xl">
                  Login to Your Account
                </h2>
                <Typography.Text className="text-base text-center text-black ">
                  Please enter your email and password to continue
                </Typography.Text>
              </div>
              <Form.Item name="email" label={<p className=" text-md">Email</p>}>
                <Input
                  // required
                  className=" text-md"
                  placeholder="Your Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label={<p className=" text-md">Password</p>}
              >
                <div className="relative flex items-center justify-center">
                  <Input
                    // required
                    className=" text-md"
                    type={showpassword ? "password" : "text"}
                    placeholder="Password"
                  />
                  <div className="absolute right-0 flex justify-center px-3">
                    <button onClick={togglePasswordVisibility} type="button">
                      {showpassword ? (
                        <FaRegEyeSlash className="" />
                      ) : (
                        <FaRegEye className="" />
                      )}
                    </button>
                  </div>
                </div>
              </Form.Item>
              <div className="flex items-center justify-between my-2">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-black text-md hover:text-black">
                    Remember Password
                  </Checkbox>
                </Form.Item>
                <Link to="/forgate-password" className="">
                  <p className="text-red-600 hover:text-red-600 text-md ">
                    Forgate Password
                  </p>
                </Link>
              </div>
              <Form.Item className="my-10 text-center">
                <button
                  className="bg-[#101749] text-center   p-2 font-semibold  text-white px-10 py-2 rounded-md "
                  type="submit"
                  disabled={loading}
                >
                  Sign in
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
