import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";
import { RootState } from "@/redux/store";
import { deleteRequest, getRequest, postRequest } from "@/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "./../../utils/withAuth";

export interface Job {
  _id?: string;
  createdBy?: string;
  company: string;
  position: string;
  status: "interview" | "declined" | "pending";
}

interface Props {
  initialJobs: Job[];
}

const JobsPage: React.FC<Props> = ({ initialJobs }) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [error, setError] = useState<string>("");
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const dispatch = useDispatch();
  const router = useRouter();

  const deleteJob = async (jobId: string) => {
    const response = await deleteRequest(`/api/jobs/${jobId}`);

    if (response.error) {
      setError("Error deleting job: " + response.error);
    } else {
      getRequest("/api/jobs").then((response) => {
        setJobs(response.data);
      });
    }
  };

  const createJob = async (newJob: Job) => {
    postRequest("/api/jobs", newJob)
      .then((res) => {
        getRequest("/api/jobs").then((response) => {
          setJobs(response.data);
        });
      })
      .catch((error) => {});
  };

  const editJob = async (editedJob: Job) => {
    router.push(`/jobs/${editedJob._id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl lg:text-4xl md:text-3xl font-bold mb-4 flex items-center">
        Job Listings
        <span
          onClick={() => {
            // Handle the click event
            router.push("/jobs/new");
          }}
          className="ml-auto inline-block rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm cursor-pointer hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          New Jobs
        </span>
      </h1>
      {jobs.length === 0 ? (
        <div>
          <p>Job Not Found</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job._id} className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{job.company}</h3>
              <p>{job.position}</p>
              <p>Status: {job.status}</p>
              <div className="flex justify-end">
              <button  className="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100" onClick={() => editJob(job)}>Edit</button>
              <button        className="rounded bg-white px-2 py-1 text-sm font-semibold text-red-600 shadow-sm hover:bg-indigo-100" onClick={() => deleteJob(job._id!)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    await dbConnect();
    /* find all the data in our database */
    const result = await Job.find({});

    return {
      props: { initialJobs: JSON.parse(JSON.stringify(result)) },
    };
  } catch (error) {
    return {
      props: { initialJobs: [] },
    };
  }
}

const JobsPageWithAuth = withAuth(JobsPage);

export default JobsPageWithAuth;
