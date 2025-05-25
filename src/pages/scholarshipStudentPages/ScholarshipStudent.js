import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const ScholarshipStudent = () => {
  const token = useSelector((state) => state.auth.token);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    country_of_studying: "",
    city: "",
    university: "",
    type_of_university: "",
    program_of_study: "",
    student_university_id: "",
    enrollment_year: "",
    expected_graduation_year: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/scholarship-student`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch students");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (editMode) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/scholarship-student/${currentStudentId}`,
          formData,
          config
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/scholarship-student`,
          formData,
          config
        );
      }

      fetchStudents();
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (student) => {
    setFormData({
      country_of_studying: student.country_of_studying,
      city: student.city,
      university: student.university,
      type_of_university: student.type_of_university,
      program_of_study: student.program_of_study,
      student_university_id: student.student_university_id,
      enrollment_year: student.enrollment_year,
      expected_graduation_year: student.expected_graduation_year,
    });
    setEditMode(true);
    setCurrentStudentId(student._id);
  };

  const resetForm = () => {
    setFormData({
      country_of_studying: "",
      city: "",
      university: "",
      type_of_university: "",
      program_of_study: "",
      student_university_id: "",
      enrollment_year: "",
      expected_graduation_year: "",
    });
    setEditMode(false);
    setCurrentStudentId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Scholarship Students Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country of Studying
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.country_of_studying}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  country_of_studying: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Add other form fields following the same pattern */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              University
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.university}
              onChange={(e) =>
                setFormData({ ...formData, university: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              University Type
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.type_of_university}
              onChange={(e) =>
                setFormData({ ...formData, type_of_university: e.target.value })
              }
              required
            >
              <option value="">Select Type</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Program of Study
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.program_of_study}
              onChange={(e) =>
                setFormData({ ...formData, program_of_study: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Student University ID
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.student_university_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  student_university_id: e.target.value,
                })
              }
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enrollment Year
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.enrollment_year}
              onChange={(e) =>
                setFormData({ ...formData, enrollment_year: e.target.value })
              }
              min="1900"
              max="2099"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Expected Graduation Year
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.expected_graduation_year}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  expected_graduation_year: e.target.value,
                })
              }
              min="1900"
              max="2099"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editMode ? "Update Record" : "Create Record"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Existing Records
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  University
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Enrollment Year
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {student.university}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {student.program_of_study}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {student.enrollment_year}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleEdit(student)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipStudent;
