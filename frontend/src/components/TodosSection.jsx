import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, {Toaster} from 'react-hot-toast'


const TodosSection = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");

    try {
      let response = await axios.get("http://localhost:3000/api/todos/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteHandler = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success('Task Completed')
    } catch (error) {}
  };

  const changeHandler = (e) => {
    setNewTodo(e.target.value);
  };

  const submitHandler = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/todos/",
        { title: newTodo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos([...todos, response.data.todo]);
      setNewTodo("");
      toast.success('Todo added')
    } catch (error) {}
  };
  return (
    <div>
      <h1 className="text-black text-[1.4rem] sm:text-[1.6rem]">
        {todos.length === 0 ? `Plan your day 🎯` : `today's tasks, ${todos.length} left 🎯`}
      </h1>
      <div className="mt-8 flex gap-4 w-[100%]">
        <input
          type="text"
          onChange={changeHandler}
          value={newTodo}
          className="border-2 border-black bg-white outline-none px-2 w-full py-2"
        />
        <button className="bg-black text-white rounded-md px-4"  onClick={submitHandler}>
          ADD
        </button>
      </div>
        <div className={`mt-6 flex justify-betwen ${todos.length >0 ? `bg-slate-100` : `bg-none` } flex-col gap-4  py-4 px-4 rounded-md`}>
        {todos.map((todo) => (
        <div className="flex justify justify-between gap-6">
          <div className="text-black w-[15rem] capitalize ">{todo.title}</div>
          <button
            className="bg-green-600 text-white px-2 text-[0.9rem] rounded-md"
            onClick={() => deleteHandler(todo._id)}
          >
            DONE
          </button>
        </div>
      ))}
        </div>
        <Toaster/>
    </div>
  );
};

export default TodosSection;
