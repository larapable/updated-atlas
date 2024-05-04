"use client";

import { useState, useEffect } from "react";
import { Button, Modal } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword || !department) {
      setErrorMessage("All fields are necessary.");
      setErrorModalOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password and Confirm Password do not match.");
      setErrorModalOpen(true);
      return;
    }

    // Check if password meets requirements
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be a minimum of 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character (including period)."
      );
      setErrorModalOpen(true);
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,username}),
      });

      const { user, userName } = await resUserExists.json(); // Assuming the server responds with both user and userName

      if (user || userName) {
          setErrorMessage("User already exists.");
          setErrorModalOpen(true);
          return;
      }
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          department,
        }),
      });

      if (res.ok) {
        console.log("Signup successful");
        // Clear input fields after successful signup
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setDepartment("");
        router.push("/login");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration", error);
    }
  };

  return (
    <div className="h-screen flex lg:flex-row md:flex-col">
      <div className="flex flex-col items-center lg:ml-60 lg:mt-28 md:mt-8 md:ml-13 ">
        <div className=" font-bold lg:text-[4.1rem] lg:mb-18 md:text-[4rem] md:mb-10 ">
          Sign Up
        </div>
        <div className="border-[0.1rem] border-solid border-black border-opacity-60 rounded-lg w-[38rem] flex items-center mb-6 py-4">
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            type="text"
            placeholder="Department"
            className="flex-1 font-medium placeholder-[#807979] bg-transparent focus:outline-none text-[1rem] px-3 py-1 ml-4 mr-4"
          />
        </div>
        <div className="border-[0.1rem] border-solid border-black border-opacity-60 rounded-lg w-[38rem] mb-6 py-4 flex items-center">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="flex-1 px-3 py-1 ml-4 mr-4 font-medium placeholder-[#807979] bg-transparent focus:outline-none text-[1rem]"
          />
        </div>
        <div className="border-[0.1rem] border-solid border-black border-opacity-60 rounded-lg w-[38rem] mb-6 py-4 flex items-center">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="flex-1 px-3 py-1 ml-4 mr-4 font-medium placeholder-[#807979] bg-transparent focus:outline-none text-[1rem]"
          />
        </div>
        <div className="flex flex-row space-x-8">
          <div className="border-[0.1rem] border-solid border-black border-opacity-60 rounded-lg w-[18rem] mb-6 py-4 flex">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="flex-1 px-3 py-1 ml-4 mr-4 font-medium placeholder-[#807979] bg-transparent focus:outline-none text-[1rem]"
            />
          </div>
          <div className="border-[0.1rem] border-solid border-black border-opacity-60 rounded-lg w-[18rem] mb-6 py-4 flex items-center">
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="flex-1 px-3 py-1 ml-4 mr-4 font-medium placeholder-[#807979] bg-transparent focus:outline-none text-[1rem]"
            />
          </div>
        </div>
        <Button
          className="rounded-lg bg-[#8a252c] text-white font-bold text-xl w-[38rem] px-12 py-5 border[0.1rem] border-white mb-4 hover:bg-[#eec160] hover:text-[#8a252c] "
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
        <div className="text-lg mb-2 font-light">
          Already have an account?{" "}
          <a href="/login" className="font-bold text-black hover:underline">
            Log in
          </a>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex-1 bg-[#807979] h-0.5 w-[17.3rem]"></div>
          <div className="mx-4 text-bold">or</div>
          <div className="flex-1 bg-[#807979] h-0.5 w-[17.3rem]"></div>
        </div>
        <a
          href="/"
          className="text-2xl text-[#8a252c] font-bold lg:mt-4 md:mb-16 hover:underline"
        >
          Back Home
        </a>
      </div>
      <div className="flex flex-col items-center bg-[#8a252c] lg:w-full lg:ml-[12%] md:w-full">
        <img
          src="wc-screen-scorecard.png"
          className="w-28 h-28 mt-24 lg:mr-96 md:mr-[60%] mb-4 hover:scale-110 transition-transform"
          alt="Scorecard"
        />
        <p className="text-white ml-40 mr-20 mb-16 font-bold text-2xl">
          <span className="text-[#fad655]">Track key metrics</span>
          <span>
            , analyze trends, and make informed decisions to drive success.
          </span>
        </p>
        <img
          src="wc-screen-swot.png"
          className="w-28 h-28 mt-4 lg:mr-96 md:mr-[60%] mb-4 hover:scale-110 transition-transform"
          alt="SWOT"
        />
        <p className="text-white ml-40 mr-20 mb-16 font-bold text-2xl">
          <span className="text-[#fad655]">
            Identify strength, weaknesses, opportunities, and threats{" "}
          </span>
          <span>to your business.</span>
        </p>
        <img
          src="wc-screen-stratmap.png"
          className="w-28 h-28 mt-4 lg:mr-96 md:mr-[60%] mb-4 hover:scale-110 transition-transform"
          alt="Strategy"
        />
        <p className="text-white ml-40 mr-20 mb-4 md:mb-16 font-bold text-2xl">
          <span className="text-[#fad655]">Define objectives</span>
          <span>, outline initiatives, and map out your path to success.</span>
        </p>
      </div>
      <Modal
        open={errorModalOpen}
        onClose={handleCloseErrorModal}
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-description"
      >
        <div className="flex flex-col items-center mt-80">
          <div className=" bg-white px-4 text-center justify-center shadow-2xl rounded-2xl mt-2">
            <p
              id="error-modal-title"
              className=" text-6xl font-bold text-red-500"
            >
              Error!
            </p>
            <p id="error-modal-description" className=" text-3xl m-5">
              {errorMessage}
            </p>
            <Button
              className="rounded-lg bg-[#8a252c] text-white font-bold text-xl w-40 px-12 py-5 border[0.1rem] border-white mb-2 hover:bg-[#eec160] hover:text-[#8a252c]"
              onClick={handleCloseErrorModal}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
