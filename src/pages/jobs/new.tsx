import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";
import { RootState } from "@/redux/store";
import { postRequest } from "@/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

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

const JobsPage: React.FC<Props> = () => {
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [newJob, setNewJob] = useState<Job>({
    createdBy: userId as string,
    company: "",
    position: "",
    status: "pending",
  });

  const [error, setError] = useState<string>("");

  const createJob = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   
    postRequest("/api/jobs", newJob)
      .then((res) => {
        router.push(`/jobs`);
      })
      .catch((error) => {});
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Job Listings</h1>
      <div>
        {/* Form to create a new job */}
        <h2>Create New Job</h2>
        <form onSubmit={createJob}>
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
          <button type="submit">New Job</button>
        </form>
      </div>
    </div>
  );
};

export default JobsPage;
