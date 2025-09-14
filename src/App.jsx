import React, { useState, useEffect } from "react";

// --- Mock Data ---
const initialPosts = [
  {
    id: 1,
    type: "Event",
    author: "Mahesh",
    timestamp: "2 hours ago",
    title: "Workshop on Docker",
    description:
      "Join us for an exciting workshop on Docker and containerization. Perfect for beginners!",
    location: "CSE Lab",
    date: "2025-09-13T17:00:00",
    rsvps: { going: 76, interested: 183, notGoing: 4 },
    image: "https://placehold.co/600x400/E2E8F0/4A5568?text=Docker+Workshop",
  },
  {
    id: 2,
    type: "Lost & Found",
    author: "Priya",
    timestamp: "1 day ago",
    title: "Lost: Black Wallet",
    description:
      "Lost my black leather wallet, it has my ID and some cash. Please return if found.",
    location: "Near the library",
    status: "Lost",
    image: "https://placehold.co/600x400/E2E8F0/4A5568?text=Lost+Wallet",
  },
  {
    id: 3,
    type: "Announcement",
    author: "Admin",
    timestamp: "3 days ago",
    title: "Mid-term Exam Schedule",
    description:
      "The schedule for the upcoming mid-term examinations has been released.",
    department: "Academics Office",
    attachment: { type: "PDF", name: "Midterm_Schedule.pdf" },
  },
  {
    id: 4,
    type: "Event",
    author: "Cultural Club",
    timestamp: "5 days ago",
    title: 'Annual College Fest "Odyssey"',
    description:
      "Get ready for three days of fun, music, and competitions. More details to follow!",
    location: "Main Ground",
    date: "2025-10-05T10:00:00",
    rsvps: { going: 250, interested: 400, notGoing: 10 },
    image: "https://placehold.co/600x400/E2E8F0/4A5568?text=College+Fest",
  },
  {
    id: 5,
    type: "Lost & Found",
    author: "Ravi",
    timestamp: "6 days ago",
    title: "Found: Blue Umbrella",
    description:
      "Found a blue umbrella near the canteen. The owner can collect it from the security office.",
    location: "Canteen",
    status: "Found",
    image: "https://placehold.co/600x400/E2E8F0/4A5568?text=Found+Umbrella",
  },
];

// --- SVG Icons ---
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const CloseIcon = () => <Icon path="M6 18L18 6M6 6l12 12" />;
const PaperclipIcon = () => (
  <Icon path="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.122 2.122l7.81-7.81" />
);
const SendIcon = () => (
  <Icon path="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
);

// --- Post Card Components ---
const EventCard = ({ post }) => {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-shadow hover:shadow-lg">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <p className="text-sm text-gray-500 mb-2">
          New Event: {post.author} shared an event {post.timestamp}
        </p>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.description}</p>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Icon
            path="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            className="w-5 h-5 mr-2"
          />
          <Icon
            path="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            className="w-5 h-5 mr-2"
          />
          <span>{post.location}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-6">
          <Icon
            path="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18"
            className="w-5 h-5 mr-2"
          />
          <span>{formatDate(post.date)}</span>
        </div>
        <div className="flex justify-between items-center space-x-2">
          <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
            Going ({post.rsvps.going})
          </button>
          <button className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors">
            Interested ({post.rsvps.interested})
          </button>
          <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors">
            Not Going ({post.rsvps.notGoing})
          </button>
        </div>
      </div>
    </div>
  );
};

const LostFoundCard = ({ post }) => (
  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-shadow hover:shadow-lg">
    {post.image && (
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
    )}
    <div className="p-5">
      <p className="text-sm text-gray-500 mb-2">
        {post.status}: {post.author} shared this {post.timestamp}
      </p>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.description}</p>
      <div className="flex items-center text-gray-500 text-sm">
        <Icon
          path="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          className="w-5 h-5 mr-2"
        />
        <Icon
          path="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          className="w-5 h-5 mr-2"
        />
        <span>{post.location}</span>
      </div>
    </div>
  </div>
);

const AnnouncementCard = ({ post }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition-shadow hover:shadow-lg">
    <p className="text-sm text-gray-500 mb-2">
      Announcement from {post.department} • {post.timestamp}
    </p>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
    <p className="text-gray-600 mb-4">{post.description}</p>
    {post.attachment && (
      <div className="bg-gray-100 p-3 rounded-lg flex items-center">
        <Icon
          path="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.122 2.122l7.81-7.81"
          className="w-5 h-5 mr-3 text-gray-500"
        />
        <span className="text-gray-700 font-medium">
          {post.attachment.name}
        </span>
        <a
          href="#"
          className="ml-auto text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
        >
          Download
        </a>
      </div>
    )}
  </div>
);

