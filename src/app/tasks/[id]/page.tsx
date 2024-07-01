import EditForm from "@/components/EditForm";
import { getTask } from "@/utils/actions";
import Link from "next/link";

const SingleTaskPage = async ({params}: any) => {
  const task = await getTask(params.id);
  return (
    <>
      <div className="mb-16">
        <Link href='/tasks' className='btn btn-accent'>
          back to tasks
        </Link>
        <EditForm task={task} />
      </div>
    </>
  );
}

export default SingleTaskPage;