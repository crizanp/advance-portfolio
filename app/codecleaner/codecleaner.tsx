"use client";
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Sun, Moon, RotateCcw, Check, Info } from 'lucide-react';
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
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);
const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);
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
  const [showInfo, setShowInfo] = useState(false);
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
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-purple-50 to-pink-50'} p-4 md:p-8 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <Card className={`mb-8 ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-purple-100'}`}>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className={`text-2xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-purple-800'}`}>
                Code Comment Cleaner
              </h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className={`p-2 rounded-lg hover:bg-opacity-20 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-purple-200'}`}
              >
                <Info className={isDarkMode ? 'text-white' : 'text-purple-800'} />
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg hover:bg-opacity-20 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-purple-200'}`}
              >
                {isDarkMode ? <Sun className="text-white" /> : <Moon className="text-purple-800" />}
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg border border-red-200">
                {error}
              </div>
            )}
            <div className="mb-6 flex flex-wrap gap-4">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white border-gray-600 focus:border-purple-500' 
                    : 'bg-white text-purple-900 border-purple-200 focus:border-purple-400'
                }`}
              >
                {supportedLanguages.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <label className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-purple-900'}`}>
                <input
                  type="checkbox"
                  checked={preserveJSDoc}
                  onChange={(e) => setPreserveJSDoc(e.target.checked)}
                  className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                />
                <span>Preserve JSDoc</span>
              </label>
              <label className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-purple-900'}`}>
                <input
                  type="checkbox"
                  checked={preserveTodos}
                  onChange={(e) => setPreserveTodos(e.target.checked)}
                  className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                />
                <span>Preserve TODOs</span>
              </label>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className={`relative rounded-lg overflow-hidden border ${
                  isDarkMode ? 'border-gray-700' : 'border-purple-200'
                }`}>
                  <textarea
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Paste your code here..."
                    className={`w-full h-96 p-4 font-mono text-sm resize-none focus:ring-0 transition-colors ${
                      isDarkMode
                        ? 'bg-gray-800 text-white placeholder-gray-500'
                        : 'bg-white text-purple-900 placeholder-purple-300'
                    }`}
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={processCode}
                    disabled={isProcessing}
                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isProcessing ? 'Cleaning...' : 'Clean Code'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-sm"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className={`rounded-lg shadow-lg overflow-hidden border ${
                isDarkMode ? 'border-gray-700' : 'border-purple-200'
              }`}>
                <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={handleCopy}
                      disabled={!outputCode.length}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      {copied ? (
                        <Check className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
                      ) : (
                        <Copy className={isDarkMode ? 'text-white' : 'text-purple-800'} />
                      )}
                    </button>
                  </div>
                  <div className="h-80 overflow-auto">
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
              </div>
            </div>
          </CardContent>
        </Card>
        {showInfo && (
          <Card className={`mt-8 ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-purple-100'}`}>
            <CardHeader>
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-purple-800'}`}>
                Understanding Comment Types & Features
              </h2>
            </CardHeader>
            <CardContent className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-purple-600'}`}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-purple-700'}`}>
                    JSDoc Comments
                  </h3>
                  <p>JSDoc comments provide structured documentation for your code. They're valuable for:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Generating documentation websites</li>
                    <li>Providing IDE tooltips and type hints</li>
                    <li>Maintaining clear API documentation</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-purple-700'}`}>
                    TODO Comments
                  </h3>
                  <p>TODO comments mark pending tasks or future improvements. They're useful for:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Tracking pending tasks within the code</li>
                    <li>Marking areas that need improvement</li>
                    <li>Planning future feature implementations</li>
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-purple-700'}`}>
                    Usage Tips
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    <li>• Use "Preserve JSDoc" when preparing code for documentation generation or maintaining a public API</li>
                    <li>• Enable "Preserve TODOs" when cleaning up code but wanting to keep track of pending tasks</li>
                    <li>• For production code deployment, consider disabling both options to minimize file size</li>
                    <li>• The language selector ensures proper syntax highlighting for your code</li>
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