// --- Create Post Modal ---
const CreatePostModal = ({ isOpen, onClose, addPost }) => {
  const [inputValue, setInputValue] = useState("");
  const [postType, setPostType] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock API call to OpenAI
  const getPostTypeFromAPI = async (text) => {
    setIsLoading(true);
    // This is a mock API call. In a real app, you would fetch this from your backend which calls OpenAI.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const lowerText = text.toLowerCase();
    let detectedType = null;
    let data = {};

    if (
      lowerText.includes("workshop") ||
      lowerText.includes("event") ||
      lowerText.includes("fest") ||
      lowerText.includes("tomorrow at")
    ) {
      detectedType = "Event";
      data = {
        title: "New Event (Editable)",
        description: text,
        location: "Campus Ground (Editable)",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        rsvps: { going: 0, interested: 0, notGoing: 0 },
      };
    } else if (lowerText.includes("lost") || lowerText.includes("found")) {
      detectedType = "Lost & Found";
      data = {
        title: lowerText.includes("lost")
          ? "Lost Item (Editable)"
          : "Found Item (Editable)",
        description: text,
        location: "Near... (Editable)",
        status: lowerText.includes("lost") ? "Lost" : "Found",
      };
    } else if (
      lowerText.includes("announcement") ||
      lowerText.includes("notice") ||
      lowerText.includes("schedule")
    ) {
      detectedType = "Announcement";
      data = {
        title: "Official Announcement (Editable)",
        description: text,
        department: "Admin Office (Editable)",
        attachment: null,
      };
    }

    setPostType(detectedType);
    setPreviewData(data);
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleGeneratePreview = () => {
    if (inputValue.trim()) {
      getPostTypeFromAPI(inputValue);
    }
  };

  const handlePreviewEdit = (field, value) => {
    setPreviewData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const newPost = {
      id: Date.now(),
      type: postType,
      author: "You",
      timestamp: "Just now",
      ...previewData,
    };
    addPost(newPost);
    handleClose();
  };

  const handleClose = () => {
    setInputValue("");
    setPostType(null);
    setPreviewData(null);
    onClose();
  };

  const renderPreview = () => {
    if (isLoading) {
      return (
        <div className="text-center p-8">
          <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Analyzing your post...</p>
        </div>
      );
    }
    if (!postType || !previewData) return null;

    switch (postType) {
      case "Event":
        return (
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-bold text-lg mb-4 text-gray-700">
              Event Preview
            </h3>
            <input
              type="text"
              value={previewData.title}
              onChange={(e) => handlePreviewEdit("title", e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              value={previewData.description}
              onChange={(e) => handlePreviewEdit("description", e.target.value)}
              className="w-full p-2 border rounded mb-2"
              rows="3"
            ></textarea>
            <input
              type="text"
              value={previewData.location}
              onChange={(e) => handlePreviewEdit("location", e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="datetime-local"
              value={previewData.date.substring(0, 16)}
              onChange={(e) => handlePreviewEdit("date", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        );
      case "Lost & Found":
        return (
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-bold text-lg mb-4 text-gray-700">
              Lost & Found Preview
            </h3>
            <input
              type="text"
              value={previewData.title}
              onChange={(e) => handlePreviewEdit("title", e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              value={previewData.description}
              onChange={(e) => handlePreviewEdit("description", e.target.value)}
              className="w-full p-2 border rounded mb-2"
              rows="3"
            ></textarea>
            <input
              type="text"
              value={previewData.location}
              onChange={(e) => handlePreviewEdit("location", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        );
      case "Announcement":
        return (
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-bold text-lg mb-4 text-gray-700">
              Announcement Preview
            </h3>
            <input
              type="text"
              value={previewData.title}
              onChange={(e) => handlePreviewEdit("title", e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              value={previewData.description}
              onChange={(e) => handlePreviewEdit("description", e.target.value)}
              className="w-full p-2 border rounded mb-2"
              rows="3"
            ></textarea>
            <input
              type="text"
              value={previewData.department}
              onChange={(e) => handlePreviewEdit("department", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        );
      default:
        return (
          <div className="text-center p-4 text-gray-500">
            Could not determine post type. Please be more specific.
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 ease-out scale-95 opacity-0 animate-fade-in-up">
        <div className="p-6 relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            What would you like to share?
          </h2>
          <p className="text-gray-500 mb-6">
            Describe an event, lost item, or announcement.
          </p>
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
          >
            <CloseIcon />
          </button>

          <div className="relative">
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              placeholder="e.g., 'Lost my black wallet near the library' or 'Workshop on Docker tomorrow at 5pm in CSE Lab'"
              className="w-full p-4 pr-28 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow resize-none"
              rows="4"
            />
            <div className="absolute bottom-3 right-3 flex items-center space-x-2">
              <button className="text-gray-500 hover:text-indigo-600">
                <PaperclipIcon />
              </button>
              <button
                onClick={handleGeneratePreview}
                disabled={isLoading || !inputValue.trim()}
                className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
              >
                <SendIcon />
              </button>
            </div>
          </div>

          <div className="mt-6">{renderPreview()}</div>

          {postType && previewData && !isLoading && (
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setPostType(null);
                  setPreviewData(null);
                }}
                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300"
              >
                Restart Flow
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 text-white bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Looks good! Post it
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ["All", "Events", "Lost & Found", "Announcements"];

  const filteredPosts = posts
    .filter((post) => {
      if (activeTab === "All") return true;
      if (activeTab === "Events") return post.type === "Event";
      if (activeTab === "Lost & Found") return post.type === "Lost & Found";
      if (activeTab === "Announcements") return post.type === "Announcement";
      return false;
    })
    .sort((a, b) => b.id - a.id);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Headout assgn
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
          >
            Create Post
          </button>
        </div>

        <div className="space-y-6">
          {filteredPosts.map((post) => {
            switch (post.type) {
              case "Event":
                return <EventCard key={post.id} post={post} />;
              case "Lost & Found":
                return <LostFoundCard key={post.id} post={post} />;
              case "Announcement":
                return <AnnouncementCard key={post.id} post={post} />;
              default:
                return null;
            }
          })}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <Icon
                path="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                className="w-16 h-16 text-gray-300 mx-auto"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No posts yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new post.
              </p>
            </div>
          )}
        </div>
      </main>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addPost={addPost}
      />

      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}