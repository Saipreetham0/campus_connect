"use client";

import {
  Book,
  Calendar,
  Search,
  Tag,
  Filter,
  Clock,
  ChevronRight,
  User,
  BookOpen,
} from "lucide-react";

export default function FAQBlogs() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Student Projects",
      excerpt: "Learn about the best practices for student project management and collaboration tools.",
      category: "Guides",
      author: "Alex Johnson",
      publishDate: "March 15, 2025",
      readTime: "5 min read",
      tags: ["Projects", "Management", "Collaboration"]
    },
    {
      id: 2,
      title: "How to Apply for Project Funding",
      excerpt: "A comprehensive guide on the process and requirements for securing funding for your campus projects.",
      category: "Resources",
      author: "Maria Rodriguez",
      publishDate: "March 10, 2025",
      readTime: "8 min read",
      tags: ["Funding", "Resources", "Applications"]
    },
    {
      id: 3,
      title: "Project Showcase: Student Success Stories",
      excerpt: "Highlighting exceptional student projects from the previous semester and their impact.",
      category: "Showcase",
      author: "David Chen",
      publishDate: "March 5, 2025",
      readTime: "6 min read",
      tags: ["Success Stories", "Student Projects", "Showcase"]
    },
    {
      id: 4,
      title: "Frequently Asked Questions About Team Formation",
      excerpt: "Answers to common questions about forming teams, finding members, and establishing roles.",
      category: "FAQ",
      author: "Priya Patel",
      publishDate: "February 28, 2025",
      readTime: "4 min read",
      tags: ["Teams", "Collaboration", "FAQ"]
    },
    {
      id: 5,
      title: "Technology Resources Available on Campus",
      excerpt: "Detailed information about tech resources, equipment, and software available for student projects.",
      category: "Resources",
      author: "James Wilson",
      publishDate: "February 25, 2025",
      readTime: "7 min read",
      tags: ["Technology", "Resources", "Campus"]
    },
    {
      id: 6,
      title: "Project Deadlines and Important Dates",
      excerpt: "Key dates and deadlines for the current semester's project submissions and presentations.",
      category: "Announcements",
      author: "Sarah Kim",
      publishDate: "February 20, 2025",
      readTime: "3 min read",
      tags: ["Deadlines", "Calendar", "Important Dates"]
    },
  ];

  const categories = ["All", "Guides", "Resources", "Showcase", "FAQ", "Announcements"];
  const popularTags = ["Projects", "Resources", "Collaboration", "Technology", "Deadlines", "Teams"];

  // Function to determine category color
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "Guides":
        return "text-blue-600 bg-blue-50";
      case "Resources":
        return "text-green-600 bg-green-50";
      case "Showcase":
        return "text-purple-600 bg-purple-50";
      case "FAQ":
        return "text-amber-600 bg-amber-50";
      case "Announcements":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">FAQ & Resources</h1>
          <p className="text-gray-600">
            Guides, FAQs, and helpful resources for your projects
          </p>
        </div>
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
              placeholder="Search articles..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
            />
          </div>

          <div className="flex gap-3">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5">
              <option value="">Filter by Category</option>
              {categories.map((category) => (
                <option key={category} value={category === "All" ? "" : category}>
                  {category}
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
          <div className="flex items-center">
            <Tag className="w-4a h-4 text-gray-500 mr-2" />
            <span className="text-gray-500 text-sm mr-3">Popular Tags:</span>
            <div className="flex space-x-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog/FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <span
                className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                  post.category
                )}`}
              >
                {post.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-lg mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {post.excerpt}
              </p>

              <div className="mb-4 flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {post.publishDate}
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-1.5 rounded text-sm flex items-center justify-center">
                <BookOpen className="w-4 h-4 mr-1" />
                Read Article
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b flex items-center">
          <Book className="w-5 h-5 mr-2 text-indigo-600" />
          <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y">
          <details className="p-4 group cursor-pointer">
            <summary className="flex justify-between items-center font-medium text-gray-800">
              <span>How do I submit my project for review?</span>
              <ChevronRight className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform" />
            </summary>
            <div className="mt-3 text-gray-600 text-sm">
              <p>
                Projects can be submitted through the online portal by clicking the &quot;Submit Project&quot; button on your project dashboard. You&apos;ll need to include a project summary, team member information, and any relevant documentation or files. All submissions must be completed by the semester deadline.
              </p>
            </div>
          </details>

          <details className="p-4 group cursor-pointer">
            <summary className="flex justify-between items-center font-medium text-gray-800">
              <span>What resources are available for project development?</span>
              <ChevronRight className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform" />
            </summary>
            <div className="mt-3 text-gray-600 text-sm">
              <p>
                The university provides several resources including dedicated lab spaces, equipment borrowing services, software licenses, and mentorship programs. Visit the Resources section for a comprehensive list of available tools and how to access them.
              </p>
            </div>
          </details>

          <details className="p-4 group cursor-pointer">
            <summary className="flex justify-between items-center font-medium text-gray-800">
              <span>How can I find team members for my project?</span>
              <ChevronRight className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform" />
            </summary>
            <div className="mt-3 text-gray-600 text-sm">
              <p>
                You can find potential team members through the Team Formation Forum, departmental bulletin boards, or by attending networking events. The campus also hosts a quarterly Project Team Matchmaking event where students can pitch ideas and connect with interested collaborators.
              </p>
            </div>
          </details>

          <details className="p-4 group cursor-pointer">
            <summary className="flex justify-between items-center font-medium text-gray-800">
              <span>Are there funding opportunities for student projects?</span>
              <ChevronRight className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform" />
            </summary>
            <div className="mt-3 text-gray-600 text-sm">
              <p>
                Yes, the university offers several grant programs for student projects including the Innovation Fund, Sustainability Grants, and Department-Specific Research Awards. Applications typically open at the beginning of each semester. See our funding guide for application details and deadlines.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* Information Panel */}
      <div className="bg-indigo-50 rounded-lg p-6 mb-6">
        <h3 className="text-indigo-700 font-medium mb-2">About This Section</h3>
        <p className="text-indigo-800 text-sm mb-4">
          This page contains resources, guides, and frequently asked questions to help you with your projects. Articles are updated regularly with new information.
        </p>
        <div className="text-indigo-700 text-sm">
          <p className="mb-1">• Comments and likes are disabled for all articles</p>
          <p className="mb-1">• For questions, please contact the project support team</p>
          <p>• New articles are published every Monday</p>
        </div>
      </div>
    </div>
  );
}