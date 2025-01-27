import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
// import { createStudent, updateStudent, fetchStudentById } from '../redux/studentActions';

const ScholarshipStudentForm = ({ studentId }) => {
    const dispatch = useDispatch();
    // const { student, loading, error } = useSelector(state => state.students);
    const [formData, setFormData] = useState({
        userId: '',
        country_of_studying: '',
        city: '',
        university: '',
        type_of_university: '',
        program_of_study: '',
        student_university_id: '',
        enrollment_year: '',
        expected_graduation_year: '',
    });

    useEffect(() => {
        if (studentId) {
            // dispatch(fetchStudentById(studentId));
        }
    }, [studentId, dispatch]);

    // useEffect(() => {
    //     if (student) {
    //         setFormData(student);
    //     }
    // }, [student]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (studentId) {
            // dispatch(updateStudent({ id: studentId, ...formData }));
        } else {
            // dispatch(createStudent(formData));
        }
    };

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
          {/* <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button> */}
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[80vh]">
            <div>
              <label className="block text-sm font-medium text-gray-700">University Name</label>
              <input
                type="text"
                name="university name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-gold focus:ring focus:ring-gold focus:ring-opacity-50"
              />
            </div>
            {/* Email - Read-Only */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Student ID</label>
              <input
                type="number"
                name="student_id"
                value={formData.email}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm cursor-not-allowed"
              />
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">University type</label>
              <input
                type="text"
                name="University_type"
                value={formData.password || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-gold focus:ring focus:ring-gold focus:ring-opacity-50"
              />
            </div>
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">GPA</label>
              <input
                type="number"
                name="gpa_grade"
                value={formData.phone_number}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-gold focus:ring focus:ring-gold focus:ring-opacity-50"
              />
            </div>
            {/* Save Changes Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gold hover:bg-mutedGold text-white py-2 px-4 rounded-md transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default ScholarshipStudentForm;
