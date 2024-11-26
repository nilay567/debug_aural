import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import Faq from '../components/Settings/Faq';
import Contactus from '../components/Settings/Contactus';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import TokenForm from '../components/tokenform';
import axios from 'axios';
const Settings = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    phone: '',
  });

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("AuralApp")) || {};
  const userId = user.data;

  useEffect(() => {

    fetch(`http://localhost:5001/StudentById/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          console.log(data);
          const userDataFromResponse = JSON.parse(data.data)[0];
          setUserData(userDataFromResponse);
          setFormData({
            username: userDataFromResponse.username || '',
            email: userDataFromResponse.email || '',
            name: `${userDataFromResponse.first_name || ''} ${userDataFromResponse.last_name || ''}`,
            phone: userDataFromResponse.phone || '',
          });
        }
      })
      .catch(error => console.error('Error fetching user data:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleTokenSubmit = async(token) => {

    const user=formData.username;
   
    const url = "http://localhost:5001";
    const reqData={
      username:user,
      api_key:token
    };

    try{
      
     
      const response=await axios.post(`${url}/calendly/apikey`,reqData);
      
     if(response.data.message==="success"){
      toast.success("token submitted successfully")
      console.log("token submiited successfully",response.data)

     }else{
       toast.warn(`${response.data.message}.Please try again`)
       console.log("token submission failed",response.data.message)
     }

    }catch(err){
       toast.error("error in submitting token")
       console.error(err)
    }
    
    
     
    //console.log(reqData)
    //console.log('Submitted Token:', token);

  }; 
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEditField = (field) => {
    setEditingField(field);
  };

  const handleSaveChanges = async () => {
    const changes = {};

    // Check if each field has changed
    if (formData.username.trim() !== userData.username) {
      changes.username = formData.username.trim();
    }

    if (formData.email.trim() !== userData.email) {
      changes.email = formData.email.trim();
    }

    const [firstName, lastName] = formData.name.trim().split(' ');

    // Check if both first_name and last_name are provided
    if (firstName && lastName) {
      if (firstName !== userData.first_name || lastName !== userData.last_name) {
        changes.first_name = firstName;
        changes.last_name = lastName;
      }
    } else {
      // Display an error toast if full name is not provided
      toast.error('Please enter your Full name.');
      return;
    }

    if (formData.phone.trim() !== userData.phone) {
      changes.phone = formData.phone.trim();
    }

    // Check if any changes detected
    if (Object.keys(changes).length === 0) {
      // If no changes detected, show an error toast
      toast.error('No changes detected.');
      return;
    }

    try {
      // Send a PUT request to update user information using fetch
      const response = await fetch(`http://localhost:5001/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token}`,
        },
        body: JSON.stringify(changes),
      });

      const responseData = await response.json();

      console.log('Request data:', changes);
      console.log('Response data:', responseData);

      if (responseData.status === 'success') {
        console.log('User information updated successfully');

        setUserData({
          ...userData,
          ...changes,
        });


        toast.success('User information updated successfully.');
      } else if (responseData.status === 'fail') {

        toast.error(responseData.message);
      }
    } catch (error) {

      toast.error('Error updating user information. Please try again.');
      console.error('Error updating user information:', error);
    }

    closeModal();
  };

  const handleDelete = () => {
    // Make a DELETE request to your API endpoint
    fetch(`http://localhost:5001/deleteUser/${userId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {

        console.log(data);

        if (data.status === 'success') {
          toast.success('User deleted successfully!', {
            position: toast.POSITION.TOP_CENTER,
          });
          localStorage.clear();
          navigate('/');
        } else {
          toast.error('Unable to delete user.', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        setShowModal(false);

      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('An error occurred while deleting user.', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };


  const handleChangePassword = () => {
    navigate('/updatePass');
  };

  const handleConfirmEdit = () => {

    setEditingField(null);
  };

  const handleCancelEdit = () => {

    setEditingField(null);
  };

  return (
    <div className="h-screen flex items-center justify-center">

      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="flex  justify-left">
          <div className="w-1/2 p-4">
           
             
              <div className="modal-content p-6 bg-blue-900 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-white">Edit Profile</h2>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">Username:</label>
                  <div className="flex items-center">
                    {editingField === 'username' ? (
                      <>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                        <button
                          className="bg-green-500 text-white py-2 px-4 rounded-md ml-2"
                          onClick={handleConfirmEdit}
                        >
                          Confirm
                        </button>
                        <button
                          className="bg-red-500 text-white py-2 px-4 rounded-md ml-2"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="text-white p-2 border rounded-md">{formData.username}</div>
                        <button
                          className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2"
                          onClick={() => handleEditField('username')}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">Email:</label>
                  <div className="flex items-center">
                    {editingField === 'email' ? (
                      <>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <button
                          className="bg-green-500 text-white py-2 px-4 rounded-md ml-2"
                          onClick={handleConfirmEdit}
                        >
                          Confirm
                        </button>
                        <button
                          className="bg-red-500 text-white py-2 px-4 rounded-md ml-2"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="text-white p-2 border rounded-md">{formData.email}</div>
                        <button
                          className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2"
                          onClick={() => handleEditField('email')}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">Name:</label>
                  <div className="flex items-center">
                    {editingField === 'name' ? (
                      <>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <button
                          className="bg-green-500 text-white py-2 px-4 rounded-md ml-2"
                          onClick={handleConfirmEdit}
                        >
                          Confirm
                        </button>
                        <button
                          className="bg-red-500 text-white py-2 px-4 rounded-md ml-2"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="text-white p-2 border rounded-md">{formData.name}</div>
                        <button
                          className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2"
                          onClick={() => handleEditField('name')}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">Phone:</label>
                  <div className="flex items-center">
                    {editingField === 'phone' ? (
                      <>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        <button
                          className="bg-green-500 text-white py-2 px-4 rounded-md ml-2"
                          onClick={handleConfirmEdit}
                        >
                          Confirm
                        </button>
                        <button
                          className="bg-red-500 text-white py-2 px-4 rounded-md ml-2"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="text-white p-2 border rounded-md">{formData.phone}</div>
                        <button
                          className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2"
                          onClick={() => handleEditField('phone')}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md"
                  onClick={() => setShowModal(true)}
                >
                  Delete Account
                </button>
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                  <div className="p-4 sm:p-10 bg-gray-50 rounded-md text-center overflow-y-auto">
                    <h3 className="mb-2 text-2xl font-bold text-gray-800">Confirm Deletion</h3>
                    <p className="text-gray-500">Are you sure you want to delete this user?</p>

                    <div className="mt-6 flex justify-center gap-x-4">
                      <button
                        onClick={handleDelete}
                        className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-red-500 shadow-sm align-middle hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-600 transition-all text-sm"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Modal>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2"
                  onClick={() => navigate('/')}
                >
                  Close
                </button>
              </div>
              <div className="mt-4">
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </div>
            
          </div>
          <div className="w-1/2 p-4 ml-20">
            <TokenForm onTokenSubmit={handleTokenSubmit} />
          </div>
        </div>
      )}
      <ToastContainer />
      <footer className="fixed bottom-0 left-0 right-0 bg-blue-900 p-4 text-white text-center">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link to="/contactus" className="nav-link underline flex items-center">
              <FaPhoneAlt className="mr-2" /> Contact Us
            </Link>
          </li>
          <li className="flex items-center">
            <Link to="/faq" className="nav-link underline flex items-center">
              <FaEnvelope className="mr-2" /> FAQ
            </Link>
          </li>
        </ul>
        AuralApp - &copy; {new Date().getFullYear()} All Rights Reserved.
      </footer>



    </div>
  );
};

export default Settings;