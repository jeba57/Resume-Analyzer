import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE from "../api";

function EditProfile() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post(
        `${API_BASE}/api/upload/profile-picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = {
        ...userInfo,
        profilePicture: data.profilePicture,
      };

      localStorage.setItem("userInfo", JSON.stringify(updatedUser));

     alert("Profile picture updated successfully!");

setTimeout(() => {
  navigate("/");
}, 1000);

    } catch (error) {
      console.log(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

        <h1 className="text-3xl font-bold mb-6">
          Edit Profile Picture
        </h1>

        <div className="flex flex-col items-center gap-4">

          <img
            src={
              preview ||
              userInfo?.profilePicture ||
              `https://api.dicebear.com/7.x/adventurer/svg?seed=${userInfo?.name}`
            }
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border"
          />

          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg transition-all duration-200 border border-gray-200">

  Choose Profile Picture

  <input
    type="file"
    accept="image/*"
    onChange={handleImage}
    className="hidden"
  />
</label>
          <button
            onClick={uploadImage}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
          >
            {loading ? "Uploading..." : "Save Profile Picture"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default EditProfile;