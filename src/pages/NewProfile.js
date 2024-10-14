import React from "react";
import { FaLinkedin, FaGlobe } from "react-icons/fa";

const mockProfile = {
  imageUrl: "",
  name: "Jane Smith",
  email: "janesmith@example.com",
  university: "ABC University",
  department: "Engineering",
  gpa: "3.9",
  certificates: 8,
  courses: 12,
  events: 5,
  achievements: 10,
};

const ProfileComponent = () => {
  const profile = mockProfile; // Replace with actual fetched data

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row">
        {/* Left Side - Profile Details */}
        <div className="md:w-1/3 flex flex-col items-center md:items-start">
          <img
            src={profile.imageUrl || "/default-profile.png"}
            alt={`${profile.name}'s Profile`}
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
          <p className="text-gray-600 mt-2">
            <strong>University:</strong> {profile.university}
          </p>
          <p className="text-gray-600">
            <strong>Department:</strong> {profile.department}
          </p>
          <p className="text-gray-600">
            <strong>GPA:</strong> {profile.gpa}
          </p>
          {/* LinkedIn and Website Links */}
          <div className="flex mt-4 space-x-4">
            {profile.linkedin_link && (
              <a href={profile.linkedin_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <FaLinkedin size={24} />
              </a>
            )}
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
                <FaGlobe size={24} />
              </a>
            )}
          </div>
        </div>

        {/* Right Side - Achievements */}
        <div className="md:w-2/3 mt-6 md:mt-0 md:ml-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Certificate Count */}
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-3xl font-bold text-gold">{profile.certificates}</p>
              <p className="text-gray-700 mt-2">Certificates</p>
            </div>
            {/* Courses Count */}
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-3xl font-bold text-gold">{profile.courses}</p>
              <p className="text-gray-700 mt-2">Courses</p>
            </div>
            {/* Events Count */}
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-3xl font-bold text-gold">{profile.events}</p>
              <p className="text-gray-700 mt-2">Events</p>
            </div>
            {/* Achievements Count */}
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-3xl font-bold text-gold">{profile.achievements}</p>
              <p className="text-gray-700 mt-2">Achievements</p>
            </div>
            {/* Add more achievement cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
