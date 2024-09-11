import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const StudentReportList = () => {
  const [reports, setReports] = useState([]);
  console.log("reports: ", reports)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/studentReports`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }

        const data = await response.json();
        setReports(data.studentReports);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-darkGray">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-darkRed">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mb-11">
      <h1 className="text-3xl font-bold mb-6 text-darkMaroon">Your Reports</h1>
      {reports.length === 0 ? (
        <p className="text-mediumGray">No reports found.</p>
      ) : (
        <ul className="space-y-8">
          {reports.map((report) => (
            <li
              key={report._id}
              className="p-6 border border-lightGray rounded-md shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-center text-gold mb-4">
                {report.title}
              </h2>
              <div className="text-mediumGray space-y-6">
                <div className="border-b border-lightGray pb-4 mb-4">
                  <p>
                    <strong className="text-darkGray">Date:</strong>{" "}
                    {new Date(report.date_of_report).toLocaleDateString()}
                  </p>
                </div>

                <div className="border-b border-lightGray pb-4 mb-4">
                  <h3 className="text-xl font-semibold text-darkGray mb-2">Course</h3>
                  <p>
                    <strong className="text-darkGray">Title:</strong>{" "}
                    {report.courseId?.title || "N/A"}
                  </p>
                  <p>
                    <strong className="text-darkGray">Description:</strong>{" "}
                    {report.courseId?.description || "N/A"}
                  </p>
                  <p>
                    <strong className="text-darkGray">Image:</strong>{" "}
                    {report.courseId?.course_image ? (
                      <img src={report.courseId.course_image} alt="Course" />
                    ) : (
                      "N/A"
                    )}
                  </p>
                </div>

                <div className="border-b border-lightGray pb-4 mb-4">
                  <h3 className="text-xl font-semibold text-darkGray mb-2">Note</h3>
                  <p>
                    <strong className="text-darkGray">Title:</strong>{" "}
                    {report.noteId?.title || "N/A"}
                  </p>
                  <p>
                    <strong className="text-darkGray">Description:</strong>{" "}
                    {report.noteId?.description || "N/A"}
                  </p>
                </div>

                <div className="border-b border-lightGray pb-4 mb-4">
                  <h3 className="text-xl font-semibold text-darkGray mb-2">Difficulty</h3>
                  <p>
                    <strong className="text-darkGray">Title:</strong>{" "}
                    {report.difficultiesId?.title || "N/A"}
                  </p>
                  <p>
                    <strong className="text-darkGray">Description:</strong>{" "}
                    {report.difficultiesId?.description || "N/A"}
                  </p>
                </div>

                <div className="border-b border-lightGray pb-4 mb-4">
                  <h3 className="text-xl font-semibold text-darkGray mb-2">Achievement</h3>
                  <p>
                    <strong className="text-darkGray">Title:</strong>{" "}
                    {report.userAchievementId?.title || "N/A"}
                  </p>
                  <p>
                    <strong className="text-darkGray">Description:</strong>{" "}
                    {report.userAchievementId?.description || "N/A"}
                  </p>
                  <p>
                    <strong className="text-darkGray">Image:</strong>{" "}
                    {report.userAchievementId?.achievement_image ? (
                      <img
                        src={report.userAchievementId.achievement_image}
                        alt="Achievement"
                      />
                    ) : (
                      "N/A"
                    )}
                  </p>
                  <p>
                    <strong className="text-darkGray">Category:</strong>{" "}
                    {report.userAchievementId?.category || "N/A"}
                  </p>
                </div>

                <div className="border-b border-lightGray pb-4 mb-4">
                  <h3 className="text-xl font-semibold text-darkGray mb-2">Event</h3>
                  <p>
                    <strong className="text-darkGray">Title:</strong>{" "}
                    {report.eventId?.title || "N/A"}
                  </p>
                  <p>
                    <strong className="text-darkGray">Description:</strong>{" "}
                    {report.eventId?.description || "N/A"}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-darkGray mb-2">Certificate</h3>
                  <p>
                    <strong className="text-darkGray">Title:</strong>{" "}
                    {report.certificateId?.title || "N/A"}
                  </p>
                  <p>
                    <strong className="text-darkGray">Description:</strong>{" "}
                    {report.certificateId?.description || "N/A"}
                  </p>
                  <p>
                    <strong className="text-darkGray">Image:</strong>{" "}
                    {report.certificateId?.certificate_image ? (
                      <img
                        src={report.certificateId.certificate_image}
                        alt="Certificate"
                      />
                    ) : (
                      "N/A"
                    )}
                  </p>
                  <p>
                    <strong className="text-darkGray">Link:</strong>{" "}
                    {report.certificateId?.certificate_link ? (
                      <a
                        href={report.certificateId.certificate_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        {report.certificateId.certificate_link}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentReportList;
