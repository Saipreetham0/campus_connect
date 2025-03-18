'use client';

import { Users, UserPlus, Calendar, MessageSquare, Shield } from 'lucide-react';

export default function Groups() {
  const groups = [
    {
      id: 1,
      name: 'Computer Science Club',
      description: 'A community for CS students to collaborate on projects and share knowledge',
      members: 78,
      category: 'Academic',
      events: 12,
      image: 'cs-club'
    },
    {
      id: 2,
      name: 'Photography Society',
      description: 'Group for photography enthusiasts to share techniques and organize photo walks',
      members: 45,
      category: 'Creative',
      events: 8,
      image: 'photography'
    },
    {
      id: 3,
      name: 'Debate Team',
      description: 'Campus debate team preparing for regional and national competitions',
      members: 32,
      category: 'Academic',
      events: 15,
      image: 'debate'
    },
    {
      id: 4,
      name: 'Environmental Action',
      description: 'Students working on sustainability initiatives across campus',
      members: 56,
      category: 'Volunteer',
      events: 9,
      image: 'environment'
    },
    {
      id: 5,
      name: 'Basketball Club',
      description: 'Recreational basketball group for players of all skill levels',
      members: 40,
      category: 'Sports',
      events: 22,
      image: 'basketball'
    },
    {
      id: 6,
      name: 'Film Club',
      description: 'Weekly screenings and discussions of classic and contemporary films',
      members: 35,
      category: 'Creative',
      events: 4,
      image: 'film'
    }
  ];

  const myGroups = [
    {
      id: 1,
      name: 'Computer Science Club',
      role: 'Member',
      unread: 12,
      nextEvent: 'Tech Talk: March 21'
    },
    {
      id: 4,
      name: 'Environmental Action',
      role: 'Admin',
      unread: 5,
      nextEvent: 'Campus Cleanup: March 27'
    },
    {
      id: 6,
      name: 'Film Club',
      role: 'Member',
      unread: 0,
      nextEvent: 'Movie Night: March 24'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Campus Groups</h1>
          <p className="text-gray-600">Connect with others who share your interests</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
          <UserPlus className="w-5 h-5 mr-2" />
          Create Group
        </button>
      </div>

      {/* My Groups */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">My Groups</h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {myGroups.map((group) => (
            <div key={group.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-800">{group.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  group.role === 'Admin'
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {group.role}
                </span>
              </div>
              <div className="mt-3 space-y-2">
                <p className="text-sm text-gray-600 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  {group.nextEvent}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
                  {group.unread > 0 ? `${group.unread} unread messages` : 'No new messages'}
                </p>
              </div>
              <div className="mt-4">
                <button className="w-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded text-sm">
                  View Group
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Groups */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Discover Groups</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search groups..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full md:w-64 p-2"
            />
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-32 bg-indigo-200"></div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-800">{group.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                    {group.category}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{group.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {group.members} members
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {group.events} events
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-1.5 rounded text-sm">
                    Join Group
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
