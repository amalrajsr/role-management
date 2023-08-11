import { useState } from "react";
import { addRole } from "../../api/admin";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

function AddRole() {
  const token = localStorage.getItem('admin')
  const [role, setRole] = useState({
    name: "",
    permission: { add: false, edit: false, delete: false },
  });
  const [loader, setLoader] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (role.name.trim().length && role.permission.add) ||
      role.permission.edit ||
      role.permission.delete
    ) {
      setLoader(true);
      addRole(role)
        .then((res) => {
          if (res.data.success) {
            setRole({
              name: "",
              permission: { add: false, edit: false, delete: false },
            });
            toast.success("successfully added");
          }
        })
        .catch((error) => {
          toast.error(error.response.data.error.message);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };
  return token? (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Role
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={role.name}
          onChange={(e) => setRole({ ...role, name: e.target.value })}
          className="mt-1 p-2 w-full border focus:outline-none rounded-md focus:ring-gray-500 focus:border-gray-400"
        />
      </div>
      <div className="mb-4">
        <div className="mt-1 space-y-2 flex justify-between">
          <label className="flex items-center">
            <input
              onChange={() =>
                setRole({
                  ...role,
                  permission: { ...role.permission, add: !role.permission.add },
                })
              }
              type="checkbox"
              className="form-checkbox text-indigo-600 h-5 w-5"
            />
            <span className="ml-2 text-gray-700">Add</span>
          </label>
          <label className="flex items-center">
            <input
              onChange={() =>
                setRole({
                  ...role,
                  permission: {
                    ...role.permission,
                    edit: !role.permission.edit,
                  },
                })
              }
              type="checkbox"
              className="form-checkbox text-indigo-600 h-5 w-5"
            />
            <span className="ml-2 text-gray-700">Edit</span>
          </label>
          <label className="flex items-center">
            <input
              onChange={() =>
                setRole({
                  ...role,
                  permission: {
                    ...role.permission,
                    delete: !role.permission.delete,
                  },
                })
              }
              type="checkbox"
              className="form-checkbox text-indigo-600 h-5 w-5"
            />
            <span className="ml-2 text-gray-700">Delete</span>
          </label>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loader}
          className="bg-gray-400 text-white py-1 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          {loader ? "Loading" : "Submit"}
        </button>
      </div>
    </form>
  ) : <Navigate to={'/admin/login'}/>
}

export default AddRole;
