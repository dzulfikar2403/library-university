import { getUserPending } from "@/action/user";
import TableAccoutReq from "@/components/admin/TableAccoutReq";

const page = async () => {
    const {data,success,caching} = await getUserPending();
    
  return (
    <TableAccoutReq user={data as User[]} />
  );
};

export default page;
