import { useState, useEffect } from "react";

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  lastLogin: string;
  notificationsEnabled: boolean;
  darkMode: boolean;
  twoFactorAuth: boolean;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface SettingsTab {
  id: string;
  name: string;
  icon: string;
}

interface ProfileTabProps {
  profile: AdminProfile | null; // Added null safety
  isEditing: boolean;
  onEditToggle: () => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSave: () => void;
}

interface TabProps {
  profile: AdminProfile | null; // Added null safety
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileTab = ({
  profile,
  isEditing,
  onEditToggle,
  onInputChange,
  onSave,
}: ProfileTabProps) => {
  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Profile Information
        </h2>
        {!isEditing ? (
          <button
            onClick={onEditToggle}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={onEditToggle}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile?.name || ""}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">{profile?.name || "N/A"}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile?.email || ""}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">
                {profile?.email || "N/A"}
              </p>
            )}
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bio
            </label>
            {isEditing ? (
              <textarea
                name="bio"
                value={profile?.bio || ""}
                onChange={onInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-800 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">
                {profile?.bio || "No bio provided"}
              </p>
            )}
          </div>

          {isEditing && (
            <>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Twitter</label>
                <input
                  type="url"
                  name="socialLinks.twitter"
                  value={profile?.socialLinks?.twitter || ""}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn</label>
                <input
                  type="url"
                  name="socialLinks.linkedin"
                  value={profile?.socialLinks?.linkedin || ""}
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const SecurityTab = ({ profile, isEditing, onInputChange }: TabProps) => {
  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white">Two-Factor Authentication</h3>
      <label className="relative inline-flex items-center cursor-pointer mt-4">
        <input
          type="checkbox"
          name="twoFactorAuth"
          checked={profile?.twoFactorAuth || false}
          onChange={onInputChange}
          className="sr-only peer"
          disabled={!isEditing}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-red-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      </label>
      <div className="mt-6">
        <p className="text-sm text-gray-500">Last login: {profile?.lastLogin || "Unknown"}</p>
      </div>
    </div>
  );
};

const AdminProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<AdminProfile>({
    id: "admin-001",
    name: "Admin User",
    email: "admin@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "Super Administrator",
    lastLogin: "", // Start empty to prevent hydration error
    notificationsEnabled: true,
    darkMode: false,
    twoFactorAuth: false,
    bio: "Experienced administrator with 5+ years managing systems and users.",
    socialLinks: {
      twitter: "https://twitter.com/admin",
      linkedin: "https://linkedin.com/in/admin",
      github: "https://github.com/admin",
    },
  });

  // Set time only on client side
  useEffect(() => {
    setProfile(prev => ({...prev, lastLogin: new Date().toLocaleString()}));
  }, []);

  const tabs: SettingsTab[] = [
    { id: "profile", name: "Profile", icon: "👤" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "appearance", name: "Appearance", icon: "🎨" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;

    setProfile((prev) => {
      if (!prev) return prev;
      if (name.startsWith("socialLinks.")) {
        const field = name.split(".")[1];
        return {
          ...prev,
          socialLinks: { ...prev.socialLinks, [field]: value }
        };
      }
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile updated:", profile);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Admin Settings</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64">
            <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 flex flex-col items-center">
              <img
                src={profile?.avatar || ""}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              />
              <h2 className="mt-4 text-xl font-semibold dark:text-white">{profile?.name || "Loading..."}</h2>
              <p className="text-sm text-gray-500">{profile?.role}</p>
              
              <nav className="w-full mt-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 ${
                      activeTab === tab.id ? "bg-red-50 text-red-600" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span> {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {activeTab === "profile" && (
              <ProfileTab profile={profile} isEditing={isEditing} onEditToggle={() => setIsEditing(!isEditing)} onInputChange={handleInputChange} onSave={handleSave} />
            )}
            {activeTab === "security" && (
              <SecurityTab profile={profile} isEditing={isEditing} onInputChange={handleInputChange} />
            )}
            {/* ... other tabs follow same pattern ... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;