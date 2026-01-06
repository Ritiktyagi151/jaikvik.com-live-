import { useState, useEffect } from "react";
import axios from "axios";
import ReelTable from "./ReelTable";
import ReelForm from "./ReelForm";
import type { Reel, ReelFormData } from "./reel";

const API_URL = "http://localhost:5000/api/reels";

const ReelsDashboard = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [editingReel, setEditingReel] = useState<Reel | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Reels on Load
  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      // MongoDB _id ko frontend ki id field mein map kar rahe hain
      const formattedData = response.data.map((r: any) => ({
        ...r,
        id: r._id,
      }));
      setReels(formattedData);
    } catch (error) {
      console.error("Error fetching reels:", error);
      alert("Failed to load reels");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Create (POST)
  const handleCreate = async (formData: ReelFormData) => {
    try {
      const response = await axios.post(API_URL, formData);
      const newReel = { ...response.data, id: response.data._id };
      setReels([newReel, ...reels]);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating reel:", error);
      alert("Error saving reel");
    }
  };

  // 3. Handle Update (PUT)
  const handleUpdate = async (id: string, formData: ReelFormData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData);
      const updatedReel = { ...response.data, id: response.data._id };
      setReels(reels.map((reel) => (reel.id === id ? updatedReel : reel)));
      setEditingReel(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error updating reel:", error);
      alert("Error updating reel");
    }
  };

  // 4. Handle Delete (DELETE)
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this reel?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setReels(reels.filter((reel) => reel.id !== id));
      } catch (error) {
        console.error("Error deleting reel:", error);
        alert("Error deleting reel");
      }
    }
  };

  const handleEdit = (reel: Reel) => {
    setEditingReel(reel);
    setShowForm(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) setEditingReel(null);
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-red-500">Reels Dashboard</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="text-xl">
            Total Reels:{" "}
            <span className="text-red-500 font-bold">
              {loading ? "..." : reels.length}
            </span>
          </div>
          <button
            onClick={toggleForm}
            className={`flex items-center gap-2 px-6 py-3 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${
              showForm
                ? "bg-gray-600 hover:bg-gray-700 shadow-gray-900/30"
                : "bg-red-600 hover:bg-red-700 shadow-red-900/30"
            }`}
          >
            {/* SVG Icon Logic Same as before */}
            {showForm ? "Cancel" : "Add New Reel"}
          </button>
        </div>

        {(showForm || editingReel) && (
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 mb-8 border border-red-500">
            <h2 className="text-xl font-semibold mb-4 text-red-500">
              {editingReel ? "Edit Reel" : "Add New Reel"}
            </h2>
            <ReelForm
              onSubmit={
                editingReel
                  ? (data) => handleUpdate(editingReel.id, data)
                  : handleCreate
              }
              initialData={editingReel || undefined}
              onCancel={() => {
                setEditingReel(null);
                setShowForm(false);
              }}
            />
          </div>
        )}

        <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-500">Manage Reels</h2>
          {loading ? (
            <div className="text-center py-10">Loading Reels...</div>
          ) : (
            <ReelTable
              reels={reels}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReelsDashboard;