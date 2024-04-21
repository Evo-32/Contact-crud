import React from "react";
import { IoMdTrash } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { useMutation, useQueryClient } from "react-query";
import { removeContact } from "./fetchContact/FetchContact";
import { useNavigate } from "react-router-dom";
import { contactContextShare } from "./Context/Context";

const Contact = ({ contact }) => {
  const { fullname, email, phone, _id } = contact;
  const { setUpdate, update } = contactContextShare();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(
    ["contact", _id],
    removeContact,
    {
      onSuccess: () => QueryClient.invalidateQueries("contact"),
    }
  );

  const handleUpdate = () => {
    setUpdate(contact);
    navigate("/add");
  };

  return (
    <div className="w-[17rem] shadow-md shadow-gray-400 overflow-hidden rounded-lg">
      <img
        className="w-full h-[12rem] 0bject-cover"
        src="profile.jpg"
        alt="contactimg"
      />

      <div className="p-3 text-sm flex-col gap-1">
        <p> fullName: {fullname}</p>
        <p> email: {email}</p>
        <p>phone: {phone}</p>
      </div>
      <div className="p-3 flex item-center justify-end gap-2">
        <button
          onClick={() => {
            mutate(_id);
            window.location.reload();
          }}
          className="text-red-700 hover:opacity-75"
        >
          <IoMdTrash />
        </button>
        <button
          onClick={handleUpdate}
          className="text-xl text-blue-700 hover:opacity-75"
        >
          <CiEdit />
        </button>
      </div>
    </div>
  );
};

export default Contact;
