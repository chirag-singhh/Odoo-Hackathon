import React, { useState, useEffect } from "react";
import { API } from "../lib/axios";
import { Link } from "react-router-dom";

const QuestionsByTag = ({ isLoggedIn }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get("/questions");
        const data = Array.isArray(res.data) ? res.data : res.data.questions || [];
        setQuestions(data);
      } catch (err) {
        console.error("❌ Error loading questions:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Extract unique tags
  const allTags = Array.from(new Set(questions.flatMap((q) => q.tags || [])));

  // Filtered questions based on selected tag
  const filteredQuestions = selectedTag
    ? questions.filter((q) => q.tags.includes(selectedTag))
    : questions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-8 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Browse Questions by Tag</h1>

        {/* Tag Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              selectedTag === null
                ? "bg-purple-800"
                : "bg-[#2a1f4d] hover:bg-purple-700"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                selectedTag === tag
                  ? "bg-purple-800"
                  : "bg-[#2a1f4d] hover:bg-purple-700"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Questions List */}
        {loading ? (
          <p className="text-purple-200 text-center">Loading questions...</p>
        ) : filteredQuestions.length === 0 ? (
          <p className="text-purple-200 text-center">No questions found for this tag.</p>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map((q) => (
              <div
                key={q._id}
                className="bg-[#2a1f4d] p-5 rounded-lg shadow-md hover:bg-[#3b2a61] transition"
              >
                <div className="mb-2 flex flex-wrap gap-2">
                  {q.tags.map((tag) => (
                    <span key={tag} className="bg-purple-700 text-xs px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link to={`/questions/${q._id}`}>
                  <h3 className="text-lg font-bold hover:underline">{q.title}</h3>
                </Link>
                {/* {isLoggedIn ? (
  <Link to={`/questions/${q._id}`}>
    <h3 className="text-lg font-bold hover:underline">{q.title}</h3>
  </Link>
) : (
  <h3 className="text-lg font-bold text-gray-400 cursor-not-allowed" title="Login to view question">
    {q.title}
  </h3>
)} */}
                <p className="text-sm text-purple-100 mt-1">{q.description}</p>
                <div className="mt-2 text-sm text-purple-300">
                  Upvotes: {q.upvotes || 0}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsByTag;
