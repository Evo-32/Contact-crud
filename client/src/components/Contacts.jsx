import React from "react";
import Contact from "./Contact";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllData } from "./fetchContact/FetchContact";

const Contacts = () => {


  const { data, isLoading, isError } = useQuery("Contact", getAllData);

  const navigate = useNavigate();

  return (
    <div className="w-[80%] mx-auto my-[3rem] border-2 border-blue-100 shadow-gray-400 rounded-lg">
      <h1 className="p-6 text-center flex-1 text-2xl font-bold text-gray-700">
        Contacts application
      </h1>

      <div className="text-right mr-10">
        <a href="/add"><button
          // onClick={() => navigate("add")}
          className=" bg-pink-500 600 p-2 text-white rounded-md hover:opacity-75"
        >
          Add contact
        </button></a>
      </div>

      {/* map through my data */}

      <div className="p-4 lg:p-7 flex items-center flex-wrap gap-5 w-[95%] mx-auto">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong!!!</p>}
        {data?.length === 0 ? (
          <p>No contact available</p>
        ) : (
          data?.map((contact, i) => <Contact contact={contact} key={i} />)
        )}
      </div>
    </div>
  );
};

export default Contacts;
