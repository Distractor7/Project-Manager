import React, { useState, useEffect } from "react";
import apiClient from "./apiClient";
import InputForm from "./inputForm";
import "./App.css";

function App() {
  //Below are the state variables used to store the Web Projects.
  const [projects, setProjects] = useState([]);
  //Below are the state variables used to store the edited text content of Web Projects.
  const [editingProject, setEditingProject] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedURL, setEditedURL] = useState("");

  //Below is the async function that retrieves the information from the objects array at url and then populates projects hook with the response data.
  const fetchProjects = async () => {
    try {
      const response = await apiClient.get("/api");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  //Below a use effect hooks calls the fetchProjects function once upon page mounting to set the projects hook.
  useEffect(() => {
    fetchProjects();
  }, []);

  //Below a function is created to re-render the updated project list once a new project has been added.
  const handleProjectAdded = () => {
    fetchProjects();
  };

  //Below is the editing function for a project that sets the value of the hooks on line 10-13 to the new user entered text content
  const startEditing = (project) => {
    setEditingProject(project);
    setEditedTitle(project.title);
    setEditedDescription(project.description);
    setEditedURL(project.URL);
  };

  // The submitEdit function checks if a project is being edited, then calls the updateProject function to update the project with the new edited values.
  const submitEdit = async () => {
    if (editingProject) {
      await updateProject(editingProject.id, {
        title: editedTitle,
        description: editedDescription,
        URL: editedURL,
      });
      setEditingProject(null);
    }
  };

  // The updateProject function sends an HTTP PUT request with the updated data and refreshes the list of projects.
  const updateProject = async (id, updatedData) => {
    await apiClient.put(`/api/${id}`, updatedData);
    fetchProjects();
  };

  // The deleteProject function sends an HTTP DELETE request to delete a project and then refreshes the list of projects.
  const deleteProject = async (id) => {
    await apiClient.delete(`/api/${id}`);
    fetchProjects();
  };

  return (
    <div className="app">
      {/* Projects list heading */}
      <h1>Projects List:</h1>
      {/*Below is where the projects state variable gets mapped over and rendered in a particular way revealing the title,description and URL of the particular web project.*/}
      <ul>
        {projects.map((project) => (
          <li className="projects" key={project.id}>
            <strong>Title : </strong>
            {project.title}{" "}
            <strong>
              {" "}
              <br></br>
              <br></br> Description :{" "}
            </strong>
            {project.description}{" "}
            <strong>
              <br></br>
              <br></br>URL :{" "}
            </strong>
            <a href="">{project.URL}</a>
            {/* Below are the edit and delete buttons. */}
            {/* The edit button has the startEditing function passed as an onclick function.*/}
            <button onClick={() => startEditing(project)}>Edit</button>
            <button onClick={() => deleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* If editingProject state variable is not null, the form for editing a project is displayed. The form includes input forms for the title,
      description, and URL. There is also a Save and Cancel buttons. */}
      {editingProject && (
        <div>
          <h2>Edit Project</h2>
          {/* Input field for the new edited title information */}
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          {/* Input field for the new edited description information */}
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          {/* Input field for the new edited URL information */}
          <input
            type="text"
            value={editedURL}
            onChange={(e) => setEditedURL(e.target.value)}
          />
          <button onClick={submitEdit}>Save</button>
          <button onClick={() => setEditingProject(null)}>Cancel</button>
        </div>
      )}
      {/* Below the InputForm component is being rendered.  */}
      <h1>Add Project:</h1>
      <InputForm onProjectAdded={handleProjectAdded} />
    </div>
  );
}

export default App;
