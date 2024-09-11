import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import defaultProfileImage from "../assets/images/No-profile-pic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FaLinkedin, FaGlobe } from "react-icons/fa";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    imageUrl: "",
    name: "",
    email: "",
    password: "",
    bio: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    current_education_level: "",
    linkedin_link: "",
    website: "",
    role: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const userData = await response.json();
        setProfile(userData.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        }
      );
      if (!response.ok) {
        throw new Error("Error updating profile");
      }
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg relative">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <img
            className="h-48 w-48 object-cover shadow-md rounded-full"
            src={profile.imageUrl || defaultProfileImage}
            alt={profile.name || "Profile Image"}
            onError={(e) => (e.target.src = defaultProfileImage)}
          />
          {editMode && (
            <label className="block mt-4">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </label>
          )}
          <h2 className="text-4xl capitalize text-gold leading-10 font-bold mb-4 mt-4">
            {profile.name}
          </h2>
          {editMode && (
            <button
              onClick={handleCancel}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 group bg-gold hover:bg-lightGold transition-all duration-200 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-gold"
            >
              Cancel
            </button>
          )}
          {!editMode && (
            <button
              onClick={handleEdit}
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 group bg-gold hover:bg-lightGold transition-all duration-200 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-gold"
            >
              Edit Profile
            </button>
          )}
        </div>
        <div className="md:w-2/3 mt-4 md:mt-0 md:ml-8">
          <p className="text-lg text-gray-900 mb-4">{profile.bio}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              {!editMode ? (
                <p className="mt-1 text-lg text-gray-900">{profile.name}</p>
              ) : (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              {!editMode ? (
                <p className="mt-1 text-lg text-gray-900">{profile.email}</p>
              ) : (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              {!editMode ? (
                <p className="mt-1 text-lg text-gray-900">••••••••</p>
              ) : (
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              {!editMode ? (
                <p className="mt-1 text-lg text-gray-900">
                  {profile.phone_number}
                </p>
              ) : (
                <input
                  type="text"
                  name="phone_number"
                  value={profile.phone_number}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              {!editMode ? (
                <p className="mt-1 text-lg text-gray-900">
                  {profile.date_of_birth
                    ? new Date(profile.date_of_birth).toLocaleDateString()
                    : "N/A"}
                </p>
              ) : (
                <input
                  type="date"
                  name="date_of_birth"
                  value={
                    profile.date_of_birth
                      ? profile.date_of_birth.toISOString().substr(0, 10)
                      : ""
                  }
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              {!editMode ? (
                <p className="mt-1 text-lg text-gray-900">{profile.gender}</p>
              ) : (
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Education Level
              </label>
              {!editMode ? (
                <p className="mt-1 text-lg text-gray-900">
                  {profile.current_education_level}
                </p>
              ) : (
                <input
                  type="text"
                  name="current_education_level"
                  value={profile.current_education_level}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              {!editMode ? (
                <a
                  href={`https://www.linkedin.com/in/${profile.linkedin_link}`}
                  className="mt-1 text-lg text-blue-600 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin
                    className="mr-2 text-blue-600 rounded-full bg-gray-100 p-1"
                    size={32}
                  />
                  {profile.linkedin_link}
                </a>
              ) : (
                <input
                  type="text"
                  name="linkedin_link"
                  value={profile.linkedin_link}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Website
              </label>
              {!editMode ? (
                <a
                  href={profile.website}
                  className="mt-1 text-lg text-blue-600 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGlobe
                    className="mr-2 text-blue-600 rounded-full bg-gray-100 p-1"
                    size={32}
                  />
                  {profile.website}
                </a>
              ) : (
                <input
                  type="text"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                User Role
              </label>
              {!editMode ? (
                <p className="mt-1 text-lg text-gray-900">{profile.role}</p>
              ) : (
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            </div>
          </div>
          {editMode && (
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                className="bg-gold text-white hover:bg-mutedGold px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
