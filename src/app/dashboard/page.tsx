// "use client";

// import { useState, useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
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
// } from "lucide-react";

// export default function Dashboard() {
//   const { currentUser } = useAuth();

//   interface StudentProfile {
//     firstName: string;
//     lastName: string;
//     studentId: string;
//     college?: {
//       name: string;
//       department: string;
//       year: number;
//     };
//   }

//   const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(
//     null
//   );
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudentProfile = async () => {
//       if (currentUser) {
//         try {
//           const studentDocRef = doc(db, "students", currentUser.uid);
//           const studentDoc = await getDoc(studentDocRef);

//           if (studentDoc.exists()) {
//             setStudentProfile(studentDoc.data() as StudentProfile);
//           }
//         } catch (error) {
//           console.error("Error fetching student profile:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchStudentProfile();
//   }, [currentUser]);

//   const upcomingEvents = [
//     {
//       id: 1,
//       title: "CS Club Meeting",
//       date: "Mar 21",
//       time: "3:00 PM",
//       location: "Science Building",
//     },
//     {
//       id: 2,
//       title: "Career Fair",
//       date: "Mar 25",
//       time: "10:00 AM",
//       location: "Main Hall",
//     },
//     {
//       id: 3,
//       title: "Study Group",
//       date: "Mar 22",
//       time: "5:30 PM",
//       location: "Library Rm 204",
//     },
//   ];

//   const stats = [
//     {
//       id: 1,
//       title: "Total Events",
//       value: "24",
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
//                       {studentProfile.college?.name}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center mb-4">
//                   <GraduationCap className="w-5 h-5 text-gray-500 mr-2" />
//                   <div>
//                     <p className="text-sm text-gray-500">Department & Year</p>
//                     <p className="font-medium">
//                       {studentProfile.college?.department} (Year{" "}
//                       {studentProfile.college?.year})
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-500">No profile information available.</p>
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
//             {upcomingEvents.map((event) => (
//               <div
//                 key={event.id}
//                 className="mb-4 last:mb-0 p-3 hover:bg-gray-50 rounded-lg"
//               >
//                 <div className="flex items-start">
//                   <div className="bg-indigo-50 rounded-lg p-2 mr-4 text-center min-w-16">
//                     <p className="text-xs text-indigo-600 font-medium">
//                       {event.date}
//                     </p>
//                     <p className="text-sm font-bold text-indigo-700">
//                       {event.time}
//                     </p>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800">
//                       {event.title}
//                     </h3>
//                     <p className="text-sm text-gray-600">{event.location}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-4 border-b">
//             <h2 className="text-lg font-semibold">Recent Activity</h2>
//           </div>
//           <div className="p-4">
//             {recentActivities.map((activity) => (
//               <div key={activity.id} className="mb-4 last:mb-0">
//                 <div className="flex items-start">
//                   <div className="mr-3 mt-1">
//                     {activity.type === "comment" && (
//                       <TrendingUp className="w-5 h-5 text-blue-500" />
//                     )}
//                     {activity.type === "join" && (
//                       <Users className="w-5 h-5 text-green-500" />
//                     )}
//                     {activity.type === "event" && (
//                       <Calendar className="w-5 h-5 text-purple-500" />
//                     )}
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-700">{activity.content}</p>
//                     <p className="text-xs text-gray-500 flex items-center mt-1">
//                       <Clock className="w-3 h-3 mr-1" /> {activity.time}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="ml-8 mt-3 mb-4 border-b border-gray-100 last:border-0"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
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

// export default function Dashboard() {
//   const { currentUser } = useAuth();
//   const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(
//     null
//   );
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudentProfile = async () => {
//       if (currentUser) {
//         try {
//           const studentDocRef = doc(db, "students", currentUser.uid);
//           const studentDoc = await getDoc(studentDocRef);

//           if (studentDoc.exists()) {
//             setStudentProfile(studentDoc.data() as StudentProfile);
//           } else {
//             // Handle case where user is authenticated but profile doesn't exist
//             console.log("No student profile found");
//             setStudentProfile(null);
//           }
//         } catch (error) {
//           console.error("Error fetching student profile:", error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         // Reset state when user is not authenticated
//         setStudentProfile(null);
//         setLoading(false);
//       }
//     };

//     fetchStudentProfile();
//   }, [currentUser]);

//   const upcomingEvents = [
//     {
//       id: 1,
//       title: "CS Club Meeting",
//       date: "Mar 21",
//       time: "3:00 PM",
//       location: "Science Building",
//     },
//     {
//       id: 2,
//       title: "Career Fair",
//       date: "Mar 25",
//       time: "10:00 AM",
//       location: "Main Hall",
//     },
//     {
//       id: 3,
//       title: "Study Group",
//       date: "Mar 22",
//       time: "5:30 PM",
//       location: "Library Rm 204",
//     },
//   ];

//   const stats = [
//     {
//       id: 1,
//       title: "Total Events",
//       value: "24",
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
//             {upcomingEvents.length > 0 ? (
//               upcomingEvents.map((event) => (
//                 <div
//                   key={event.id}
//                   className="mb-4 last:mb-0 p-3 hover:bg-gray-50 rounded-lg"
//                 >
//                   <div className="flex items-start">
//                     <div className="bg-indigo-50 rounded-lg p-2 mr-4 text-center min-w-16">
//                       <p className="text-xs text-indigo-600 font-medium">
//                         {event.date}
//                       </p>
//                       <p className="text-sm font-bold text-indigo-700">
//                         {event.time}
//                       </p>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-800">
//                         {event.title}
//                       </h3>
//                       <p className="text-sm text-gray-600">{event.location}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-4">
//                 No upcoming events.
//               </p>
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
//     </div>
//   );
// }

"use client";

// import { useRouter } from 'next/router'; // If using Next.js

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";
import {
  Calendar,
  Users,
  FolderKanban,
  BellRing,
  TrendingUp,
  Clock,
  User,
  School,
  BookOpen,
  GraduationCap,
//   Filter,
  Search,
  Plus,
} from "lucide-react";

interface StudentProfile {
  firstName: string;
  lastName: string;
  studentId: string;
  college?: {
    name: string;
    department: string;
    year: number;
  };
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: string;
  description: string;
}

interface NewEventForm {
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: string;
  description: string;
}

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Events state
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<NewEventForm>({
    title: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    category: "Social",
    description: "",
  });

  const categories = [
    "All",
    "Workshop",
    "Career",
    "Academic",
    "Volunteer",
    "Sports",
    "Social",
    "Birthday",
    "Cultural",
  ];

  useEffect(() => {
    const fetchStudentProfile = async () => {
      if (currentUser) {
        try {
          const studentDocRef = doc(db, "students", currentUser.uid);
          const studentDoc = await getDoc(studentDocRef);

          if (studentDoc.exists()) {
            setStudentProfile(studentDoc.data() as StudentProfile);
          } else {
            console.log("No student profile found");
            setStudentProfile(null);
          }
        } catch (error) {
          console.error("Error fetching student profile:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setStudentProfile(null);
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, [currentUser]);

  // Load events from Firebase
  const fetchEvents = async () => {
    setEventsLoading(true);
    try {
      let eventsQuery = query(collection(db, "events"), orderBy("date", "asc"));

      // Apply date filter if it exists
      if (dateFilter) {
        eventsQuery = query(eventsQuery, where("date", "==", dateFilter));
      }

      const querySnapshot = await getDocs(eventsQuery);

      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];

      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events: ", error);
    } finally {
      setEventsLoading(false);
    }
  };

  // Load events when component mounts or filters change
  useEffect(() => {
    if (currentUser) {
      fetchEvents();
    }
  }, [dateFilter, currentUser]);

  // Filter events based on search term and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Get upcoming events for the dashboard (next 7 days)
  const getUpcomingEvents = () => {
    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);

    return events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= sevenDaysLater;
      })
      .slice(0, 3); // Return only the first 3 upcoming events
  };

  const upcomingEvents = getUpcomingEvents();

  const stats = [
    {
      id: 1,
      title: "Total Events",
      value: events.length.toString(),
      icon: <Calendar className="w-6 h-6 text-indigo-600" />,
    },
    {
      id: 2,
      title: "My Groups",
      value: "5",
      icon: <Users className="w-6 h-6 text-green-600" />,
    },
    {
      id: 3,
      title: "Projects",
      value: "12",
      icon: <FolderKanban className="w-6 h-6 text-orange-600" />,
    },
    {
      id: 4,
      title: "Notifications",
      value: "3",
      icon: <BellRing className="w-6 h-6 text-red-600" />,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "comment",
      content: "Alex commented on your project idea",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "join",
      content: "You joined Web Development group",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "event",
      content: "Tech Talk event was updated",
      time: "2 days ago",
    },
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  // If not authenticated, show a message or redirect
  if (!currentUser && !loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            Please sign in to view your dashboard.
          </p>
          <a
            href="/signin"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back,{" "}
          {studentProfile?.firstName ||
            currentUser?.email?.split("@")[0] ||
            "User"}
          !
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening on campus today.
        </p>
      </div>

      {/* Student Profile */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Student Profile</h2>
        </div>
        <div className="p-4">
          {loading ? (
            <p>Loading profile...</p>
          ) : studentProfile ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{`${studentProfile.firstName} ${studentProfile.lastName}`}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <BookOpen className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p className="font-medium">{studentProfile.studentId}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <School className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">College</p>
                    <p className="font-medium">
                      {studentProfile.college?.name || "Not specified"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Department & Year</p>
                    <p className="font-medium">
                      {studentProfile.college?.department || "Not specified"}
                      {studentProfile.college?.year
                        ? `(Year ${studentProfile.college.year})`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 mb-4">
                No profile information available.
              </p>
              <a
                href="/profile/create"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Complete your profile
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-lg shadow p-4 flex items-center"
          >
            <div className="mr-4 p-3 rounded-full bg-gray-50">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <a
              href="/dashboard/events"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              View all
            </a>
          </div>
          <div className="p-4">
            {eventsLoading ? (
              <p className="text-center py-4">Loading events...</p>
            ) : upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="mb-4 last:mb-0 p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start">
                    <div className="bg-indigo-50 rounded-lg p-2 mr-4 text-center min-w-16">
                      <p className="text-xs text-indigo-600 font-medium">
                        {formatDate(event.date)}
                      </p>
                      <p className="text-sm font-bold text-indigo-700">
                        {event.time}
                      </p>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-800">
                          {event.title}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          {event.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {event.location}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Organizer: {event.organizer}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  No upcoming events in the next 7 days.
                </p>
                <button
                  //   onClick={() => setShowModal(true)}
                  onClick={() => (window.location.href = "/dashboard/events")}
                  className="mt-4 text-indigo-600 hover:text-indigo-800 flex items-center justify-center mx-auto"
                >
                  <Plus className="w-4 h-4 mr-1" /> Create Event
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="p-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="mb-4 last:mb-0">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {activity.type === "comment" && (
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                      )}
                      {activity.type === "join" && (
                        <Users className="w-5 h-5 text-green-500" />
                      )}
                      {activity.type === "event" && (
                        <Calendar className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">
                        {activity.content}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" /> {activity.time}
                      </p>
                    </div>
                  </div>
                  <div className="ml-8 mt-3 mb-4 border-b border-gray-100 last:border-0"></div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No recent activities.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Events Calendar Preview */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Events Calendar Preview</h2>
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                className="pl-8 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              className="border rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="p-4">
          {eventsLoading ? (
            <p className="text-center py-4">Loading events...</p>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.slice(0, 6).map((event) => (
                <div
                  key={event.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                      {event.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(event.date)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{event.location}</p>
                  <p className="text-xs text-gray-500 mb-2">
                    Time: {event.time}
                  </p>
                  <p className="text-xs text-gray-500">
                    Organizer: {event.organizer}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                No events found matching your criteria.
              </p>
            </div>
          )}

          {filteredEvents.length > 6 && (
            <div className="text-center mt-4">
              <a
                href="/dashboard/events"
                className="text-indigo-600 hover:text-indigo-800"
              >
                View all {filteredEvents.length} events
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
