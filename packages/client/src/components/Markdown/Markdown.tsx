import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import nord from 'react-syntax-highlighter/dist/esm/styles/prism/nord';
import detectLang from 'lang-detector';

interface ITranspile {
  [key: string]: string;
}

const renderers = (ignore: string[] = [], transpile: ITranspile = {}) => ({
  code: ({ language, value }) => {
    if (transpile['code']) {
      return renderers(ignore)[transpile['code']]({ language, value });
    }

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
    return <code className="bg-gray-100 text-sm p-1 inline">{value}</code>;
  },
});

export const Markdown = ({
  children,
  ignore,
  transpile,
}: {
  children: any;
  ignore?: string[];
  transpile?: ITranspile;
}) => (
  <ReactMarkdown renderers={renderers(ignore, transpile)}>
    {children}
  </ReactMarkdown>
);
