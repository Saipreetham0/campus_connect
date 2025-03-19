
// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { db } from "@/lib/firebase";
// import { collection, query, where, getDocs, orderBy, limit, startAfter, DocumentData } from "firebase/firestore";
// import { Search, User, Mail, School, BookOpen } from "lucide-react";
// import Link from "next/link";

// type Student = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   studentId: string;
//   college: {
//     name: string;
//     department: string;
//     year: string;
//   };
// };

// export default function StudentSearch() {
//   const searchParams = useSearchParams();
//   const urlSearchQuery = searchParams.get('q');

//   const [searchTerm, setSearchTerm] = useState(urlSearchQuery || "");
//   const [searchResults, setSearchResults] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [noResults, setNoResults] = useState(false);
//   const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [allResultsLoaded, setAllResultsLoaded] = useState(false);

//   // Execute search when component mounts if there's a query parameter
//   useEffect(() => {
//     if (urlSearchQuery) {
//       searchStudents(urlSearchQuery);
//     }
//   }, [urlSearchQuery]);

//   const searchStudents = async (term: string) => {
//     if (!term.trim()) {
//       setSearchResults([]);
//       setNoResults(false);
//       return;
//     }

//     setLoading(true);
//     setNoResults(false);

//     try {
//       // Format the term for case-insensitive search
//       const searchTermLower = term.toLowerCase();

//       // Create a query against the students collection
//       const studentsRef = collection(db, "students");

//       // Perform search using lowercase fields
//       const firstNameQuery = query(
//         studentsRef,
//         where("firstName_lower", ">=", searchTermLower),
//         where("firstName_lower", "<=", searchTermLower + "\uf8ff"),
//         orderBy("firstName_lower"),
//         limit(10)
//       );

//       const lastNameQuery = query(
//         studentsRef,
//         where("lastName_lower", ">=", searchTermLower),
//         where("lastName_lower", "<=", searchTermLower + "\uf8ff"),
//         orderBy("lastName_lower"),
//         limit(10)
//       );

//       const emailQuery = query(
//         studentsRef,
//         where("email_lower", ">=", searchTermLower),
//         where("email_lower", "<=", searchTermLower + "\uf8ff"),
//         orderBy("email_lower"),
//         limit(10)
//       );

//       // Execute all queries
//       const [firstNameSnapshot, lastNameSnapshot, emailSnapshot] = await Promise.all([
//         getDocs(firstNameQuery),
//         getDocs(lastNameQuery),
//         getDocs(emailQuery)
//       ]);

//       // Combine and deduplicate results
//       const studentsMap = new Map<string, Student>();

//       // Process results from all queries
//       const processSnapshot = (snapshot) => {
//         snapshot.forEach((doc) => {
//           if (!studentsMap.has(doc.id)) {
//             const data = doc.data();
//             studentsMap.set(doc.id, {
//               id: doc.id,
//               firstName: data.firstName,
//               lastName: data.lastName,
//               email: data.email,
//               studentId: data.studentId,
//               college: data.college,
//             });
//           }
//         });
//       };

//       processSnapshot(firstNameSnapshot);
//       processSnapshot(lastNameSnapshot);
//       processSnapshot(emailSnapshot);

//       const results = Array.from(studentsMap.values());

//       setSearchResults(results);
//       setNoResults(results.length === 0);

//       // Store the last visible document for pagination
//       if (results.length > 0) {
//         const lastDoc = lastNameSnapshot.docs[lastNameSnapshot.docs.length - 1] ||
//                         firstNameSnapshot.docs[firstNameSnapshot.docs.length - 1] ||
//                         emailSnapshot.docs[emailSnapshot.docs.length - 1];
//         setLastVisible(lastDoc);
//         setAllResultsLoaded(results.length < 10);
//       } else {
//         setLastVisible(null);
//         setAllResultsLoaded(true);
//       }
//     } catch (error) {
//       console.error("Error searching students:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMoreResults = async () => {
//     if (!searchTerm.trim() || !lastVisible || loadingMore || allResultsLoaded) return;

//     setLoadingMore(true);

//     try {
//       const searchTermLower = searchTerm.toLowerCase();
//       const studentsRef = collection(db, "students");

//       const firstNameQuery = query(
//         studentsRef,
//         where("firstName_lower", ">=", searchTermLower),
//         where("firstName_lower", "<=", searchTermLower + "\uf8ff"),
//         orderBy("firstName_lower"),
//         startAfter(lastVisible),
//         limit(10)
//       );

//       const lastNameQuery = query(
//         studentsRef,
//         where("lastName_lower", ">=", searchTermLower),
//         where("lastName_lower", "<=", searchTermLower + "\uf8ff"),
//         orderBy("lastName_lower"),
//         startAfter(lastVisible),
//         limit(10)
//       );

//       const emailQuery = query(
//         studentsRef,
//         where("email_lower", ">=", searchTermLower),
//         where("email_lower", "<=", searchTermLower + "\uf8ff"),
//         orderBy("email_lower"),
//         startAfter(lastVisible),
//         limit(10)
//       );

