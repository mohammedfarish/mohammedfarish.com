/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkFrontmatter from "remark-frontmatter";

function Markdown({ text }) {
  return (
    <div className="
    flex
    prose
    prose-img:xs:w-full
    max-w-prose
    min-w-full
    xs:w-full
    leading-relaxed
    prose-blockquote:border-0
    text-base
    prose-code:selection:bg-mf-white
    prose-code:selection:text-mf-black
    prose-pre:bg-mf-black
    prose-pre:drop-shadow-sm
    prose-pre:rounded-lg
    prose-headings:text-mf-black
    "
    >
      <ReactMarkdown
        className="min-w-full"
        remarkPlugins={[
          remarkGfm,
          remarkFrontmatter,
        ]}
        rehypePlugins={[rehypeRaw]}
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
