"use client";
import { useState } from "react";
import { DiGithubAlt } from "react-icons/di";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Submit = (e) => {
    e.preventDefault();
    setMessage(`Welcome, ${email}!`);
    Reset();
  };
  const notify = () =>{
    if (email&&password!=null) {
      toast("Welcome!")
    } else {
      toast("Email or Pass is Empty")
    }
  };

  const Reset = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-6 flex flex-col justify-center items-center">
      <div className=" rounded-xl shadow-2xl flex justify-center  items-center h-[70vh]  w-fit">
        <form
          onSubmit={Submit}
          className="bg-white  form p-6 rounded-l flex flex-col gap-6 justify-center "
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input mb-4"
          />
          <button type="submit" onClick={notify} className="btn  bg-red-300 hover:bg-red-400">
            Login
          </button>
        </form>
        <div className="text-white text-7xl hidden sm:flex gap-5 uppercase  bg-red-400 rounded-xl w-72 h-full  flex-col items-center justify-center ">
          Login <DiGithubAlt />
        </div>
      </div>
      {        <ToastContainer />
      }
    </div>
  );
};

export default Login;
