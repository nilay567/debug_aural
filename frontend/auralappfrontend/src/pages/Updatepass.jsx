import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const generateStrongPassword = () => {
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const specialChars = "!@#$%^&*()_+{}|<>?";
  const digits = "0123456789";

  const getRandomChar = (charset) => {
    const randomIndex = Math.floor(Math.random() * charset.length);
    return charset[randomIndex];
  };

  let password = "";
  password += getRandomChar(uppercaseLetters);
  password += getRandomChar(lowercaseLetters);
  password += getRandomChar(specialChars);
  password += getRandomChar(digits);
  password += getRandomChar(
    uppercaseLetters + lowercaseLetters + specialChars + digits
  );

  return password;
};

const ChangePassword = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    previousPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordTracker, setPasswordTracker] = useState({
    uppercase: false,
    lowercase: false,
    specialChar: false,
    digit: false,
    score: 0,
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("AuralApp")) || {};
  const userId = user.data;

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/StudentById/${userId}`);
        const data = response.data;

        if (data.status === 'success') {
          const user = JSON.parse(data.data)[0];
          console.log(user.password);
          
        } else {
          console.error('Error fetching user data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const validatePassword = (value) => {
    

    setPasswordTracker({
      uppercase: value.match(/[A-Z]/) !== null,
      lowercase: value.match(/[a-z]/) !== null,
      specialChar: value.match(/[!@#$%^&*(),.?":{}|<>]/) !== null,
      digit: value.match(/[0-9]/) !== null,
      
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'newPassword' || name === 'confirmPassword') {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are not empty
    if (!formData.previousPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error('Please fill in all the fields');
      return;
    }

    // Validate password strength
    const { uppercase, lowercase, specialChar, digit } = passwordTracker;
    const isPasswordValid =
      uppercase &&
      lowercase &&
      specialChar &&
      digit &&
      formData.newPassword.length >= 6;

    if (!isPasswordValid) {
      const examplePassword = generateStrongPassword();
      const passwordCriteria =
        "1 uppercase letter, 1 lowercase letter, 1 special character, 1 digit, and a minimum of 6 characters";

      toast.error(`
        Password does not meet the required strength. 
        Please ensure your password includes ${passwordCriteria} and try again.
        Example of a strong password: ${examplePassword}
      `);

      return;
    }

    // Check if new password and confirm password match
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    // Validate previous password
    const isPreviousPasswordCorrect = await validatePreviousPassword(
      formData.previousPassword,
      userData.password
    );

    if (!isPreviousPasswordCorrect) {
      toast.error('Incorrect previous password');
      return;
    }
    
    if (formData.previousPassword === formData.newPassword) {
      toast.error('New password should be different from the previous password');
      return;
    }

    // Update user data
    updateUserData(formData.newPassword);
  };

  const updateUserData = async (newPassword) => {
    try {
      const response = await axios.put(`http://localhost:5001/updateUser/${userId}`, {
        password: newPassword,
      });

      // console.log('Request data:', { password: newPassword });
      console.log('Response data:', response.data);

      if (response.data.status === 'success') {
        toast.success('Your password has been successfully updated. Please log in again to secure your account.');
        navigate('/');
        localStorage.clear();
      } else {
        console.error('Error updating user information:', response.data.message);
        toast.error('Error updating password');
      }
    } catch (error) {
      console.error('Error updating user information:', error);
      toast.error('Error updating password');
    }
  };

  const validatePreviousPassword = async (previousPassword) => {
    try {
      const response = await axios.post('http://localhost:5001/verify-previous-password', {
        userId: userId,
        previousPassword: previousPassword,
      });
  
      const data = response.data;
      return data.message === 'Password is correct';
    } catch (error) {
      console.error('Error validating previous password:', error);
      return false;
    }
  };

  

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="modal-content p-6 bg-gradient-to-r from-blue-500 to-purple-500 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Previous Password:</label>
            <input
              type="password"
              name="previousPassword"
              className="w-full p-2 border rounded-md"
              value={formData.previousPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">New Password:</label>
            <input
              type="password"
              name="newPassword"
              className="w-full p-2 border rounded-md"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full p-2 border rounded-md"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
          >
            Change Password
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;