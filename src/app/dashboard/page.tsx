// "use client";

// // import { useRouter } from 'next/router'; // If using Next.js

// import { useState, useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { db } from "@/lib/firebase";
// import {
//   doc,
//   getDoc,
//   collection,
//   query,
//   orderBy,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import {
//   Calendar,
//   Users,
//   FolderKanban,
//   BellRing,
//   TrendingUp,
//   Clock,
//   User,
//   School,
//   BookOpen,
//   GraduationCap,
//   //   Filter,
//   Search,
//   Plus,
// } from "lucide-react";

// interface StudentProfile {
//   firstName: string;
//   lastName: string;
//   studentId: string;
//   college?: {
//     name: string;
//     department: string;
//     year: number;
//   };
// }

// interface Event {
//   id: string;
//   title: string;
//   date: string;
//   time: string;
//   location: string;
//   organizer: string;
//   category: string;
//   description: string;
// }

// export default function Dashboard() {
//   const { currentUser } = useAuth();
//   const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(
//     null
//   );
//   const [loading, setLoading] = useState(true);

//   // Events state
//   const [events, setEvents] = useState<Event[]>([]);
//   const [eventsLoading, setEventsLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dateFilter] = useState("");
//   //   const [showModal, setShowModal] = useState(false);
//   // Removed unused newEvent state

//   const categories = [
//     "All",
//     "Workshop",
//     "Career",
//     "Academic",
//     "Volunteer",
//     "Sports",
//     "Social",
//     "Birthday",
//     "Cultural",
//   ];

//   useEffect(() => {
//     const fetchStudentProfile = async () => {
//       if (currentUser) {
//         try {
//           const studentDocRef = doc(db, "students", currentUser.uid);
//           const studentDoc = await getDoc(studentDocRef);

//           if (studentDoc.exists()) {
//             setStudentProfile(studentDoc.data() as StudentProfile);
//           } else {
//             console.log("No student profile found");
//             setStudentProfile(null);
//           }
//         } catch (error) {
//           console.error("Error fetching student profile:", error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setStudentProfile(null);
//         setLoading(false);
//       }
//     };

//     fetchStudentProfile();
//   }, [currentUser]);

//   // Load events from Firebase
//   const fetchEvents = async () => {
//     setEventsLoading(true);
//     try {
//       let eventsQuery = query(collection(db, "events"), orderBy("date", "asc"));

//       // Apply date filter if it exists
//       if (dateFilter) {
//         eventsQuery = query(eventsQuery, where("date", "==", dateFilter));
//       }

//       const querySnapshot = await getDocs(eventsQuery);

//       const eventsData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Event[];

//       setEvents(eventsData);
//     } catch (error) {
//       console.error("Error fetching events: ", error);
//     } finally {
//       setEventsLoading(false);
//     }
//   };

//   // Load events when component mounts or filters change
//   useEffect(() => {
//     if (currentUser) {
//       fetchEvents();
//     }
//   }, [dateFilter, currentUser]);

//   // Filter events based on search term and category
//   const filteredEvents = events.filter((event) => {
//     const matchesSearch =
//       event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       event.location.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesCategory =
//       selectedCategory === "All" || event.category === selectedCategory;

//     return matchesSearch && matchesCategory;
//   });

//   // Get upcoming events for the dashboard (next 7 days)
//   const getUpcomingEvents = () => {
//     const today = new Date();
//     const sevenDaysLater = new Date();
//     sevenDaysLater.setDate(today.getDate() + 7);

//     return events
//       .filter((event) => {
//         const eventDate = new Date(event.date);
//         return eventDate >= today && eventDate <= sevenDaysLater;
//       })
//       .slice(0, 3); // Return only the first 3 upcoming events
//   };

//   const upcomingEvents = getUpcomingEvents();

//   const stats = [
//     {
//       id: 1,
//       title: "Total Events",
//       value: events.length.toString(),
//       icon: <Calendar className="w-6 h-6 text-indigo-600" />,
//     },
//     {
//       id: 2,
//       title: "My Groups",
//       value: "5",
//       icon: <Users className="w-6 h-6 text-green-600" />,
//     },
//     {
//       id: 3,
//       title: "Projects",
//       value: "12",
//       icon: <FolderKanban className="w-6 h-6 text-orange-600" />,
//     },
//     {
//       id: 4,
//       title: "Notifications",
//       value: "3",
//       icon: <BellRing className="w-6 h-6 text-red-600" />,
//     },
//   ];

