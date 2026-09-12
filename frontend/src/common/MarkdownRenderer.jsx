import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => (
            <div className="table-responsive my-3">
              <table
                className="table table-dark table-bordered table-hover align-middle mb-0"
                style={{
                  backgroundColor: "#0f172a",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                }}
                {...props}
              />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-3 py-2 fw-semibold"
              style={{
                backgroundColor: "rgba(47, 116, 255, 0.15)",
                color: "#93c5fd",
                borderColor: "rgba(255, 255, 255, 0.15)",
                fontSize: "13.5px",
              }}
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="px-3 py-2 text-white-50"
              style={{
                borderColor: "rgba(255, 255, 255, 0.08)",
                fontSize: "13.5px",
              }}
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong className="text-white fw-bold" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-3" style={{ lineHeight: "1.75" }} {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="ps-3 mb-3" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="ps-3 mb-3" {...props} />
          ),
          code: ({ node, inline, ...props }) => (
            <code
              className="px-1.5 py-0.5 rounded text-info"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                fontSize: "12.5px",
              }}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}