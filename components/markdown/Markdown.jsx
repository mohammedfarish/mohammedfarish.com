/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkFrontMatter from "remark-frontmatter";
import rehypeCodeTitles from "rehype-code-titles";

function Markdown({ text }) {
  return (
    <div className="
    flex
    prose
    max-w-prose
    min-w-full
    xs:w-full
    leading-relaxed
    prose-blockquote:border-0
    text-current
    prose-pre:drop-shadow-sm
    prose-pre:rounded-lg
    prose-pre:p-0
    prose-pre:m-0
    prose-code:selection:bg-mf-white
    prose-code:selection:text-mf-black
    prose-pre:bg-[#1e1e1e]
    prose-headings:text-mf-black
    "
    >
      <ReactMarkdown
        className="min-w-full"
        remarkPlugins={[
          remarkGfm,
          remarkFrontMatter,
        ]}
        rehypePlugins={[
          rehypeRaw,
          rehypeCodeTitles,
        ]}
        components={{
          code({
            node, inline, className,
            children, ...props
          }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={dark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

export default Markdown;