//   const recentActivities = [
//     {
//       id: 1,
//       type: "comment",
//       content: "Alex commented on your project idea",
//       time: "2 hours ago",
//     },
//     {
//       id: 2,
//       type: "join",
//       content: "You joined Web Development group",
//       time: "1 day ago",
//     },
//     {
//       id: 3,
//       type: "event",
//       content: "Tech Talk event was updated",
//       time: "2 days ago",
//     },
//   ];

//   // Format date for display
//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = {
//       month: "short",
//       day: "numeric",
//     };
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", options);
//   };

//   // If not authenticated, show a message or redirect
//   if (!currentUser && !loading) {
//     return (
//       <div className="max-w-7xl mx-auto p-4 flex items-center justify-center h-screen">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-800 mb-4">
//             Access Denied
//           </h1>
//           <p className="text-gray-600 mb-6">
//             Please sign in to view your dashboard.
//           </p>
//           <a
//             href="/signin"
//             className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
//           >
//             Sign In
//           </a>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">
//           Welcome back,{" "}
//           {studentProfile?.firstName ||
//             currentUser?.email?.split("@")[0] ||
//             "User"}
//           !
//         </h1>
//         <p className="text-gray-600">
//           Here&apos;s what&apos;s happening on campus today.
//         </p>
//       </div>

//       {/* Student Profile */}
//       <div className="bg-white rounded-lg shadow mb-6">
//         <div className="p-4 border-b">
//           <h2 className="text-lg font-semibold">Student Profile</h2>
//         </div>
//         <div className="p-4">
//           {loading ? (
//             <p>Loading profile...</p>
//           ) : studentProfile ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <div className="flex items-center mb-4">
//                   <User className="w-5 h-5 text-gray-500 mr-2" />
//                   <div>
//                     <p className="text-sm text-gray-500">Name</p>
//                     <p className="font-medium">{`${studentProfile.firstName} ${studentProfile.lastName}`}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center mb-4">
//                   <BookOpen className="w-5 h-5 text-gray-500 mr-2" />
//                   <div>
//                     <p className="text-sm text-gray-500">Student ID</p>
//                     <p className="font-medium">{studentProfile.studentId}</p>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex items-center mb-4">
//                   <School className="w-5 h-5 text-gray-500 mr-2" />
//                   <div>
//                     <p className="text-sm text-gray-500">College</p>
//                     <p className="font-medium">
//                       {studentProfile.college?.name || "Not specified"}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center mb-4">
//                   <GraduationCap className="w-5 h-5 text-gray-500 mr-2" />
//                   <div>
//                     <p className="text-sm text-gray-500">Department & Year</p>
//                     <p className="font-medium">
//                       {studentProfile.college?.department || "Not specified"}
//                       {studentProfile.college?.year
//                         ? `(Year ${studentProfile.college.year})`
//                         : ""}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-4">
//               <p className="text-gray-500 mb-4">
//                 No profile information available.
//               </p>
//               <a
//                 href="/profile/create"
//                 className="text-indigo-600 hover:text-indigo-800"
//               >
//                 Complete your profile
//               </a>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         {stats.map((stat) => (
//           <div
//             key={stat.id}
//             className="bg-white rounded-lg shadow p-4 flex items-center"
//           >
//             <div className="mr-4 p-3 rounded-full bg-gray-50">{stat.icon}</div>
//             <div>
//               <p className="text-sm text-gray-500">{stat.title}</p>
//               <p className="text-xl font-semibold">{stat.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Upcoming Events */}
//         <div className="lg:col-span-2 bg-white rounded-lg shadow">
//           <div className="p-4 border-b flex items-center justify-between">
//             <h2 className="text-lg font-semibold">Upcoming Events</h2>
//             <a
//               href="/dashboard/events"
//               className="text-sm text-indigo-600 hover:text-indigo-800"
//             >
//               View all
//             </a>
//           </div>
//           <div className="p-4">
//             {eventsLoading ? (
//               <p className="text-center py-4">Loading events...</p>
//             ) : upcomingEvents.length > 0 ? (
//               upcomingEvents.map((event) => (
//                 <div
//                   key={event.id}
//                   className="mb-4 last:mb-0 p-3 hover:bg-gray-50 rounded-lg"
//                 >
//                   <div className="flex items-start">
//                     <div className="bg-indigo-50 rounded-lg p-2 mr-4 text-center min-w-16">
//                       <p className="text-xs text-indigo-600 font-medium">
//                         {formatDate(event.date)}
//                       </p>
//                       <p className="text-sm font-bold text-indigo-700">
//                         {event.time}
//                       </p>
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start">
//                         <h3 className="font-semibold text-gray-800">
//                           {event.title}
//                         </h3>
//                         <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
//                           {event.category}
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {event.location}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Organizer: {event.organizer}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8">
//                 <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500">
//                   No upcoming events in the next 7 days.
//                 </p>
//                 <button
//                   //   onClick={() => setShowModal(true)}
//                   onClick={() => (window.location.href = "/dashboard/events")}
//                   className="mt-4 text-indigo-600 hover:text-indigo-800 flex items-center justify-center mx-auto"
//                 >
//                   <Plus className="w-4 h-4 mr-1" /> Create Event
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-4 border-b">
//             <h2 className="text-lg font-semibold">Recent Activity</h2>
//           </div>
//           <div className="p-4">
//             {recentActivities.length > 0 ? (
//               recentActivities.map((activity) => (
//                 <div key={activity.id} className="mb-4 last:mb-0">
//                   <div className="flex items-start">
//                     <div className="mr-3 mt-1">
//                       {activity.type === "comment" && (
//                         <TrendingUp className="w-5 h-5 text-blue-500" />
//                       )}
//                       {activity.type === "join" && (
//                         <Users className="w-5 h-5 text-green-500" />
//                       )}
//                       {activity.type === "event" && (
//                         <Calendar className="w-5 h-5 text-purple-500" />
//                       )}
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-700">
//                         {activity.content}
//                       </p>
//                       <p className="text-xs text-gray-500 flex items-center mt-1">
//                         <Clock className="w-3 h-3 mr-1" /> {activity.time}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="ml-8 mt-3 mb-4 border-b border-gray-100 last:border-0"></div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-4">
//                 No recent activities.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Events Calendar Preview */}
//       <div className="mt-6 bg-white rounded-lg shadow">
//         <div className="p-4 border-b flex items-center justify-between">
//           <h2 className="text-lg font-semibold">Events Calendar Preview</h2>
//           <div className="flex space-x-2">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search events..."
//                 className="pl-8 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             </div>
//             <select
//               className="border rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="p-4">
//           {eventsLoading ? (
//             <p className="text-center py-4">Loading events...</p>
//           ) : filteredEvents.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {/* {filteredEvents.slice(0, 6).map((event) => ( */}
//               {filteredEvents.slice(0, 6).map((event, index) => (
//                 <div
//                   //   key={event.id}
//                   key={`${event.id}-${index}`}
//                   className="border rounded-lg p-4 hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
//                       {event.category}
//                     </span>
//                     <span className="text-xs text-gray-500">
//                       {formatDate(event.date)}
//                     </span>
//                   </div>
//                   <h3 className="font-semibold text-gray-800 mb-1">
//                     {event.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-2">{event.location}</p>
//                   <p className="text-xs text-gray-500 mb-2">
//                     Time: {event.time}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Organizer: {event.organizer}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-8">
//               <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-500">
//                 No events found matching your criteria.
//               </p>
//             </div>
//           )}

