"use client";
import { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    const savedImages = JSON.parse(localStorage.getItem("images")) || [];
    setImages(savedImages);
  }, []);

  const Submit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      username,
      password,
      avatar: avatar || "https://via.placeholder.com/150",
    };
    const updatedUsers = editingUser
      ? users.map((u) => (u.username === editingUser.username ? newUser : u))
      : [...users, newUser];

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    Reset();
  };

  const Reset = () => {
    setName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setAvatar(null);
    setEditingUser(null);
  };

  const HEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setUsername(user.username);
    setPassword(user.password);
    setAvatar(user.avatar);
    setEditingUser(user);
  };

  const HDelete = (username) => {
    const updatedUsers = users.filter((u) => u.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleImageChange = (event) => {
    const f = event.target.files[0];
    if (f) {
      const r = new FileReader();
      r.onloadend = () => {
        setAvatar(r.result);
      };
      r.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 h- flex flex-col justify-center items-center ">
      <div className="rounded-xl shadow-2xl flex justify-center items-center h-[70vh] w-fit">
        <form
          onSubmit={Submit}
          className="bg-white form p-6 rounded-l flex flex-col gap-6 justify-center "
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 mb-4"
          />
          {avatar && (
            <img
              src={avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full"
            />
          )}
          <button type="submit" className="btn bg-blue-300 hover:bg-blue-400">
            Submit
          </button>
        </form>
        <div className="text-white hidden sm:flex  text-7xl gap-5 uppercase shapedividers_com-193 bg-blue-300 rounded-xl w-72 h-full  flex-col items-center justify-center ">
          User <FaUserAstronaut />
        </div>
      </div>
      <ul className="my-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <li key={user.username} className="flex justify-between items-center p-4">
            <div className="flex flex-col justify-center items-center">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-20 h-20 rounded-full"
              />
              <br />
              <div>
                <button
                  onClick={() => HEdit(user)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  <CiEdit />
                </button>
                <button
                  onClick={() => HDelete(user.username)}
                  className="text-red-500 hover:underline"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
