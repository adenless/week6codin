import React, { useEffect } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

// Utility to check if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Protected route wrapper
const ProtectedRoute = ({ element, redirectTo }) => {
  return isAuthenticated() ? element : <Redirect to={redirectTo} />;
};

const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token in request headers
      },
      body: JSON.stringify(newJob),
    });
    return res.json();
  };

  // Delete Job
  const deleteJob = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`, // Include token in request headers
      },
    });
    return res.json();
  };

  // Update Job
  const updateJob = async (job) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token in request headers
      },
      body: JSON.stringify(job),
    });
    return res.json();
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/add-job"
          element={<ProtectedRoute element={<AddJobPage addJobSubmit={addJob} />} redirectTo="/login" />}
        />
        <Route
          path="/edit-job/:id"
          element={<ProtectedRoute element={<EditJobPage updateJobSubmit={updateJob} />} redirectTo="/login" />}
          loader={jobLoader}
        />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
