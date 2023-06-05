// Below are the hook imports and the apiClient import.
import React, { useState } from "react";
import apiClient from "./apiClient";

//Below is the function component that renders a form for users to input details of a project.
function InputForm({ onProjectAdded }) {
  //State variable for the new project data is declared.
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    URL: "",
  });

  //The function for handleChange updates the projectData state based on the input field name and value.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  //Below the handleSubmit button uses the post method to post the new project data to the back end and then rerenders the list of web projects in the objects array.
  const handleSubmit = async (event) => {
    event.preventDefault();
    await apiClient.post("/api", projectData);
    onProjectAdded();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        {/* Input field for the title of the new project. */}
        <input name="title" value={projectData.title} onChange={handleChange} />
        <label>Description:</label>
        {/* Input field for the description of the new project. */}
        <input
          name="description"
          value={projectData.description}
          onChange={handleChange}
        />
        <label>URL:</label>
        {/* Input field for the URL of the new project. */}
        <input name="URL" value={projectData.URL} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default InputForm;
