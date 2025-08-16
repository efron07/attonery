import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
}

export default function TeamEditor() {
  const [team, setTeam] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Dr. John Mwalimu",
      title: "Senior Partner & Managing Director",
      bio: "Specializes in mining law, corporate transactions, and international trade with over 15 years of experience.",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ]);
  const [newMember, setNew] = useState({ name: "", title: "", bio: "", image: "" });

  const handleAdd = () => {
    const id = team.length + 1;
    setTeam([...team, { id, ...newMember }]);
    setNew({ name: "", title: "", bio: "", image: "" });
  };

  const handleDelete = (id: number) => {
    setTeam(team.filter((m: any) => m.id !== id));
  };

  const handleEdit = (id: number, field: keyof TeamMember, value: string) => {
    setTeam(prev => prev.map(member => member.id === id ? { ...member, [field]: value } : member));
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Team Manager</h1>

        {/* New member form */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={newMember.name}
            onChange={e => setNew({ ...newMember, name: e.target.value })}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="text"
            placeholder="Title"
            value={newMember.title}
            onChange={e => setNew({ ...newMember, title: e.target.value })}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <textarea
            placeholder="Bio"
            value={newMember.bio}
            onChange={e => setNew({ ...newMember, bio: e.target.value })}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={newMember.image}
            onChange={e => setNew({ ...newMember, image: e.target.value })}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ➕ Add Team Member
          </button>
        </div>

        {/* Team list */}
        <div className="grid md:grid-cols-2 gap-4">
          {team.map((m: any) => (
            <div key={m.id} className="bg-white dark:bg-gray-800 border rounded-xl p-4">
              <input
                type="text"
                value={m.name}
                onChange={(e) => handleEdit(m.id, "name", e.target.value)}
                className="font-bold w-full mb-2 bg-transparent dark:text-white"
              />
              <input
                type="text"
                value={m.title}
                onChange={(e) => handleEdit(m.id, "title", e.target.value)}
                className="text-sm text-gray-500 dark:text-gray-400 w-full mb-2 bg-transparent"
              />
              <textarea
                value={m.bio}
                onChange={(e) => handleEdit(m.id, "bio", e.target.value)}
                className="text-sm mt-2 w-full bg-transparent dark:text-gray-300"
                rows={3}
              />
              <input
                type="text"
                value={m.image}
                onChange={(e) => handleEdit(m.id, "image", e.target.value)}
                placeholder="Image URL"
                className="text-sm mt-2 w-full bg-transparent dark:text-gray-300 border rounded px-2 py-1"
              />
              <button
                onClick={() => handleDelete(m.id)}
                className="mt-2 text-red-500 text-sm hover:underline"
              >
                ❌ Delete
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}