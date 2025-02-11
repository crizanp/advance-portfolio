"use client";

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Sun, Moon, RotateCcw, Check } from 'lucide-react';

interface Language {
  value: string;
  label: string;
}

export default function CodeCleaner() {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [preserveJSDoc, setPreserveJSDoc] = useState(false);
  const [preserveTodos, setPreserveTodos] = useState(false);

  const supportedLanguages: Language[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' }
  ];

  const CodeExample = ({ children, isComment }: { children: string; isComment?: boolean }) => (
    <div className={`${isComment ? 'text-green-600' : ''}`}>{children}</div>
  );

  const removeComments = (code: string): string[] => {
    try {
      let processedCode = code;
      const jsdocComments: string[] = [];
      const todoComments: string[] = [];

      if (preserveJSDoc) {
        processedCode = processedCode.replace(/\/\*\*[\s\S]*?\*\//g, (match) => {
          jsdocComments.push(match);
          return `PRESERVED_JSDOC_${jsdocComments.length - 1}`;
        });
      }

      if (preserveTodos) {
        processedCode = processedCode.replace(/\/\/\s*TODO:.*$/gm, (match) => {
          todoComments.push(match);
          return `PRESERVED_TODO_${todoComments.length - 1}`;
        });
      }

      processedCode = processedCode
        .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1')
        .split('\n')
        .filter(line => line.trim() !== '')
        .join('\n');

      if (preserveJSDoc) {
        processedCode = processedCode.replace(/PRESERVED_JSDOC_(\d+)/g, (_, index) => {
          return jsdocComments[parseInt(index)];
        });
      }

      if (preserveTodos) {
        processedCode = processedCode.replace(/PRESERVED_TODO_(\d+)/g, (_, index) => {
          return todoComments[parseInt(index)];
        });
      }

      return processedCode.split('\n');
    } catch (err) {
      setError('Error processing code. Please check your input.');
      return [];
    }
  };

  const processCode = async () => {
    if (!inputCode.trim()) {
      setError('Please enter some code to clean.');
      return;
    }

    setError('');
    setIsProcessing(true);
    setOutputCode([]);

    try {
      const cleanedLines = removeComments(inputCode);
      for (const line of cleanedLines) {
        await new Promise(resolve => setTimeout(resolve, 20));
        setOutputCode(prev => [...prev, line]);
      }
    } catch (err) {
      setError('An error occurred while processing the code.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputCode.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy code to clipboard.');
    }
  };

  const handleReset = () => {
    setInputCode('');
    setOutputCode([]);
    setError('');
  };

  const renderCodeExample = (code: string[]) => (
    <div className="font-mono">
      {code.map((line, index) => (
        <div key={index} className="whitespace-pre">
          {line}
        </div>
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-purple-50'} p-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-purple-800'}`}>
            Code Comment Cleaner
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-opacity-20 hover:bg-gray-500"
          >
            {isDarkMode ? <Sun className="text-white" /> : <Moon className="text-purple-800" />}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-4 flex gap-4">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-purple-900'
              }`}
          >
            {supportedLanguages.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={preserveJSDoc}
              onChange={(e) => setPreserveJSDoc(e.target.checked)}
              className="rounded"
            />
            <span className={isDarkMode ? 'text-white' : 'text-purple-900'}>
              Preserve JSDoc
            </span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={preserveTodos}
              onChange={(e) => setPreserveTodos(e.target.checked)}
              className="rounded"
            />
            <span className={isDarkMode ? 'text-white' : 'text-purple-900'}>
              Preserve TODOs
            </span>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Paste your code here..."
              className={`w-full h-96 p-4 rounded-lg border-2 focus:ring-2 font-mono text-sm ${isDarkMode
                ? 'bg-gray-800 text-white border-gray-700 focus:border-gray-500 focus:ring-gray-600'
                : 'bg-white text-purple-900 border-purple-200 focus:border-purple-500 focus:ring-purple-200'
                }`}
            />
            <div className="flex gap-4">
              <button
                onClick={processCode}
                disabled={isProcessing}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Cleaning...' : 'Clean Code'}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className={`p-4 rounded-lg shadow-lg h-96 overflow-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
            <div className="flex justify-end mb-2">
              <button
                onClick={handleCopy}
                disabled={!outputCode.length}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
              >
                {copied ? (
                  <Check className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
                ) : (
                  <Copy className={isDarkMode ? 'text-white' : 'text-purple-800'} />
                )}
              </button>
            </div>
            <SyntaxHighlighter
              language={selectedLanguage}
              style={isDarkMode ? oneDark : oneLight}
              showLineNumbers
              customStyle={{
                background: 'transparent',
                padding: 0,
                margin: 0,
              }}
            >
              {outputCode.join('\n')}
            </SyntaxHighlighter>
          </div>
        </div>

        <div className={`mt-8 space-y-6`}>
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-purple-100'
            }`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-purple-800'
              }`}>
              Understanding Comment Types & Features
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-purple-700'
                  }`}>
                  JSDoc Comments
                </h3>
                <div className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-purple-600'
                  }`}>
                  <p>JSDoc comments are documentation comments that start with /** and provide structured documentation for your code. They&apos;re valuable for:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Generating documentation websites</li>
                    <li>Providing IDE tooltips and type hints</li>
                    <li>Maintaining clear API documentation</li>
                  </ul>
                  <div className={`p-4 rounded-lg mt-2 font-mono text-sm ${isDarkMode ? 'bg-gray-900' : 'bg-white'
                    }`}>
                    {renderCodeExample([
                      '/** Example JSDoc Comment',
                      ' * Calculates the sum of two numbers',
                      ' * @param {number} a - First number',
                      ' * @param {number} b - Second number',
                      ' * @returns {number} The sum of a and b',
                      ' */',
                      'function add(a, b) {',
                      '  return a + b;',
                      '}'
                    ])}
                  </div>
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-purple-700'
                  }`}>
                  TODO Comments
                </h3>
                <div className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-purple-600'
                  }`}>
                  <p>TODO comments are reminder comments that mark pending tasks or future improvements. They&apos;re useful for:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Tracking pending tasks within the code</li>
                    <li>Marking areas that need improvement</li>
                    <li>Planning future feature implementations</li>
                  </ul>
                  <div className={`p-4 rounded-lg mt-2 font-mono text-sm ${isDarkMode ? 'bg-gray-900' : 'bg-white'
                    }`}>
                    {renderCodeExample([
                      '// TODO: Add input validation',
                      'function processData(data) {',
                      '  return data;',
                      '}',
                      '',
                      '// TODO: Implement error handling',
                      'function fetchUser() {',
                      '  return fetch(\'/api/user\');',
                      '}'
                    ])}
                  </div>
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-purple-700'
                  }`}>
                  Usage Tips
                </h3>
                <ul className={`list-disc list-inside ml-4 space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-purple-600'
                  }`}>
                  <li>Use &quot;Preserve JSDoc&quot; when preparing code for documentation generation or when maintaining a public API</li>
                  <li>Enable &quot;Preserve TODOs&quot; when cleaning up code but wanting to keep track of pending tasks</li>
                  <li>For production code deployment, consider disabling both options to minimize file size</li>
                  <li>When working with TypeScript, JSDoc comments can be especially valuable for type information</li>
                  <li>You can use the language selector to ensure proper syntax highlighting for your code</li>
                  <li>The copy button makes it easy to paste the cleaned code back into your editor</li>
                </ul>
              </div>

              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}