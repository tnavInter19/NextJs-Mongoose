import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getRequest, postRequest, deleteRequest, putRequest } from "@/utils/api"; // Add necessary request functions for API operations
import Loading from "@/components/loading";

export interface Job {
  _id?: string;
  company: string;
  position: string;
  status: 'interview' | 'declined' | 'pending';
}

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string>('');
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const authToken = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    fetchJobs();
  }, []); // Run fetchJobs only once when the component mounts

  const fetchJobs = async () => {
    const response = await getRequest("/api/jobs", isLoggedIn, authToken!);
    if (response.error) {
      setError('Error fetching jobs: ' + response.error);
    } else {
      setJobs(response.data);
    }
  };

  const deleteJob = async (jobId: string) => {
    const response = await deleteRequest(`/api/jobs/${jobId}`, isLoggedIn, authToken!);
    if (response.error) {
      setError('Error deleting job: ' + response.error);
    } else {
      // Remove the deleted job from the state
      setJobs(jobs.filter((job) => job._id !== jobId));
    }
  };

  const createJob = async (newJob: Job) => {
  postRequest("/api/jobs", newJob, isLoggedIn, authToken!).then((res) => {
     console.log("Response Data:", res);
   })
   .catch((error) => {
    console.log(error.message)

   });
  };

  const editJob = async (editedJob: Job) => {
    const response = await putRequest(`/api/jobs/${editedJob._id}`, editedJob, isLoggedIn, authToken!);
    if (response.error) {
      setError('Error editing job: ' + response.error);
    } else {
      // Update the job in the state
      setJobs(jobs.map((job) => (job._id === editedJob._id ? response.data : job)));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Job Listings</h1>
      {error ? (
        <p>{error}</p>
      ) : jobs.length === 0 ? (
        <Loading />
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job._id} className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{job.company}</h3>
              <p>{job.position}</p>
              <p>Status: {job.status}</p>
              <button onClick={() => editJob(job)}>Edit</button>
              <button onClick={() => deleteJob(job._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <div>
        {/* Form to create a new job */}
        <h2>Create New Job</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const newJob: Job = {
            company: formData.get("company") as string,
            position: formData.get("position") as string,
            status: formData.get("status") as 'interview' | 'declined' | 'pending',
          };
          createJob(newJob);
        }}>
          <input type="text" name="company" placeholder="Company" required />
          <input type="text" name="position" placeholder="Position" required />
          <select name="status" required>
            <option value="interview">Interview</option>
            <option value="declined">Declined</option>
            <option value="pending">Pending</option>
          </select>
          <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default JobsPage;
