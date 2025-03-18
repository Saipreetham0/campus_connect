"use client";

import {
  //   FolderKanban,
  Clock,
  Users,
  //   Tag,
  Plus,
  CheckSquare,
  Archive,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      name: "Campus Mobile App",
      description: "Developing a mobile app for campus resources and events",
      progress: 75,
      status: "In Progress",
      dueDate: "April 15, 2025",
      team: 6,
      tasks: { completed: 24, total: 32 },
      category: "Development",
      priority: "High",
    },
    {
      id: 2,
      name: "Research Symposium",
      description: "Organizing annual student research presentations",
      progress: 40,
      status: "In Progress",
      dueDate: "May 10, 2025",
      team: 8,
      tasks: { completed: 12, total: 30 },
      category: "Event",
      priority: "Medium",
    },
    {
      id: 3,
      name: "Library Redesign",
      description: "Student-led initiative to redesign library study spaces",
      progress: 20,
      status: "Planning",
      dueDate: "June 30, 2025",
      team: 5,
      tasks: { completed: 6, total: 28 },
      category: "Design",
      priority: "Medium",
    },
    {
      id: 4,
      name: "Sustainability Report",
      description: "Annual campus sustainability assessment and report",
      progress: 90,
      status: "Review",
      dueDate: "March 31, 2025",
      team: 4,
      tasks: { completed: 18, total: 20 },
      category: "Research",
      priority: "High",
    },
    {
      id: 5,
      name: "Mentorship Program",
      description:
        "Connecting freshmen with upperclassmen mentors for academic guidance",
      progress: 60,
      status: "In Progress",
      dueDate: "April 20, 2025",
      team: 7,
      tasks: { completed: 15, total: 25 },
      category: "Community",
      priority: "Medium",
    },
    {
      id: 6,
      name: "Campus Tour VR Experience",
      description:
        "Creating a virtual reality campus tour for prospective students",
      progress: 30,
      status: "Planning",
      dueDate: "July 15, 2025",
      team: 5,
      tasks: { completed: 8, total: 26 },
      category: "Development",
      priority: "Low",
    },
  ];

  const categories = [
    "All",
    "Development",
    "Event",
    "Design",
    "Research",
    "Community",
  ];
  const statuses = ["All", "Planning", "In Progress", "Review", "Completed"];

  // Function to determine color based on priority
interface PriorityColors {
    [key: string]: string;
}

const getPriorityColor = (priority: string): string => {
    const priorityColors: PriorityColors = {
        High: "text-red-600 bg-red-50",
        Medium: "text-amber-600 bg-amber-50",
        Low: "text-green-600 bg-green-50",
    };

    return priorityColors[priority] || "text-gray-600 bg-gray-50";
};

  // Function to determine color based on status
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Planning":
        return "text-blue-600 bg-blue-50";
      case "In Progress":
        return "text-amber-600 bg-amber-50";
      case "Review":
        return "text-purple-600 bg-purple-50";
      case "Completed":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
          <p className="text-gray-600">
            Track and manage collaborative projects
          </p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          New Project
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
            />
          </div>

          <div className="flex gap-3">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5">
              <option value="">Filter by Status</option>
              {statuses.map((status) => (
                <option key={status} value={status === "All" ? "" : status}>
                  {status}
                </option>
              ))}
            </select>

            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        <div className="p-4 border-t overflow-x-auto">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 rounded-full text-sm ${
                  category === "All"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">{project.name}</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                {project.description}
              </p>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-2">
                <div className="border rounded-md p-2">
                  <div className="text-xs text-gray-500">Due Date</div>
                  <div className="text-sm font-medium flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    {project.dueDate}
                  </div>
                </div>
                <div className="border rounded-md p-2">
                  <div className="text-xs text-gray-500">Team</div>
                  <div className="text-sm font-medium flex items-center">
                    <Users className="w-4 h-4 mr-1 text-gray-400" />
                    {project.team} members
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <CheckSquare className="w-4 h-4 mr-1 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {project.tasks.completed}/{project.tasks.total} tasks
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                    project.priority
                  )}`}
                >
                  {project.priority}
                </span>
              </div>

              <button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-1.5 rounded text-sm">
                View Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Archived Projects */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            <Archive className="w-5 h-5 mr-2 text-gray-500" />
            Archived Projects
          </h2>
          <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
            <ArrowUpDown className="w-4 h-4 mr-1" />
            Sort by Date
          </button>
        </div>

        <div className="p-4">
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-500 mb-2">No archived projects yet</p>
            <p className="text-sm text-gray-400">
              Completed projects will appear here after they&apos;re archived
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
