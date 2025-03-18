"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
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
} from "lucide-react";

export default function Dashboard() {
  const { currentUser } = useAuth();

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

  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      if (currentUser) {
        try {
          const studentDocRef = doc(db, "students", currentUser.uid);
          const studentDoc = await getDoc(studentDocRef);

          if (studentDoc.exists()) {
            setStudentProfile(studentDoc.data() as StudentProfile);
          }
        } catch (error) {
          console.error("Error fetching student profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStudentProfile();
  }, [currentUser]);

  const upcomingEvents = [
    {
      id: 1,
      title: "CS Club Meeting",
      date: "Mar 21",
      time: "3:00 PM",
      location: "Science Building",
    },
    {
      id: 2,
      title: "Career Fair",
      date: "Mar 25",
      time: "10:00 AM",
      location: "Main Hall",
    },
    {
      id: 3,
      title: "Study Group",
      date: "Mar 22",
      time: "5:30 PM",
      location: "Library Rm 204",
    },
  ];

  const stats = [
    {
      id: 1,
      title: "Total Events",
      value: "24",
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
                      {studentProfile.college?.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Department & Year</p>
                    <p className="font-medium">
                      {studentProfile.college?.department} (Year{" "}
                      {studentProfile.college?.year})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No profile information available.</p>
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
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="mb-4 last:mb-0 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-start">
                  <div className="bg-indigo-50 rounded-lg p-2 mr-4 text-center min-w-16">
                    <p className="text-xs text-indigo-600 font-medium">
                      {event.date}
                    </p>
                    <p className="text-sm font-bold text-indigo-700">
                      {event.time}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="p-4">
            {recentActivities.map((activity) => (
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
                    <p className="text-sm text-gray-700">{activity.content}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" /> {activity.time}
                    </p>
                  </div>
                </div>
                <div className="ml-8 mt-3 mb-4 border-b border-gray-100 last:border-0"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
