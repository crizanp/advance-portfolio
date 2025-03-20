"use client";
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, RotateCcw, Check, Info } from 'lucide-react';
interface Language {
  value: string;
  label: string;
}
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-3 ${className}`}>
    {children}
  </div>
);
const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-3 pt-0 ${className}`}>
    {children}
  </div>
);
export default function CodeCleaner() {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [preserveJSDoc, setPreserveJSDoc] = useState(false);
  const [preserveTodos, setPreserveTodos] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const supportedLanguages: Language[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' }
  ];
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
        await new Promise(resolve => setTimeout(resolve, 5));
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
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-2 md:p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gray-800 border border-gray-700">
          <CardHeader className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-white">
              Code Comment Cleaner
            </h1>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-1 rounded-lg hover:bg-gray-700"
            >
              <Info className="w-5 h-5 text-gray-300" />
            </button>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-3 p-2 bg-red-900/50 text-red-200 rounded-lg border border-red-800 text-sm">
                {error}
              </div>
            )}
            <div className="mb-3 flex flex-wrap gap-2">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-2 py-1 text-sm rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-500"
              >
                {supportedLanguages.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-1 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={preserveJSDoc}
                  onChange={(e) => setPreserveJSDoc(e.target.checked)}
                  className="rounded border-gray-600 text-indigo-600"
                />
                <span>Preserve JSDoc</span>
              </label>
              <label className="flex items-center gap-1 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={preserveTodos}
                  onChange={(e) => setPreserveTodos(e.target.checked)}
                  className="rounded border-gray-600 text-indigo-600"
                />
                <span>Preserve TODOs</span>
              </label>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="relative rounded-lg overflow-hidden border border-gray-700">
                  <textarea
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Paste your code here..."
                    className="w-full h-64 md:h-80 p-2 font-mono text-sm resize-none focus:ring-0 bg-gray-800 text-white placeholder-gray-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={processCode}
                    disabled={isProcessing}
                    className="flex-1 px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Cleaning...' : 'Clean Code'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-gray-800">
                  <div className="flex justify-end p-1">
                    <button
                      onClick={handleCopy}
                      disabled={!outputCode.length}
                      className="p-1 rounded-lg hover:bg-gray-700"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-300" />
                      )}
                    </button>
                  </div>
                  <div className="h-64 md:h-72 overflow-auto">
                    <SyntaxHighlighter
                      language={selectedLanguage}
                      style={oneDark}
                      showLineNumbers
                      customStyle={{
                        background: 'transparent',
                        padding: '0 0.5rem',
                        margin: 0,
                        fontSize: '0.8rem'
                      }}
                    >
                      {outputCode.join('\n')}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {showInfo && (
          <Card className="mt-3 bg-gray-800 border border-gray-700">
            <CardHeader>
              <h2 className="text-lg font-semibold text-white">
                Comment Types & Features
              </h2>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-300 text-sm">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-200">
                    JSDoc Comments
                  </h3>
                  <p>JSDoc comments provide structured documentation for your code. They're useful for:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Generating documentation websites</li>
                    <li>Providing IDE tooltips</li>
                    <li>Maintaining API documentation</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-200">
                    TODO Comments
                  </h3>
                  <p>TODO comments mark pending tasks or future improvements:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Tracking pending tasks</li>
                    <li>Marking areas for improvement</li>
                    <li>Planning future implementations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}