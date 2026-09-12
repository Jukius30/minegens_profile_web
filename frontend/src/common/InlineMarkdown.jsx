import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function InlineMarkdown({ content, className = "", style = {} }) {
  if (!content) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Hilangkan tag <p> pembungkus agar styling heading (h1, h2, h3) tidak rusak
        p: ({ node, ...props }) => (
          <span className={className} style={style} {...props} />
        ),
        strong: ({ node, ...props }) => (
          <strong className="text-white fw-bold" {...props} />
        ),
        em: ({ node, ...props }) => (
          <em className="text-info fst-italic" {...props} />
        ),
        code: ({ node, inline, ...props }) => (
          <code
            className="px-1.5 py-0.5 rounded text-info fw-medium"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              fontSize: "0.85em",
            }}
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}