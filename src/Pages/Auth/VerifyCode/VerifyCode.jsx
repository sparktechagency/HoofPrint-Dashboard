import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate()

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 5);
  }, []);

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(0, 1);

    setCode(newCode);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = (e) => {
    e.preventDefault();
    alert("Verification code resent!");
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    navigate('/new-password')
    alert(`Verifying code: ${verificationCode}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div  className="py-10 md:py-28 mx-2 md:mx-0 px-6 md:px-10 rounded-2xl w-[580px] h-[525px] bg-[#79DEF8] bg-opacity-25 border-2 border-[#eef6ff] mt-10">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-gray-600">Check your email</h1>
          <p className="mt-4 text-gray-500">
            We sent a reset link to <span className="font-medium text-gray-700">naoue@gmail.com</span>
          </p>
          <p className="text-gray-500">Enter the 5-digit code mentioned in the email</p>

          <form onSubmit={handleVerify} className="mt-6">
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={code[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-xl font-semibold text-center text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                  maxLength={1}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-8 text-white transition-colors rounded-full bg-[#52B5D1] hover:bg-[#418fa5] focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
            >
              Verify Code
            </button>
          </form>

          <p className="mt-6 text-gray-500">
            Didn't receive the email?{" "}
            <a
              href="#"
              onClick={handleResend}
              className="text-sky-400 hover:text-sky-500 focus:outline-none"
            >
              Resend
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
