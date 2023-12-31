import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";
import { putRequest } from "@/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export interface Job {
 _id?: string;
  createdBy?: string;
  company: string;
  position: string;
  status: "interview" | "declined" | "pending";
}

interface Props {
  initialJobs: Job;
}

const JobsPage: React.FC<Props> = ({ initialJobs }) => {
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [error, setError] = useState<string>("");
  const [newJob, setNewJob] = useState<Job>(
    initialJobs
  );
  const editJob = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
    const response = await putRequest(`/api/jobs/${initialJobs._id}`, newJob);
    if (response.error) {
      setError("Error editing job: " + response.error);
    } else {
     router.push(`/jobs`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Job Listings</h1>
      <div>
        <h2>Edit Job</h2>
        <form onSubmit={editJob}>
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={newJob.position}
            onChange={(e) => setNewJob({ ...newJob, position: e.target.value })}
            required
          />
          <select
            name="status"
            value={newJob.status}
            onChange={(e) =>
              setNewJob({
                ...newJob,
                status: e.target.value as "interview" | "declined" | "pending",
              })
            }
            required
          >
            <option value="interview">Interview</option>
            <option value="declined">Declined</option>
            <option value="pending">Pending</option>
          </select>
          <button type="submit">Edit Job</button>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: { jobid: string }; // Define the type for params
}) {
  try {
    await dbConnect();
    /* find all the data in our database */
    const result = await Job.findById(params.jobid);

    return {
      props: { initialJobs: JSON.parse(JSON.stringify(result)) },
    };
  } catch (error) {

    return {
      props: { initialJobs: null },
    };
  }
}

export default JobsPage;
