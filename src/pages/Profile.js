import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import defaultProfileImage from "../assets/images/No-profile-pic.jpg";
import { FaLinkedin, FaGlobe } from "react-icons/fa";
import EditProfileModal from "../components/common/EditProfileModal";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  console.log("this is profile data: ", profile)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);

// to visualize the style without calling backend we may use 
// useEffect(() => {
//   const mockProfile = {
//     imageUrl: "",
//     name: "Nasser Hussein",
//     email: "*****@example.com",
//     university: "ABC University",
//     department: "Engineering",
//     gpa: "3.9",
//     certificates: 8,
//     courses: 12,
//     events: 5,
//     achievements: 10,
//     bio: "Passionate about software development and open-source projects.",
//     phone_number: "123-456-7890",
//     date_of_birth: "1995-05-15",
//     gender: "Male",
//     current_education_level: "Nasser Hussein",
//     linkedin_link: "https://www.linkedin.com/in/nhussein2026",
//     website: "https://nhussein.io",
//     role: "Student",
//   };
//   setProfile(mockProfile);
//   setLoading(false);
// }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch profile.");
        const userData = await response.json();
        setProfile(userData.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const handleSaveProfile = async (updatedProfile) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });
      if (!response.ok) throw new Error("Failed to update profile.");
      const data = await response.json();
      setProfile(data.user);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">Failed to load profile information.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row">
        {/* Left Side - Profile Details */}
        <div className="md:w-1/3 flex flex-col items-center md:items-start">
          <img
            src={profile.imageUrl || defaultProfileImage}
            alt={`${profile.name}'s Profile`}
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
          <p className="text-gray-600 mt-2">
            <strong>Role:</strong> {profile.role || "N/A"}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>University:</strong> {profile.university || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Department:</strong> {profile.department || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>GPA:</strong> {profile.gpa || "N/A"}
          </p>
          {/* LinkedIn and Website Links */}
          <div className="flex mt-4 space-x-4">
            {profile.linkedin_link && (
              <a
                href={profile.linkedin_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaLinkedin size={24} />
              </a>
            )}
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800"
              >
                <FaGlobe size={24} />
              </a>
            )}
          </div>
          {/* Edit Profile Button */}
          <div className="mt-6">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="bg-gold hover:bg-mutedGold text-white py-2 px-4 rounded-md"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Right Side - Achievements */}
        <div className="md:w-2/3 mt-6 md:mt-0 md:ml-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Certificate Count */}
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-3xl font-bold text-gold">{profile.certificates || 0}</p>
              <p className="text-gray-700 mt-2">Certificates</p>
            </div>
            {/* Courses Count */}
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-3xl font-bold text-gold">{profile.courses || 0}</p>
              <p className="text-gray-700 mt-2">Courses</p>
            </div>
            {/* Events Count */}
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-3xl font-bold text-gold">{profile.events || 0}</p>
              <p className="text-gray-700 mt-2">Events</p>
            </div>
            {/* Achievements Count */}
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-3xl font-bold text-gold">{profile.achievements || 0}</p>
              <p className="text-gray-700 mt-2">Achievements</p>
            </div>
            {/* Add more achievement cards as needed */}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default ProfilePage;
