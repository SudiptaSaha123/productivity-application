import React, { useEffect, useState } from "react";
import NoteSection from "../components/NoteSection";
import TodosSection from "../components/TodosSection";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast'


const Home = () => {
  const navigate = useNavigate();

  let [userName, setUserName] = useState("");

  const onClickHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully")
    navigate("/signin");
  };

  const getUserName = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/fetchuser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserName(response.data.user.firstName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);
  return (
    <div className="bg-white w-[screen] h-screen overflow-x-hidden flex flex-col px-6 sm:px-20 py-10">
      <div className="flex justify-between">
        <h1 className="text-black text-[1.4rem] sm:text-[2rem]">hello, {userName} 👋🏻</h1>
        <button className="bg-red-600 text-white py-1 px-2 sm:px-4 text-center text-[0.9rem] rounded-md tracking-widest font-semibold" onClick={onClickHandler}>LOGOUT</button>
      </div>
      <div className="flex sm:flex-row flex-col mt-10 justify-center gap-10 sm:gap-40">
        <div className="w-full sm:w-[30%]">
          <TodosSection/>
        </div>
        <div className="w-full sm:w-[70%]">
          <NoteSection />
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default Home;