//       const [firstNameSnapshot, lastNameSnapshot, emailSnapshot] = await Promise.all([
//         getDocs(firstNameQuery),
//         getDocs(lastNameQuery),
//         getDocs(emailQuery)
//       ]);

//       const studentsMap = new Map<string, Student>();

//       // Process new results and deduplicate with existing results
//       const existingIds = new Set(searchResults.map(student => student.id));

//       const processSnapshot = (snapshot) => {
//         snapshot.forEach((doc) => {
//           if (!existingIds.has(doc.id) && !studentsMap.has(doc.id)) {
//             const data = doc.data();
//             studentsMap.set(doc.id, {
//               id: doc.id,
//               firstName: data.firstName,
//               lastName: data.lastName,
//               email: data.email,
//               studentId: data.studentId,
//               college: data.college,
//             });
//           }
//         });
//       };

//       processSnapshot(firstNameSnapshot);
//       processSnapshot(lastNameSnapshot);
//       processSnapshot(emailSnapshot);

//       const newResults = Array.from(studentsMap.values());

//       if (newResults.length > 0) {
//         setSearchResults([...searchResults, ...newResults]);

//         const lastDoc = lastNameSnapshot.docs[lastNameSnapshot.docs.length - 1] ||
//                         firstNameSnapshot.docs[firstNameSnapshot.docs.length - 1] ||
//                         emailSnapshot.docs[emailSnapshot.docs.length - 1];
//         setLastVisible(lastDoc);
//         setAllResultsLoaded(newResults.length < 10);
//       } else {
//         setAllResultsLoaded(true);
//       }
//     } catch (error) {
//       console.error("Error loading more students:", error);
//     } finally {
//       setLoadingMore(false);
//     }
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     searchStudents(searchTerm);
//   };

//   return (
//     <div className="w-full">
//       <form onSubmit={handleSearch} className="mb-6">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//             <Search className="w-5 h-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-3 focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Search students by name or email..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="absolute right-2.5 bottom-2 bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             Search
//           </button>
//         </div>
//       </form>

//       {loading ? (
//         <div className="flex justify-center items-center py-10">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
//         </div>
//       ) : noResults ? (
//         <div className="text-center py-10">
//           <p className="text-gray-500">No students found matching "{searchTerm}"</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {searchResults.map((student) => (
//             <div key={student.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md">
//               <Link href={`/dashboard/students/${student.id}`} className="block">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
//                       <User className="w-6 h-6 text-indigo-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-lg">
//                         {student.firstName} {student.lastName}
//                       </h3>
//                       <div className="flex flex-col text-sm text-gray-500">
//                         <div className="flex items-center">
//                           <Mail className="w-4 h-4 mr-1" />
//                           <span>{student.email}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <School className="w-4 h-4 mr-1" />
//                           <span>{student.college.name}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-2 md:mt-0 text-right">
//                     <div className="inline-flex items-center bg-indigo-50 px-3 py-1 rounded-full text-sm text-indigo-700">
//                       <BookOpen className="w-4 h-4 mr-1" />
//                       <span>{student.college.department}</span>
//                     </div>
//                     <div className="text-sm text-gray-500 mt-1">Year: {student.college.year}</div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}

//           {searchResults.length > 0 && !allResultsLoaded && (
//             <div className="text-center py-4">
//               <button
//                 onClick={loadMoreResults}
//                 disabled={loadingMore}
//                 className="bg-white text-indigo-600 px-4 py-2 rounded-lg border border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 {loadingMore ? (
//                   <span className="flex items-center">
//                     <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500 mr-2"></div>
//                     Loading...
//                   </span>
//                 ) : (
//                   "Load More"
//                 )}
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { Search, User, Mail, School, BookOpen } from "lucide-react";
import Link from "next/link";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  college: {
    name: string;
    department: string;
    year: string;
  };
};

