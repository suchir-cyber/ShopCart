import { useState ,useEffect } from "react"
import { FaTrash ,FaEdit ,FaCheck ,FaTimes } from "react-icons/fa"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
import Message from "../../components/Message"
import { useGetUsersQuery, useDeleteUserMutation,useGetUserDetailsQuery,useUpdateUserMutation } from "../../redux/api/usersApiSlice"
import AdminMenu from "./AdminMenu"

const UserList = () => {
  const {data: users, refetch ,isLoading ,error} =useGetUsersQuery()
  const [deleteUser] =useDeleteUserMutation()

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure ?")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-semibold mb-4">Users</h1> */}
      {isLoading ? (<Loader />) : error ? (<Message  varient="danger">{error?.data.message || error.message}</Message>) : (
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {users.map( user=>(
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">
                    {editableUserId===user._id ? (
                      <div className="flex items-center">
                        <input type="text" value={editableUserName} onChange={e=>setEditableUserName(e.target.value)} className="w-full p-2 border rounded-lg"/>
                        <button onClick={()=>updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                          <FaCheck />

                        </button>
                      </div>
                    ):(
                      <div className="flex items-center">
                        {user.username}{" "}
                        <button onClick={()=>toggleEdit(user._id, user.username, user.email)}>
                          <FaEdit className="ml-[1rem] cursor-pointer" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editableUserId=== user._id ?(
                      <div className="flex items-center">
                        <input type="text" value={editableUserEmail} onChange={e=>setEditableUserEmail(e.target.value)} className="w-full p-2 border rounded-lg"/>
                        <button onClick={()=>updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                          <FaCheck />
                        </button>
                      </div>
                    ):(
                      <div className="flex item-center">
                        <p>{user.email}</p>
                        <button onClick={()=>toggleEdit(user._id,user.username,user.email)}>
                          <FaEdit className="ml-[1rem] cursor-pointer"/>
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{color:"green"}} />
                    ) :(
                      <FaTimes style={{color: "red"}} />
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button onClick={()=>deleteHandler(user._id)} className="bg-red-600 hover:bg-red-700 text-white cursor-pointer font-bold py-2 px-4 rounded">
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  )
}

export default UserList