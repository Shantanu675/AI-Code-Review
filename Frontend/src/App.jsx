// import { useState, useEffect } from 'react'
// import "prismjs/themes/prism-tomorrow.css"
// import Editor from "react-simple-code-editor"
// import prism from "prismjs"
// import Markdown from "react-markdown"
// import rehypeHighlight from "rehype-highlight"
// import "highlight.js/styles/github-dark.css"
// import remarkGfm from 'remark-gfm';
// import axios from "axios"
// import './App.css'

// const apiUrl = import.meta.env.VITE_API_URL; // Vite

// function App() {
//   const [count, setCount] = useState(0)
//   const [isLoading, setIsLoading] = useState(false);
//   const [code, setCode] = useState(`

// `)
//   const [review, setReview] = useState('');

//   useEffect(() =>{
//     prism.highlightAll()
//   },[code, review])

//   async function review_code() {
//     try {
//       console.log("pass1");
//       setIsLoading(true);
//       setReview('');
//       const response = await axios.post(apiUrl, { code })
//       console.log(response.data);
//       setReview(response.data);
//     } catch (error) {
//       console.error("Error occurred while getting review:", error);
//       alert("Something went wrong. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   }
  
//   return (
//     <>
//       <main>
//         <div className='left'>
//           <div className='code'>
//           <Editor
//               value={code}
//               onValueChange={code => setCode(code)}
//               highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
//               padding={10}
//               style={{
//                 fontFamily: '"Fira code", "Fira Mono", monospace',
//                 fontSize: 20,
//                 height: "100%",
//                 bottom: "0px",
//                 width: "100%",
//               }}
//             />
//           </div>
//           <button
//             onClick={review_code}
//             className="review"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Loading...' : 'Review'}
//           </button>
//         </div>
//         <div className='right' style={{
//           wordSpacing: "1rem",
//           lineHeightStep: "1rem",
//         }}>
//           {isLoading ? (
//             <div className="loading-container">
//               <div className="bouncing-ball"></div>
//               <div className="bouncing-ball"></div>
//               <div className="bouncing-ball"></div>
//             </div>
//           ) : (
//             <Markdown
//               rehypePlugins={[rehypeHighlight]}
//               remarkPlugins={[remarkGfm]}
//               components={{
//                 code({ node, inline, className, children, ...props }) {
//                   return (
//                     <code className={className} {...props}>
//                       {children}
//                     </code>
//                   );
//                 }
//               }}
//             >
//               {review}
//             </Markdown>
//           )}
//         </div>
//       </main>
//     </>
//   )
// }

// export default App

import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import axios from "axios";
import "./App.css";

let requestInProgress = false;


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

api.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 429) {
      await new Promise(r => setTimeout(r, 2000));
    }
    return Promise.reject(error);
  }
);

function App() {
  const [code, setCode] = useState(`// Paste your code here`);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, [code, review]);

<<<<<<< HEAD
  const review_code = async () => {
    if (requestInProgress) return; // 🔒 HARD LOCK
  
    if (!code.trim()) {
      alert("Please enter some code to review.");
      return;
=======
  useEffect(() =>{
    prism.highlightAll()
  },[code, review])

  async function review_code() {
    try {
      const response = await axios.post('https://vercel.com/shantanu675s-projects/ai-code-review/8waCxzPpHGjFDCLUY6faKVvk4p5Y',{code})
      console.log(response.data);
      setReview(response.data);
    } catch (error) {
      console.error("Error occurred while getting review:", error);
      alert("Something went wrong. Please try again later.");
>>>>>>> 031b30cc2ee4e377708d9613316a16ea727eaec4
    }
  
    requestInProgress = true;
  
    try {
      setIsLoading(true);
      setReview("");
  
      const res = await api.post("/get-review", { code });
      setReview(res.data);
    } catch (error) {
      if (error.response?.status === 429) {
        setReview("⏳ AI is busy. Please wait 30–60 seconds. ⏳");
      } else {
        setReview("❌ Failed to get review. Please try again.");
      }
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        requestInProgress = false; // unlock after cooldown
      }, 3000);
    }
  };
  

  return (
    <main>
      {/* LEFT PANEL */}
      <section className="left">
        <h2 className="panel-title">Code Editor</h2>

        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={16}
            className="editor"
          />
        </div>

        <button
          className="review"
          onClick={review_code}
          disabled={isLoading}
          style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
        >
          {isLoading ? "Reviewing..." : "Review Code"}
        </button>

      </section>

      {/* RIGHT PANEL */}
      <section className="right">
        <h2 className="panel-title">AI Review</h2>

        {isLoading ? (
          <div className="loading-container">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="markdown">
            <Markdown
              rehypePlugins={[rehypeHighlight]}
              remarkPlugins={[remarkGfm]}
            >
              {review || "🧠 AI review will appear here..."}
            </Markdown>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;

