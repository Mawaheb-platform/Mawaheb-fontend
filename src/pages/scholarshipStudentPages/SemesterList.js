// src/components/SemestersList.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SemesterForm from "./SemesterForm";

const API_URL = process.env.REACT_APP_API_URL;

export default function SemestersList() {
  const token = useSelector((state) => state.auth.token);
  const [semesters, setSemesters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSemester, setEditingSemester] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      const response = await api.get("/semester/all");
      setSemesters(response.data);
    } catch (error) {
      console.error("Error fetching semesters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingSemester?._id) {
        await api.put(`/semester/${editingSemester._id}`, formData);
      } else {
        await api.post("/semester", formData);
      }
      fetchSemesters();
      setShowForm(false);
      setEditingSemester(null);
    } catch (error) {
      console.error("Error saving semester:", error);
    }
  };

  const deleteSemester = async (id) => {
    try {
      await api.delete(`/semester/${id}`);
      fetchSemesters();
    } catch (error) {
      console.error("Error deleting semester:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Semesters</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Semester
        </button>
      </div>

      {showForm && (
        <SemesterForm
          initialData={
            editingSemester || {
              semesterNumber: "",
              courses: [],
              resultImage: "",
            }
          }
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingSemester(null);
          }}
        />
      )}

      <div className="grid gap-6">
        {semesters.map((semester) => (
          <div key={semester._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">
                  Semester {semester.semesterNumber}
                </h2>
                <p className="text-gray-600">GPA: {semester.semesterGPA}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingSemester(semester);
                    setShowForm(true);
                  }}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSemester(semester._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Course Code</th>
                    <th className="px-4 py-2 text-left">Course Name</th>
                    <th className="px-4 py-2 text-left">Grade</th>
                    <th className="px-4 py-2 text-left">Credits</th>
                    <th className="px-4 py-2 text-left">ECTS</th>
                  </tr>
                </thead>
                <tbody>
                  {semester.courses.map((course) => (
                    <tr key={course.courseCode} className="border-t">
                      <td className="px-4 py-2">{course.courseCode}</td>
                      <td className="px-4 py-2">{course.courseName}</td>
                      <td className="px-4 py-2">{course.lg}</td>
                      <td className="px-4 py-2">{course.credits}</td>
                      <td className="px-4 py-2">{course.ects}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
