import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { generateHeadingId } from '@/lib/table-of-contents';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) {
    return (
      <div className="text-gray-500 italic py-8">
        No content available for this post.
      </div>
    );
  }
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-purple-600 prose-a:hover:text-purple-700 prose-code:text-purple-600 prose-pre:bg-gray-50 prose-blockquote:border-green-400 prose-blockquote:text-gray-600">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => {
            const text = String(children);
            const id = generateHeadingId(text);
            return (
              <h2 id={id} className="text-2xl font-semibold text-gray-900 mb-4 mt-8 scroll-mt-24">
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = String(children);
            const id = generateHeadingId(text);
            return (
              <h3 id={id} className="text-xl font-semibold text-gray-900 mb-3 mt-6 scroll-mt-24">
                {children}
              </h3>
            );
          },
          p: ({ children }) => (
            <p className="text-gray-700 leading-relaxed mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-700">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-green-400 pl-4 py-2 my-4 bg-gray-50 italic text-gray-600">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-100 text-purple-600 px-1 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className={className}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-purple-600 hover:text-purple-700 underline transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-700">
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}