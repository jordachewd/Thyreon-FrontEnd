import PageHead from "@/components/shared/PageHead";
//import getUsers from "@/lib/actions/users/get-users";
//import { GetUserData } from "@/types/get-user-data.d";
/* 

import getCurrentUser from "@/lib/actions/users/get-current-user";
import getUserProfile from "@/lib/actions/users/get-user-profile";
import getUserById from "@/lib/actions/users/get-user-by-id"; 
import RouteTestUserButtons from "@/components/shared/RouteTestUserButtons";
*/

export default async function AdminDashboard() {
  // const users = (await getUsers()) as GetUserData[];
  // console.log("getUsers:", users);
  /*   

  const currentUser = (await getCurrentUser()) as GetUserData;
  console.log("getCurrentUser:", currentUser);

  const userProfile = await getUserProfile("wpguard");
  console.log("getUserProfile:", userProfile);

  const userById = await getUserById(3);
  console.log("getUserById:", userById); */

  return (
    <div className="flex flex-col w-full gap-6">
      <PageHead title="All Users" alignTitle="left" />

      {/*  <RouteTestUserButtons /> */}

      <p>
        Lorem ipsum dolor sit amet. Ea itaque natus cum ipsam eveniet aut
        blanditiis quis 33 illum eaque a voluptatem cupiditate et excepturi
        aperiam ea perferendis iure. Sit deleniti iusto et galisum modi eos
        repellendus officiis et enim deserunt. Qui voluptate optio ab iusto sint
        est inventore officiis. Et enim mollitia sed ducimus consequatur qui
        veniam modi vel amet modi! Aut consequuntur omnis id accusantium
        obcaecati cum velit saepe qui dolores cupiditate hic blanditiis
        similique. Sed dolor libero sit omnis veniam sed repellat omnis eos nisi
        temporibus est laudantium internos. Hic voluptatem cumque ad odio
        impedit et quisquam accusamus. Ut eveniet officia id officia impedit qui
        consequatur veritatis quo laboriosam sequi et rerum quibusdam ea
        accusamus molestiae quo explicabo ducimus.
      </p>
    </div>
  );
}
