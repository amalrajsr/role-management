import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../api/admin";
import Modal from "../../components/Modal";
import AddRole from "./AddRole";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  // modal handler
 const onOpenModal = () => setOpen(true);
 const onCloseModal= () => setOpen(false)
  useEffect(() => {
    getUsers()
      .then((res) => {
        if (res.data.result) {
          setUsers(res.data.result);
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoader(false);
      });
  }, []);
  console.log(users)
  return (
    <>
    <div className="w-full h-full">
      <h1 className="text-3xl w-3/4 mx-auto my-10 text-center">
        Admin Dashboard
      </h1>
      <div className="flex justify-between w-3/4 mx-auto my-4">
        <Link to={"/admin/addUser"} className="bg-gray-300 px-3 py-1 rounded">
          Add User
        </Link>
        <button className="bg-gray-300 px-3 py-1 rounded" onClick={onOpenModal}>Add Role</button>
      </div>
      <table className="w-3/4 mx-auto  text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="text-lg md:px-4 py-3">
              Name
            </th>
            <th scope="col" className="text-lg md:px-4 py-3">
              Email
            </th>
            <th scope="col" className="text-lg md:px-4 py-3">
              Role
            </th>
            <th scope="col" className="text-lg md:px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="w-full">
          {users.length &&
            users.map((item) => {
              return (
                <>
                  <tr key={item._id} className="bg-white border-b w-full hover:bg-gray-100">
                    <td className="md:px-4 py-4">{item.name}</td>
                    <td className="md:px-4 py-4">{item.email}</td>
                    <td className="md:px-4 py-4">
                      {item.role.name}
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
     <Modal open={open} onClose={onCloseModal} heading={'Add Role'}>
      <AddRole closeModal={onCloseModal}/>
     </Modal></>
  );
}

export default Dashboard;
