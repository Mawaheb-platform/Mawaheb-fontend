import { useEffect, useState } from "react";
import CommonSection from "./CommonSection";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Profile = () => {
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState();

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
        setProfile(userData);
        console.log("this is data: ", userData);
        // setStatistics(userData.statistics);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error(error.message);
      } finally {
        // setLoading(false);
      }
    };
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <CommonSection profile={profile} />

        {profile?.user?.role === "Employee" && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Employment Details
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Job Title:</span>{" "}
                {profile.job_title}
              </p>
            </div>
          </div>
        )}

        {profile?.user?.role === "Institute Student" && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Education Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Talent:</span> {profile.talent}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Parent Phone:</span>{" "}
                  {profile.parent_phone}
                </p>
              </div>
            </div>
          </div>
        )}

        {profile?.user?.role === "Scholarship Student" && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Scholarship Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">University:</span>{" "}
                  {profile.university?.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Program:</span>{" "}
                  {profile.program_of_study}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Enrollment Year:</span>{" "}
                  {profile.enrollment_year}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Graduation Year:</span>{" "}
                  {profile.expected_graduation_year}
                </p>
              </div>
            </div>
          </div>
        )}

        {profile?.user?.role === "Admin" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Administrator Tools
            </h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              To use All Admin Properties Click to forward to admin dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
