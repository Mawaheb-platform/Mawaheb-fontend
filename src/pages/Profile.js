import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import defaultProfileImage from "../assets/images/No-profile-pic.jpg";
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
        if (!response.ok) throw new Error("Failed to fetch profile.");
        const userData = await response.json();
        setProfile(userData.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [token]);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);

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
      if (!response.ok) throw new Error("Failed to update profile.");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleImageChange = (e) => setProfileImage(e.target.files[0]);

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
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </label>
          )}
          <div>
            <h2 className="text-4xl capitalize text-gold font-bold mt-4">
              {profile.name}
            </h2>
            <div className="mb-6">
              <p className="text-gray-600">{profile.email}</p>
              <p className="text-gray-600">{profile.role}</p>
            </div>
          </div>
          <div className="mt-4">
            {editMode ? (
              <button
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-gold hover:bg-lightGold text-white py-2 px-4 rounded"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="md:w-2/3 mt-4 md:mt-0 md:ml-8">
          <p className="text-lg text-gray-900 mb-4">{profile.bio}</p>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              "name",
              "password",
              "phone_number",
              "current_education_level",
              "linkedin_link",
              "website",
            ].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace("_", " ")}
                </label>
                {!editMode ? (
                  <p className="mt-1 text-lg text-gray-900">
                    {profile[field] || "N/A"}
                  </p>
                ) : (
                  <input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    value={profile[field]}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                )}
              </div>
            ))}
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
                  value={profile.date_of_birth?.substr(0, 10) || ""}
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
                <p className="mt-1 text-lg text-gray-900">
                  {profile.gender || "N/A"}
                </p>
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
            <div className="col-span-2 flex justify-end mt-4">
              {editMode && (
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                  Save Changes
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
