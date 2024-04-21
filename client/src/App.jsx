import React from "react";
import Contacts from "./components/Contacts";
// import Contact from "./components/Contact"
import { Route, Routes } from "react-router-dom";
import AddContact from "./components/Addcontacts/AddContact.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Contacts />} />
      {/* <Route path="/contact " element={<Contact />} /> */}
      <Route path="/add" element={<AddContact />} />
    </Routes>
  );
};

export default App;