//           {filteredEvents.length > 6 && (
//             <div className="text-center mt-4">
//               <a
//                 href="/dashboard/events"
//                 className="text-indigo-600 hover:text-indigo-800"
//               >
//                 View all {filteredEvents.length} events
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { db, storage } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Image,
  Video,
  // FileText,
  // Calendar,
  User,
  X,
  Loader2,
} from "lucide-react";

interface Post {
  id: string;
  userId: string;
  userName: string;
  userTitle?: string;
  content: string;
  timestamp: {
    toDate: () => Date;
  } | null;
  likes: number;
  comments: number;
  image?: string;
  userImage?: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  branch?: string;
  year?: string;
  interests?: string[];
  skills?: string[];
  achievements?: string[];
  photoURL?: string;
  createdAt?: string;
}

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "students", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          } else {
            console.log("No user profile found");
            setUserProfile(null);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
      }
    };

    const fetchPosts = async () => {
      try {
        const postsQuery = query(
          collection(db, "posts"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(postsQuery);

        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];

        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchPosts();
  }, [currentUser]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    setIsUploading(true);
    setUploadProgress(0);

    const storageRef = ref(storage, `post-images/${currentUser.uid}/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading image: ", error);
        setIsUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploadedImage(downloadURL);
          setIsUploading(false);
        } catch (error) {
          console.error("Error getting download URL: ", error);
          setIsUploading(false);
        }
      }
    );
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCreatePost = async () => {
    if (!currentUser || (!newPostContent.trim() && !uploadedImage)) return;

    try {
      const fullName = userProfile
        ? `${userProfile.firstName} ${userProfile.lastName}`
        : currentUser.email?.split("@")[0] || "User";

      const userTitle = userProfile?.branch
        ? `${userProfile.branch} Student - Year ${userProfile.year}`
        : "Student";

      await addDoc(collection(db, "posts"), {
        userId: currentUser.uid,
        userName: fullName,
        userTitle: userTitle,
        content: newPostContent,
        timestamp: serverTimestamp(),
        likes: 0,
        comments: 0,
        userImage: userProfile?.photoURL || null,
        image: uploadedImage || null,
      });

      setNewPostContent("");
      setUploadedImage(null);

      // Refresh posts
      const postsQuery = query(
        collection(db, "posts"),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(postsQuery);

      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      setPosts(postsData);
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp: { toDate: () => Date } | null | undefined) => {
    if (!timestamp) return "Just now";

    const now = new Date();
    const postDate = timestamp.toDate();
    const diffMs = now.getTime() - postDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d`;

    return postDate.toLocaleDateString();
  };

  // If not authenticated, show a message or redirect
  if (!currentUser && !loading) {
    return (
      <div className="max-w-2xl mx-auto p-4 flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            Please sign in to view your feed.
          </p>
          <a
            href="/signin"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Top Navigation */}
      {/* <div className="sticky top-0 bg-white z-10 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-blue-600">CampusConnect</h1>
        </div>
      </div> */}

      {/* Create Post */}
      <div className="bg-white rounded-lg shadow mb-4 p-4 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
            {userProfile?.photoURL ? (
              <img
                src={userProfile.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-gray-500" />
            )}
          </div>
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[40px] resize-none"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows={2}
          />
        </div>

        {/* Image preview */}
        {uploadedImage && (
          <div className="relative mb-3 mt-2 rounded-lg overflow-hidden border border-gray-200">
            <img src={uploadedImage} alt="Upload preview" className="w-full h-auto max-h-96 object-contain" />
            <button
              onClick={removeUploadedImage}
              className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Upload progress */}
        {isUploading && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-right">{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="flex justify-between items-center pt-2">
          <div className="flex space-x-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              ref={fileInputRef}
              disabled={isUploading}
            />
            <button
              className="flex items-center text-gray-600 hover:bg-gray-100 rounded-md px-3 py-1.5 transition-colors duration-200"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Image className="w-5 h-5 mr-1.5 text-blue-500" />
              <span className="text-sm font-medium">Photo</span>
            </button>
            <button className="flex items-center text-gray-600 hover:bg-gray-100 rounded-md px-3 py-1.5 transition-colors duration-200">
              <Video className="w-5 h-5 mr-1.5 text-green-500" />
              <span className="text-sm font-medium">Video</span>
            </button>
          </div>
          <button
            className={`px-4 py-1.5 rounded-md text-sm font-medium
              ${(newPostContent.trim() || uploadedImage)
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"}
              transition-colors duration-200`}
            onClick={handleCreatePost}
            disabled={!newPostContent.trim() && !uploadedImage}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-1 inline animate-spin" />
                Uploading...
              </>
            ) : "Post"}
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-500">Loading posts...</p>
        </div>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow mb-4 hover:shadow-md transition-shadow duration-200">
            <div className="p-4">
              {/* Post Header */}
              <div className="flex justify-between mb-3">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
                    {post.userImage ? (
                      <img
                        src={post.userImage}
                        alt={post.userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{post.userName}</h3>
                    <p className="text-xs text-gray-500">{post.userTitle}</p>
                    <p className="text-xs text-gray-500">{formatTimestamp(post.timestamp)}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Content */}
              <div className="mb-3">
                <p className="text-sm text-gray-800 whitespace-pre-line">{post.content}</p>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="mb-3 -mx-4">
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-auto rounded-md"
                  />
                </div>
              )}

              {/* Post Stats */}
              <div className="flex justify-between text-xs text-gray-500 mb-2 pt-1 border-t">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
              </div>

              {/* Post Actions */}
              <div className="flex justify-between pt-1 border-t">
                <button className="flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded px-3 py-2 flex-1 transition-colors duration-200">
                  <ThumbsUp className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Like</span>
                </button>
                <button className="flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded px-3 py-2 flex-1 transition-colors duration-200">
                  <MessageSquare className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Comment</span>
                </button>
                <button className="flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded px-3 py-2 flex-1 transition-colors duration-200">
                  <Share2 className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No posts yet</h3>
          <p className="text-gray-600 mb-4">Be the first to share something with your campus community!</p>
          <button
            onClick={() => setNewPostContent("Hello everyone! I'm excited to connect with you all.")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Create your first post
          </button>
        </div>
      )}
    </div>
  );
}