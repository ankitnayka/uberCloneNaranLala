import { useState, useContext, useEffect } from "react";
import { Pencil, Check } from "lucide-react";
import { UserDataContext } from "../context/UserContext";
import { CaptainDataContext } from "../context/CapatainContext";
import axios from "axios";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useContext(UserDataContext);
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const [formData, setFormData] = useState({
    firstname: user?.fullname?.firstname || captain?.fullname?.firstname || "",
    lastname: user?.fullname?.lastname || captain?.fullname?.lastname || "",
    email: user?.email || captain?.email || "",
    vehicle: captain?.vehicle || { color: "", plate: "", capacity: "", vehicleType: "" },
  });

  useEffect(() => {
    setFormData({
      firstname: user?.fullname?.firstname || captain?.fullname?.firstname || "",
      lastname: user?.fullname?.lastname || captain?.fullname?.lastname || "",
      email: user?.email || captain?.email || "",
      vehicle: captain?.vehicle || { color: "", plate: "", capacity: "", vehicleType: "" },
    });
    console.log("captain",formData);
  }, [user, captain]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(["color", "plate", "capacity", "vehicleType"].includes(name)){
      setFormData((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [name]: value,
        },
      }));
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleaChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => {
      // Check if the field belongs to "vehicle"
      if (["color", "plate", "capacity", "vehicleType"].includes(name)) {
        return {
          ...prev,
          vehicle: {
            ...prev.vehicle,
            [name]: value, // Update the specific vehicle field
          },
        };
      } else {
        return { ...prev, [name]: value }; // Update normal fields
      }
    });
  };
  

  const handleSubmit = async () => {
    try {
      const endpoint = user ? "users" : "captains";
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/${endpoint}/profile`,
        {
          fullname: {
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
          email: formData.email,
          vehicle: formData.vehicle,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (user) {
        setUser(response.data.user);
      } else {
        setCaptain(response.data.captain);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto my-20 shadow-lg rounded-2xl bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <button
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          onClick={() => {
            if (isEditing) {
              handleSubmit();
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? <Check className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
        {captain && (
          <>
            <div>
              <label className="block text-sm font-medium">Vehicle Color</label>
              <input
                type="text"
                name="color"
                value={formData.vehicle.color}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Vehicle Plate</label>
              <input
                type="text"
                name="plate"
                value={formData.vehicle.plate}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Vehicle Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.vehicle.capacity}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Vehicle Type</label>
              <input
                type="text"
                name="vehicleType"
                value={formData.vehicle.vehicleType}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
