// import React from 'react'

// const App = () => {
//   const name = 'React'
//   const x = 10
//   const y = 20

//   const options = ['A', 'B', 'C']

//   const condition = false
//   const condition2 = true

//   const styles = {
//     color: 'red',
//     fontSize: '50px'
//   }

//   return (
//     <div>
//       <div classNameName='text-5xl' style={{ color: 'red', fontSize: '24px' }}>Hello {name}</div>
//       <div style={styles}>the sum of {x} and {y} is {x + y}</div>
//       <div>
//         {
//           options.map((option, index) => (
//             <div key={index}>{option}</div>
//           ))
//         }
//       </div>
//       {condition ? <div>true</div> : <div>false</div>}
//       {condition2 && <div>true</div>}
//     </div>
//   )
// }

// export default App

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  // add job function
  const addJob = async (jobData) => {
    const response = fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });

    return response;
  };

  // delete job function
  const deleteJob = async (jobId) => {
    const response = fetch(`/api/jobs/${jobId}`, {
      method: "DELETE",
    });

    return response;
  };

  // update job function
  const updateJob = async (jobData) => {
    const response = fetch(`/api/jobs/${jobData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });

    return response;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
