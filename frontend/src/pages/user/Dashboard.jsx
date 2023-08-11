import { useEffect, useState } from "react";
import { deleteUser, getCurrentUser, getUsers } from "../../api/user";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [reload,setReload]=useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    setLoader(true);
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

  }, [reload]);

  useEffect(()=>{
    getCurrentUser()
    .then((res) => {
      if (res.data.result) {
        setCurrentUser(res.data.result);
      }
    })
    .catch((err) => {});
  },[])

  const editUser = (user) => {
    navigate("/editUser", { state: { user } });
  };

  const deleteUserAccount = (userId) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "delete",
    }).then((result) => {
      if(result.isConfirmed){
      deleteUser(userId)
        .then((res) => {
          console.log(res)
          if (res.data.success) {
            toast.success("successfully deleted");
            setReload(!reload)
          }
        })
        .catch((error) => {
          toast.error(error.response.data.error.message);
        });
      }
    });
  };
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-full h-full ">
      <div className="bg-gray-500 py-2 flex justify-between">
      <span className="text-2xl mx-3 text-gray-300 my-auto">
        Welcome back {currentUser?.name}
      </span>
        <div className="w-1/3 text-center">
        <button className="bg-gray-300  px-3 py-1 rounded" onClick={logout}>
          Logout
        </button>
        </div>
      </div>
      <div
        className={`flex 
          "justify-end"
        w-3/4 mx-auto my-4`}
      >
        {currentUser?.role.permission.add && (
          <Link to={"/addUser"} className="bg-gray-300 px-3 py-1 rounded">
            Add User
          </Link>
        )}
        
      </div>
      <table className="w-3/4 mx-auto  text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase w-full bg-gray-50  ">
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
            <th scope="col" className="text-lg md:px-4 py-3"></th>
            <th scope="col" className="text-lg md:px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="">
          {loader
            ? "loading"
            : users.length &&
              users.map((item) => {
                return (
                  <>
                    <tr
                      key={item._id}
                      className="bg-white border-b w-full "
                    >
                      <td className="md:px-4 py-4 hover:bg-gray-100">{item.name}</td>
                      <td className="md:px-4 py-4 hover:bg-gray-100">{item.email}</td>
                      <td className="md:px-4 py-4 hover:bg-gray-100">{item.role.name}</td>
                      {currentUser?.role.permission.edit && (
                        <td
                          className="md:px-4 py-4 hover:bg-gray-100"
                          onClick={() => editUser(item)}
                        >
                          <AiOutlineEdit className="text-xl " />
                        </td>
                      )}
                      {currentUser?.role.permission.delete && (
                        <td
                          className="md:px-4 py-4 hover:bg-gray-100"
                          onClick={() => deleteUserAccount(item._id)}
                        >
                          <AiOutlineDelete className="text-xl" />
                        </td>
                      )}
                      <td className="md:px-4 py-4">{}</td>
                    </tr>
                  </>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
