// src/components/SemesterForm.jsx
import { useState, useEffect } from "react";

const SemesterForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    semesterNumber: "",
    courses: [],
    resultImage: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...formData.courses];
    updatedCourses[index][field] = value;
    setFormData({ ...formData, courses: updatedCourses });
  };

  const addNewCourse = () => {
    setFormData({
      ...formData,
      courses: [
        ...formData.courses,
        {
          courseCode: "",
          courseName: "",
          grade: 0,
          credits: 0,
          ects: 0,
          lg: "AA",
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {initialData?._id ? "Edit Semester" : "New Semester"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Semester Number
            </label>
            <input
              type="number"
              name="semesterNumber"
              value={formData.semesterNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {formData.courses.map((course, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">Course {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => {
                    const updatedCourses = [...formData.courses];
                    updatedCourses.splice(index, 1);
                    setFormData({ ...formData, courses: updatedCourses });
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    value={course.courseCode}
                    onChange={(e) =>
                      handleCourseChange(index, "courseCode", e.target.value)
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={course.courseName}
                    onChange={(e) =>
                      handleCourseChange(index, "courseName", e.target.value)
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Grade (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={course.grade}
                    onChange={(e) =>
                      handleCourseChange(index, "grade", e.target.value)
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Credits
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={course.credits}
                    onChange={(e) =>
                      handleCourseChange(index, "credits", e.target.value)
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">ECTS</label>
                  <input
                    type="number"
                    min="0"
                    value={course.ects}
                    onChange={(e) =>
                      handleCourseChange(index, "ects", e.target.value)
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Letter Grade
                  </label>
                  <select
                    value={course.lg}
                    onChange={(e) =>
                      handleCourseChange(index, "lg", e.target.value)
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  >
                    {["AA", "AB", "BA", "BB", "CB", "CC", "DC", "DD", "FF"].map(
                      (grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addNewCourse}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm"
          >
            Add Course
          </button>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Semester
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SemesterForm;
