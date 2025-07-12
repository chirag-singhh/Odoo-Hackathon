// import React, { useState, useRef, useMemo } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";


// const AskQuestionPage = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [tags, setTags] = useState("");

//   const editorRef = useRef(null);

//   const modules = useMemo(() => ({
//     toolbar: [
//       [{ header: "1" }, { header: "2" }, { font: [] }],
//       [{ size: [] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link"],
//       ["clean"],
//     ],
//   }), []);

//   const formats = [
//     "header", "font", "size",
//     "bold", "italic", "underline", "strike",
//     "list", "bullet",
//     "link"
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ title, description, tags });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-8">
//       <div className="max-w-3xl mx-auto bg-[#2a1f4d] p-6 rounded-lg shadow-lg text-white">
//         <h2 className="text-3xl font-bold mb-6">Ask a Question</h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block mb-2">Title</label>
//             <input
//               type="text"
//               placeholder="Be specific and concise"
//               className="w-full p-3 rounded bg-[#3b2a61] text-white"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block mb-2">Description</label>
//             <div className="bg-white rounded p-2">
//               <ReactQuill
//                 ref={editorRef}
//                 value={description}
//                 onChange={setDescription}
//                 modules={modules}
//                 formats={formats}
//                 placeholder="Provide all information needed to answer your question…"
//                 theme="snow"
//                 className="text-black"
//               />
//             </div>
//           </div>

//           {/* Tags */}
//           <div>
//             <label className="block mb-2">Tags</label>
//             <input
//               type="text"
//               placeholder="Tags (comma separated)"
//               className="w-full p-3 rounded bg-[#3b2a61] text-white"
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-purple-700 hover:bg-purple-600 px-6 py-2 rounded-lg font-bold"
//           >
//             Submit Question
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AskQuestionPage;



import React, { useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { API } from "../lib/axios";
import { useNavigate } from "react-router-dom";

const AskQuestionPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/questions/",
        {
          title,
          description,
          tags: tags.split(",").map((tag) => tag.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Question submitted!");
      navigate("/"); // redirect to home or question list
    } catch (err) {
      console.error("❌ Failed to submit question:", err.response?.data || err.message);
      alert("Failed to submit question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-8">
      <div className="max-w-3xl mx-auto bg-[#2a1f4d] p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-6">Ask a Question</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              placeholder="Be specific and concise"
              className="w-full p-3 rounded bg-[#3b2a61] text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <div className="bg-white rounded p-2">
              <ReactQuill
                ref={editorRef}
                value={description}
                onChange={setDescription}
                modules={modules}
                formats={formats}
                placeholder="Provide all information needed to answer your question…"
                theme="snow"
                className="text-black"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Tags</label>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="w-full p-3 rounded bg-[#3b2a61] text-white"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-700 hover:bg-purple-600 px-6 py-2 rounded-lg font-bold"
          >
            {loading ? "Submitting..." : "Submit Question"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestionPage;
