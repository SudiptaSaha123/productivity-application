import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast'


const NoteSection = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const [editNote, setEditNote] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/api/notes/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(response.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.filter((note) => note._id !== id));
      toast.success('Note deleted successfully')
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    setNewNote(e.target.value);
  };

  const submitHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/notes/",
        { content: newNote },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Note edited successfully')
      setNotes([...notes, response.data]);
    } catch (error) {}
  };

  const openEditModal = (note) => {
    setEditNote(note.content);
    setCurrentNoteId(note._id);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditNote("");
    setCurrentNoteId(null);
  };

  const editNoteHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/notes/${currentNoteId}`,
        { content: editNote },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes(
        notes.map((note) =>
          note._id === currentNoteId ? { ...note, content: editNote } : note
        )
      );
      
      closeEditModal();
      toast.success('Note edited successfully')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="flex flex-col">
        <div className="uppercase text-[2rem] sm:text-[3rem]  text-center sm:text-right">
          Your <span className="font-semibold">Notes.</span>
        </div>
        <div>
          <form onSubmit={submitHandler} className="flex flex-col">
            <textarea
              className="border-2 border-black py-4 px-3 outline-none rounded-md"
              cols={50}
              rows={8}
              onChange={changeHandler}
            ></textarea>
            <button
              type="submit"
              className=" bg-black text-white text-center w-fill mt-4 py-2 rounded-md"
            >
              Add Note
            </button>
          </form>
      </div>

    <div className={`flex gap-10 w-fill flex-wrap mt-10 items-center justify-center`}>
        {notes.map((note) => (
          <div className="bg-slate-100 text-black flex min-w-full w-fit h-fit px-4 py-4  justify-between flex-col gap-10 capitalize rounded-md">
            <div>{note.content}</div>
            <div className="flex gap-2">
            <button
              onClick={() => deleteHandler(note._id)}
              className="bg-black text-white w-fit h-fit py-1 px-4 uppercase rounded-md"
            >
              Delete
            </button>
            <button
                onClick={() => openEditModal(note)}
                className="bg-black text-white w-fit h-fit py-1 px-4 uppercase rounded-md"
              >
                Edit
              </button>
            </div>
          </div>
        ))}

        {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-[1.2rem]">Edit Note</h2>
            <form onSubmit={editNoteHandler} className="flex flex-col gap-6">
              <textarea
                className="border-2 border-black py-4 px-2 outline-none rounded-md w-[18rem] h-[15rem] sm:w-[30rem] sm:h-[20rem]"
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
              ></textarea>
              <div className="flex gap-4">
              <button type="submit" className="bg-black text-white py-2 flex-1 uppercase rounded-md">
                Save
              </button>
              <button onClick={closeEditModal} className="bg-black text-white  py-2 flex-1 uppercase rounded-md">
                Cancel
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
      <Toaster/>
    </div>
  );
};

export default NoteSection;