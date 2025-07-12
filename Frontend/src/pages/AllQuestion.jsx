import React, { useEffect, useState } from "react";
import { API } from "../lib/axios";
import { Link } from "react-router-dom";

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      const res = await API.get("/questions");
      setQuestions(res.data);
    } catch (err) {
      console.error("❌ Error fetching questions:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
        <p className="text-xl">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-8 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">All Questions</h1>

        {questions.length === 0 ? (
          <p className="text-center text-purple-200">No questions found.</p>
        ) : (
          questions.map((q) => (
            <div
              key={q._id}
              className="bg-[#2a1f4d] hover:bg-[#3b2a61] transition p-6 rounded-lg mb-6 shadow-lg"
            >
              <Link to={`/questions/${q._id}`}>
                <h2 className="text-2xl font-semibold text-purple-300 hover:underline">{q.title}</h2>
              </Link>

              <div
                className="text-purple-100 mt-3 text-sm"
                dangerouslySetInnerHTML={{ __html: q.description }}
              />

              <div className="mt-4 flex gap-2 flex-wrap">
                {q.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="text-xs text-purple-300 mt-4">
                Asked by <span className="font-semibold">{q.user?.fullName || "Anonymous"}</span> on{" "}
                {new Date(q.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllQuestions;
