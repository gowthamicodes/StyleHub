import { FiTrash2 } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/auth-context";

interface User {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";

}

const AdminUsers = () => {

    const { token } = useContext(AuthContext);

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const response = await fetch(
                    "https://stylehub-backend-pq06.onrender.com/api/users",

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Could not fetch users"
                    );
                }
                setUsers(data.users);
            } catch (error) {
                console.error(error);
                setError(
                    error instanceof Error
                        ? error.message
                        : "Could not load users"
                );
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, [token])

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

const handleDeleteUser = async (userId: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmed) return;

  try {
    const response = await fetch(
      `https://stylehub-backend-pq06.onrender.com/api/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Could not delete user"
      );
    }

    setUsers((previousUsers) =>
      previousUsers.filter((user) => user._id !== userId)
    );

    alert("User deleted successfully!");
  } catch (error) {
    console.error(error);

    alert(
      error instanceof Error
        ? error.message
        : "Could not delete user"
    );
  }
};

    // const users = [
    //     {
    //         id: 1,
    //         name: "Gowthami",
    //         email: "gowthami@gmail.com",
    //         role: "user",
    //     },
    //     {
    //         id: 2,
    //         name: "Sajan",
    //         email: "sajan@gmail.com",
    //         role: "user",
    //     }

    // ]

    return (
        <div className="admin-users">
            <div className="admin-users-header">

                <h1>Users</h1>

            </div>
            <div className="admin-users-list">
                {users.length > 0 ? users.map((user) => (
                    <div key={user._id} className="admin-user">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.role}</p>
  <button
    type="button"
    className="delete-user-button"
    onClick={() => handleDeleteUser(user._id)}
  >
    <FiTrash2 />
    Delete
  </button>

                    </div>
                )) : <p>No users available yet.</p>}

            </div>
        </div>
    )
}

export default AdminUsers;