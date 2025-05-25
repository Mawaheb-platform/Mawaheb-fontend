import React from "react";

const StudentDetails = ({ user, category }) => {
  if (!user || !category) return null;

  const renderCategoryDetails = () => {
    switch (category) {
      case "reports":
        return user.reports?.length > 0 ? (
          <ul>
            {user.reports.map((report, index) => (
              <li key={index}>{report.title}</li>
            ))}
          </ul>
        ) : (
          <p>No reports available</p>
        );
      case "tickets":
        return user.tickets?.length > 0 ? (
          <ul>
            {user.tickets.map((ticket, index) => (
              <li key={index}>{ticket.title}</li>
            ))}
          </ul>
        ) : (
          <p>No tickets available</p>
        );
      case "certificates":
        return user.certificates?.length > 0 ? (
          <ul>
            {user.certificates.map((certificate, index) => (
              <li key={index}>{certificate.title}</li>
            ))}
          </ul>
        ) : (
          <p>No certificates available</p>
        );
      case "financialReports":
        return user.financialReports?.length > 0 ? (
          <ul>
            {user.financialReports.map((report, index) => (
              <li key={index}>{report.title}</li>
            ))}
          </ul>
        ) : (
          <p>No financial reports available</p>
        );
      case "userAchievements":
        return user.achievements?.length > 0 ? (
          <ul>
            {user.achievements.map((achievement, index) => (
              <li key={index}>{achievement.title}</li>
            ))}
          </ul>
        ) : (
          <p>No achievements available</p>
        );
      case "courses":
        return user.courses?.length > 0 ? (
          <ul>
            {user.courses.map((course, index) => (
              <li key={index}>{course.title}</li>
            ))}
          </ul>
        ) : (
          <p>No courses available</p>
        );
      default:
        return <p>No details available</p>;
    }
  };

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Details for {user.name}</h2>
      {renderCategoryDetails()}
    </div>
  );
};

export default StudentDetails;
