import axios from "axios";

const baseURL = "http://localhost:5000";

//get all data from the api
export const getAllData = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/contact`);
    console.log(res);
    return res.data.allContact;
  } catch (error) {
    console.error(error);
  }
};

//create new contact user

export const addContact = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/contact/create`, data);
    return res.newContact;
  } catch (error) {
    console.error(error);
  }
};

//delete contact user

export const removeContact = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/api/contact/delete/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

//update contact user

export const updateContact = async (contact) => {
  try {
    const res = await axios.put(
      `${baseURL}/api/contact/update/${contact._id}`,
      contact
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
