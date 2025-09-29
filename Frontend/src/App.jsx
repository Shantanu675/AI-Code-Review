import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import remarkGfm from 'remark-gfm';
import axios from "axios"
import './App.css'

const apiUrl = import.meta.env.VITE_API_URL; // Vite

function App() {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(`

`)
  const [review, setReview] = useState('');

  useEffect(() =>{
    prism.highlightAll()
  },[code, review])

  async function review_code() {
    try {
      setIsLoading(true);
      setReview('');
      const response = await axios.post(apiUrl, { code })
      console.log(response.data);
      setReview(response.data);
    } catch (error) {
      console.error("Error occurred while getting review:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <>
      <main>
        <div className='left'>
          <div className='code'>
          <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 20,
                height: "100%",
                bottom: "0px",
                width: "100%",
              }}
            />
          </div>
          <button
            onClick={review_code}
            className="review"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Review'}
          </button>
        </div>
        <div className='right' style={{
          wordSpacing: "1rem",
          lineHeightStep: "1rem",
        }}>
          {isLoading ? (
            <div className="loading-container">
              <div className="bouncing-ball"></div>
              <div className="bouncing-ball"></div>
              <div className="bouncing-ball"></div>
            </div>
          ) : (
            <Markdown
              rehypePlugins={[rehypeHighlight]}
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {review}
            </Markdown>
          )}
        </div>
      </main>
    </>
  )
}

export default App
