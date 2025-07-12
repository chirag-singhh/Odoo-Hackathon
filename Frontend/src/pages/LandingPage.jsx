
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../lib/axios";

const QUESTIONS_PER_PAGE = 8;

const LandingPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get("/questions");
        const data = Array.isArray(res.data) ? res.data : res.data.questions || [];
        setQuestions(data);
      } catch (err) {
        console.error("Failed to fetch questions:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Filtering + Searching + Sorting
  const filteredQuestions = questions
    .filter((q) => {
      const matchesSearch =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = (() => {
        switch (activeFilter) {
          case "Unanswered":
            return q.answers?.length === 0;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (activeFilter) {
        case "Most Voted":
          return (b.upvotes || 0) - (a.upvotes || 0);
        case "Newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "Oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const currentQuestions = filteredQuestions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen text-white font-sans" style={{ background: "linear-gradient(135deg, #1e1b4b, #3f2d56)" }}>
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Questions</h2>
          {isLoggedIn ? (
            <Link to="/postquestion">
              <button className="bg-purple-800 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm">
                Ask New Question
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg text-sm">
                Login to Ask
              </button>
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search questions"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2a1f4d] text-white placeholder-purple-300 px-4 py-2 rounded-lg focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap mb-6">
          {["All", "Most Voted", "Newest", "Oldest", "Unanswered"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`text-sm px-4 py-1.5 rounded-lg ${
                activeFilter === filter ? "bg-purple-800" : "bg-[#2a1f4d] hover:bg-purple-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Questions List */}
        {loading ? (
          <p className="text-center text-purple-200">Loading questions...</p>
        ) : currentQuestions.length === 0 ? (
          <p className="text-center text-purple-200">No questions found.</p>
        ) : (
          <div className="space-y-6">
            {currentQuestions.map((q, index) => (
              <div
                key={q._id || index}
                className="flex gap-6 bg-[#2a1f4d] hover:bg-[#3b2a61] transition p-5 rounded-lg shadow-md flex-col md:flex-row"
              >
                <div className="flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <p className="text-purple-300 text-sm">{q.category || "General"}</p>
                    <Link to={`/questions/${q._id}`}>
                      <h3 className="text-lg font-bold hover:underline">{q.title}</h3>
                    </Link>
                    <p className="text-purple-100 text-sm">{q.description}</p>
                  </div>
                </div>
                {q.image && (
                  <div
                    className="w-full md:w-48 h-28 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${q.image})` }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {filteredQuestions.length > QUESTIONS_PER_PAGE && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 rounded"
            >
              Prev
            </button>
            <span className="text-purple-200">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 rounded"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default LandingPage;
