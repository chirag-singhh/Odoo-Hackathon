



import React, { useEffect, useState, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { API } from "../lib/axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);
  let userId = null;
  try {
    userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;
  } catch {}

  const editorRef = useRef(null);

  const modules = useMemo(() => ({
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  }), []);

  const formats = [
    "header", "font", "size",
    "bold", "italic", "underline", "strike",
    "list", "bullet",
    "link"
  ];

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const qRes = await API.get(`/questions/${id}`);
        setQuestion(qRes.data);

        const aRes = await API.get(`/answers/${id}`);
        setAnswers(aRes.data);
      } catch (err) {
        console.error("❌ Error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handlePostAnswer = async () => {
    if (!newAnswer.trim()) return;
    setPosting(true);
    try {
      const res = await API.post(
        `/answers/${id}`,
        { description: newAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAnswers((prev) => [res.data.answer, ...prev]);
      setNewAnswer("");
    } catch (err) {
      console.error("❌ Failed to post answer:", err.response?.data || err.message);
    } finally {
      setPosting(false);
    }
  };

  const handleVote = async (answerId, voteType) => {
    if (!isLoggedIn) return alert("Please log in to vote.");
    try {
      const res = await API.put(
        `/answers/${answerId}/vote`,
        { voteType },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAnswers((prev) =>
        prev.map((a) => (a._id === answerId ? res.data.answer : a))
      );
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || err.message));
    }
  };

  const handleAccept = async (answerId) => {
    try {
      const res = await API.patch(
        `/answers/${answerId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAnswers((prev) =>
        prev.map((a) => ({
          ...a,
          isAccepted: a._id === answerId,
        }))
      );
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <p className="text-center text-white mt-10">Loading...</p>;
  if (!question) return <p className="text-center text-red-500">Question not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-8 text-white">
      <div className="max-w-4xl mx-auto bg-[#2a1f4d] p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
        <div className="prose max-w-none bg-white rounded p-4 text-black mb-4" dangerouslySetInnerHTML={{ __html: question.description }} />

        <div className="flex gap-2 flex-wrap mb-3">
          {question.tags?.map((tag, idx) => (
            <span key={idx} className="bg-purple-300 text-purple-900 px-2 py-1 rounded text-sm">#{tag}</span>
          ))}
        </div>

        <div className="text-sm text-purple-300 mb-6">
          Asked by <strong>{question.user?.fullName || "Anonymous"}</strong> on{" "}
          {new Date(question.createdAt).toLocaleString()}
        </div>

        <hr className="border-purple-600 mb-6" />

        <h2 className="text-2xl font-semibold mb-4">Answers</h2>

        {answers.length === 0 ? (
          <p className="text-purple-200">No answers yet. Be the first to answer!</p>
        ) : (
          answers.map((ans) => (
            <div
              key={ans._id}
              className={`bg-[#3b2a61] p-4 mb-4 rounded shadow ${ans.isAccepted ? "border-l-4 border-green-400" : ""}`}
            >
              <div className="mb-2 text-sm text-purple-200">
                By {ans.user?.fullName || "Anonymous"} on {new Date(ans.createdAt).toLocaleString()}
              </div>
              <div
                className="text-white mb-3"
                dangerouslySetInnerHTML={{ __html: ans.description }}
              />
              {ans.isAccepted && (
                <div className="text-green-400 text-sm font-bold mb-2">✔ Accepted Answer</div>
              )}
              <div className="flex items-center gap-3 text-sm">
                {isLoggedIn && (
                  <>
                    <button
                      onClick={() => handleVote(ans._id, "up")}
                      className="text-green-400 hover:underline"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => handleVote(ans._id, "down")}
                      className="text-red-400 hover:underline"
                    >
                      👎
                    </button>
                  </>
                )}
                <span className="text-purple-200 ml-2">Votes: {ans.votes}</span>

                {isLoggedIn &&
                  userId === question.user?._id &&
                  !ans.isAccepted && (
                    <button
                      onClick={() => handleAccept(ans._id)}
                      className="ml-auto text-green-300 hover:underline"
                    >
                      ✔ Accept
                    </button>
                  )}
              </div>
            </div>
          ))
        )}

        {/* Post Answer Section */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-2">Your Answer</h3>
          {isLoggedIn ? (
            <>
              <div className="bg-white rounded p-2 mb-4">
                <ReactQuill
                  ref={editorRef}
                  value={newAnswer}
                  onChange={setNewAnswer}
                  modules={modules}
                  formats={formats}
                  placeholder="Write your answer..."
                  theme="snow"
                  className="text-black"
                />
              </div>
              <button
                onClick={handlePostAnswer}
                disabled={posting}
                className="bg-purple-700 hover:bg-purple-600 px-6 py-2 rounded-lg font-bold"
              >
                {posting ? "Posting..." : "Post Answer"}
              </button>
            </>
          ) : (
            <p className="text-purple-300">
              Please{" "}
              <Link to="/login" className="text-purple-400 underline hover:text-purple-200">
                log in
              </Link>{" "}
              to post an answer.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;

