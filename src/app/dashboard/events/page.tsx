'use client';

import { Calendar, MapPin, Clock, Filter, ArrowUpDown, Plus } from 'lucide-react';

export default function Events() {
  const events = [
    {
      id: 1,
      title: 'Tech Talk: Introduction to AI',
      date: 'March 21, 2025',
      time: '3:00 PM - 5:00 PM',
      location: 'Science Building, Room 304',
      organizer: 'Computer Science Club',
      category: 'Workshop',
      attendees: 45
    },
    {
      id: 2,
      title: 'Campus Career Fair',
      date: 'March 25, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Main Hall',
      organizer: 'Career Center',
      category: 'Career',
      attendees: 230
    },
    {
      id: 3,
      title: 'Study Group: Midterm Prep',
      date: 'March 22, 2025',
      time: '5:30 PM - 8:00 PM',
      location: 'Library, Room 204',
      organizer: 'Student Success Center',
      category: 'Academic',
      attendees: 18
    },
    {
      id: 4,
      title: 'Campus Cleanup Day',
      date: 'March 27, 2025',
      time: '9:00 AM - 12:00 PM',
      location: 'Campus Quad',
      organizer: 'Environmental Club',
      category: 'Volunteer',
      attendees: 67
    },
    {
      id: 5,
      title: 'Basketball Tournament',
      date: 'March 29, 2025',
      time: '1:00 PM - 6:00 PM',
      location: 'Sports Complex',
      organizer: 'Athletics Department',
      category: 'Sports',
      attendees: 120
    }
  ];

  const categories = ['All', 'Workshop', 'Career', 'Academic', 'Volunteer', 'Sports', 'Social'];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Campus Events</h1>
          <p className="text-gray-600">Discover and join events happening across campus</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Create Event
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
            />
          </div>

          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search events..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="p-4 border-t overflow-x-auto">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 rounded-full text-sm ${
                  category === 'All'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
          <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
            <ArrowUpDown className="w-4 h-4 mr-1" />
            Sort by Date
          </button>
        </div>

        <div className="divide-y">
          {events.map((event) => (
            <div key={event.id} className="p-4 hover:bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="bg-indigo-50 rounded-lg p-3 text-center min-w-24">
                  <p className="text-sm text-indigo-700 font-medium">
                    {event.date.split(',')[0]}
                  </p>
                  <p className="text-lg font-bold text-indigo-800">
                    {event.date.split(' ')[1].replace(',', '')}
                  </p>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {event.category}
                    </span>
                  </div>

                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {event.time}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {event.location}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Organized by {event.organizer}</p>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">{event.attendees} attending</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 md:mt-0">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
                    Join
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