export default function StudentSearch() {
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get('q');

  const [searchTerm, setSearchTerm] = useState(urlSearchQuery || "");
  const [searchResults, setSearchResults] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allResultsLoaded, setAllResultsLoaded] = useState(false);

  // Execute search when component mounts if there's a query parameter
  useEffect(() => {
    if (urlSearchQuery) {
      searchStudents(urlSearchQuery);
    }
  }, [urlSearchQuery]);

  const searchStudents = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      setNoResults(false);
      return;
    }

    setLoading(true);
    setNoResults(false);

    try {
      // Format the term for case-insensitive search
      const searchTermLower = term.toLowerCase();

      // Create a query against the students collection
      const studentsRef = collection(db, "students");

      // Perform search using lowercase fields
      const firstNameQuery = query(
        studentsRef,
        where("firstName_lower", ">=", searchTermLower),
        where("firstName_lower", "<=", searchTermLower + "\uf8ff"),
        orderBy("firstName_lower"),
        limit(10)
      );

      const lastNameQuery = query(
        studentsRef,
        where("lastName_lower", ">=", searchTermLower),
        where("lastName_lower", "<=", searchTermLower + "\uf8ff"),
        orderBy("lastName_lower"),
        limit(10)
      );

      const emailQuery = query(
        studentsRef,
        where("email_lower", ">=", searchTermLower),
        where("email_lower", "<=", searchTermLower + "\uf8ff"),
        orderBy("email_lower"),
        limit(10)
      );

      // Execute all queries
      const [firstNameSnapshot, lastNameSnapshot, emailSnapshot] = await Promise.all([
        getDocs(firstNameQuery),
        getDocs(lastNameQuery),
        getDocs(emailQuery)
      ]);

      // Combine and deduplicate results
      const studentsMap = new Map<string, Student>();

      // Process results from all queries
      const processSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
        snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          if (!studentsMap.has(doc.id)) {
            const data = doc.data();
            studentsMap.set(doc.id, {
              id: doc.id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              studentId: data.studentId,
              college: data.college,
            });
          }
        });
      };

      processSnapshot(firstNameSnapshot);
      processSnapshot(lastNameSnapshot);
      processSnapshot(emailSnapshot);

      const results = Array.from(studentsMap.values());

      setSearchResults(results);
      setNoResults(results.length === 0);

      // Store the last visible document for pagination
      if (results.length > 0) {
        const lastDoc = lastNameSnapshot.docs[lastNameSnapshot.docs.length - 1] ||
                        firstNameSnapshot.docs[firstNameSnapshot.docs.length - 1] ||
                        emailSnapshot.docs[emailSnapshot.docs.length - 1];
        setLastVisible(lastDoc);
        setAllResultsLoaded(results.length < 10);
      } else {
        setLastVisible(null);
        setAllResultsLoaded(true);
      }
    } catch (error) {
      console.error("Error searching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreResults = async () => {
    if (!searchTerm.trim() || !lastVisible || loadingMore || allResultsLoaded) return;

    setLoadingMore(true);

    try {
      const searchTermLower = searchTerm.toLowerCase();
      const studentsRef = collection(db, "students");

      const firstNameQuery = query(
        studentsRef,
        where("firstName_lower", ">=", searchTermLower),
        where("firstName_lower", "<=", searchTermLower + "\uf8ff"),
        orderBy("firstName_lower"),
        startAfter(lastVisible),
        limit(10)
      );

      const lastNameQuery = query(
        studentsRef,
        where("lastName_lower", ">=", searchTermLower),
        where("lastName_lower", "<=", searchTermLower + "\uf8ff"),
        orderBy("lastName_lower"),
        startAfter(lastVisible),
        limit(10)
      );

      const emailQuery = query(
        studentsRef,
        where("email_lower", ">=", searchTermLower),
        where("email_lower", "<=", searchTermLower + "\uf8ff"),
        orderBy("email_lower"),
        startAfter(lastVisible),
        limit(10)
      );

      const [firstNameSnapshot, lastNameSnapshot, emailSnapshot] = await Promise.all([
        getDocs(firstNameQuery),
        getDocs(lastNameQuery),
        getDocs(emailQuery)
      ]);

      const studentsMap = new Map<string, Student>();

      // Process new results and deduplicate with existing results
      const existingIds = new Set(searchResults.map(student => student.id));

      const processSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
        snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          if (!existingIds.has(doc.id) && !studentsMap.has(doc.id)) {
            const data = doc.data();
            studentsMap.set(doc.id, {
              id: doc.id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              studentId: data.studentId,
              college: data.college,
            });
          }
        });
      };

      processSnapshot(firstNameSnapshot);
      processSnapshot(lastNameSnapshot);
      processSnapshot(emailSnapshot);

      const newResults = Array.from(studentsMap.values());

      if (newResults.length > 0) {
        setSearchResults([...searchResults, ...newResults]);

        const lastDoc = lastNameSnapshot.docs[lastNameSnapshot.docs.length - 1] ||
                        firstNameSnapshot.docs[firstNameSnapshot.docs.length - 1] ||
                        emailSnapshot.docs[emailSnapshot.docs.length - 1];
        setLastVisible(lastDoc);
        setAllResultsLoaded(newResults.length < 10);
      } else {
        setAllResultsLoaded(true);
      }
    } catch (error) {
      console.error("Error loading more students:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchStudents(searchTerm);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-3 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search students by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-2 bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : noResults ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No students found matching &quot;{searchTerm}&quot;</p>
        </div>
      ) : (
        <div className="space-y-4">
          {searchResults.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md">
              <Link href={`/dashboard/students/${student.id}`} className="block">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">
                        {student.firstName} {student.lastName}
                      </h3>
                      <div className="flex flex-col text-sm text-gray-500">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          <span>{student.email}</span>
                        </div>
                        <div className="flex items-center">
                          <School className="w-4 h-4 mr-1" />
                          <span>{student.college.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <div className="inline-flex items-center bg-indigo-50 px-3 py-1 rounded-full text-sm text-indigo-700">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>{student.college.department}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Year: {student.college.year}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {searchResults.length > 0 && !allResultsLoaded && (
            <div className="text-center py-4">
              <button
                onClick={loadMoreResults}
                disabled={loadingMore}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg border border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {loadingMore ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500 mr-2"></div>
                    Loading...
                  </span>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}