import React from "react";

const UniversityInformation = () => {
  const [formData, setFormData] = React.useState({
    universityName: "",
    universityType: "Public",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/university`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("University information submitted successfully:", data);
      } else {
        console.error("Error submitting university information:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <h1>UniversityInformation</h1>
    </div>
  );
};

export default UniversityInformation;
