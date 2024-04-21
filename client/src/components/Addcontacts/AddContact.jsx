import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { addContact, updateContact } from "../fetchContact/FetchContact";
import { contactContextShare } from "../Context/Context";

const AddContact = () => {
  const navigate = useNavigate();
  const { update, setUpdate } = contactContextShare();
  const [contact, setContact] = useState(
    update
      ? update
      : {
          fullname: "",
          phone: "",
          email: "",
          birth: "",
          image: "",
          _id: "",
        }
  );

  const queryClient = useQueryClient();
  const {mutate, isLoading, isError } = useMutation(addContact, {
    onSuccess: () => queryClient.invalidateQueries("contact"),
  });

  const {
    mutate: updateContacts,
    isLoading: updateLoading,
    isError: updateError,
  } = useMutation(updateContact, {
    onSuccess: () => queryClient.invalidateQueries("contact"),
  });

  useEffect(() => {
    if (update) {
      setContact({
        ...contact,
        fullname: update.fullname,
        phone: update.phone,
        email: update.email,
        birth: update.birth,
        image: update.image,
        _id: update._id,
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (update) {
      updateContacts(contact);
      // navigate(-1);
      window.location.href = "/";
    } else {
      const { _id, ...rest } = contact;
      
      addContact(rest);
      // navigate(-1);
      window.location.href = "/";
      setUpdate(null);
    }
  };

  if (isLoading) return "Loading...";
  if (isError) return "something went wrong...";

  return (
    <section>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-[2rem] left-[4rem] button px-5 text-sm bg-pink-500 600 p-2 text-white rounded-md hover:opacity-75"
      >
        Go Back
      </button>
      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="border border-gray-400 w-[30rem] p-5 flex flex-col gap-5 rounded-md
            shadow-md shadow-gray-400 m-5 lg:m-0"
        >
          <h1 className="text-center text-xl font-medium">
            {update ? "Update Contact" : "Add new Contact"}
          </h1>
          <input
            required
            className="input"
            type="text"
            value={contact.fullname}
            onChange={(e) =>
              setContact({ ...contact, fullname: e.target.value })
            }
            placeholder="Full Name..."
          />
          <input
            required
            className="input"
            type="email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            placeholder="Email..."
          />
          <input
            required
            className="input"
            type="text"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            placeholder="Phone Number..."
          />
          <input
            required={!update && true}
            className="input cursor-pointer"
            type="date"
            value={`${new Date(contact.birth).getFullYear()}-${
              new Date(contact.birth).getMonth() < 10
                ? "0" + new Date(contact.birth).getMonth()
                : new Date(contact.birth).getMonth()
            }-${
              new Date(contact.birth).getDate() < 10
                ? "0" + new Date(contact.birth).getDate()
                : new Date(contact.birth).getDate()
            }`}
            onChange={(e) => setContact({ ...contact, birth: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) =>
              setContact({ ...contact, image: e.target.files[0] })
            }
          />
          <button className="bg-pink-500 600 p-2 text-white rounded-md hover:opacity-75">
            {update ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddContact;
