import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import detectLang from 'lang-detector';

const renderers = (ignore = []) => ({
  code: ({ language, value }) => {
    if (ignore.includes('code')) {
      return null;
    }

    if (!language) {
      language = detectLang(value)?.toLowerCase();

      switch (language) {
        case 'html':
          language = 'js';
          break;
      }
    }

    return (
      <div className="text-sm">
        <SyntaxHighlighter
          style={nord}
          showLineNumbers={true}
          language={language}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    );
  },
  inlineCode: ({ value }) => {
    return <code className="bg-gray-100 text-sm p-1">{value}</code>;
  },
});

export const Markdown = ({
  children,
  ignore,
}: {
  children: any;
  ignore?: string[];
}) => <ReactMarkdown renderers={renderers(ignore)}>{children}</ReactMarkdown>;
