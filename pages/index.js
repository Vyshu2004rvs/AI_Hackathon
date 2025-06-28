import { useState, useRef, useEffect } from 'react';

export default function EnhancedStudentChatbot() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [task, setTask] = useState('summarize');
  const [language, setLanguage] = useState('French');
  const [loading, setLoading] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [difficulty, setDifficulty] = useState('beginner');
  const [studyMode, setStudyMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const tasks = [
    { key: 'summarize', label: '🧠 Summarize', icon: '🧠' },
    { key: 'translate', label: '🌍 Translate', icon: '🌍' },
    { key: 'eli5', label: '🧒 Explain Like I\'m 5', icon: '🧒' },
    { key: 'personalized_learning', label: '👩‍🏫 Personalized Learning', icon: '👩‍🏫' },
    { key: 'instant_explanation', label: '⚡ Instant Explanation', icon: '⚡' }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: darkMode 
        ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
        : 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)',
      color: darkMode ? '#ffffff' : '#1f2937',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      transition: 'all 0.3s ease'
    },
    header: {
      textAlign: 'center',
      padding: '2rem 1rem',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem'
    },
    subtitle: {
      fontSize: '1.1rem',
      opacity: 0.8,
      marginBottom: '1.5rem'
    },
    toggleButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    toggleButton: {
      padding: '0.5rem 1rem',
      borderRadius: '25px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '2rem'
    },
    card: {
      background: darkMode ? '#374151' : '#ffffff',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      border: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb'
    },
    textarea: {
      width: '100%',
      padding: '1rem',
      border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
      borderRadius: '0.75rem',
      background: darkMode ? '#4b5563' : '#f9fafb',
      color: darkMode ? '#ffffff' : '#111827',
      fontSize: '1rem',
      resize: 'vertical',
      minHeight: '150px',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    buttonPrimary: {
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    buttonSecondary: {
      background: darkMode ? '#4b5563' : '#f3f4f6',
      color: darkMode ? '#ffffff' : '#374151',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    taskGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '0.75rem',
      marginBottom: '1.5rem'
    },
    taskButton: {
      padding: '1rem',
      border: '2px solid',
      borderRadius: '0.75rem',
      background: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      fontWeight: '500'
    },
    inputGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '600',
      fontSize: '0.9rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
      borderRadius: '0.5rem',
      background: darkMode ? '#4b5563' : '#ffffff',
      color: darkMode ? '#ffffff' : '#111827',
      fontSize: '1rem',
      outline: 'none'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
      borderRadius: '0.5rem',
      background: darkMode ? '#4b5563' : '#ffffff',
      color: darkMode ? '#ffffff' : '#111827',
      fontSize: '1rem',
      outline: 'none'
    },
    statsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '0.5rem',
      fontSize: '0.85rem',
      opacity: 0.7
    },
    buttonRow: {
      display: 'flex',
      gap: '0.75rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    },
    resultCard: {
      background: darkMode ? '#374151' : '#ffffff',
      borderRadius: '1rem',
      padding: '1.5rem',
      marginTop: '2rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    },
    resultHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    resultContent: {
      background: darkMode ? '#4b5563' : '#f9fafb',
      padding: '1rem',
      borderRadius: '0.5rem',
      lineHeight: '1.6'
    },
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    historyItem: {
      background: darkMode ? '#4b5563' : '#f9fafb',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.85rem'
    },
    studyTip: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.5rem',
      marginBottom: '0.75rem',
      fontSize: '0.85rem'
    }
  };

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setReadingTime(Math.ceil(words.length / 200));
  }, [text]);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    const payload = { text, task };
    if (task === 'translate') payload.language = language;
    if (task === 'personalized_learning') payload.difficulty = difficulty;

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResult(data.result);
      
      // Add to history
      const historyEntry = {
        id: Date.now(),
        task,
        input: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
        output: data.result,
        timestamp: new Date().toLocaleTimeString()
      };
      setHistory(prev => [historyEntry, ...prev.slice(0, 9)]);

      // Prepare text-to-speech
      if ('speechSynthesis' in window) {
        const newUtterance = new SpeechSynthesisUtterance(data.result);
        setUtterance(newUtterance);
      }
    } catch (error) {
      setResult('❌ Error processing your request. Please try again.');
    }
    
    setLoading(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setText(reader.result);
    reader.readAsText(file);
  };

  const handleSpeechInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    setIsListening(true);
    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setText('');
    setResult('');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🤖 AI Study Assistant</h1>
        <p style={styles.subtitle}>Your intelligent companion for learning and understanding</p>
        
        <div style={styles.toggleButtons}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              ...styles.toggleButton,
              background: darkMode ? '#fbbf24' : '#1f2937',
              color: darkMode ? '#000000' : '#ffffff'
            }}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            onClick={() => setStudyMode(!studyMode)}
            style={{
              ...styles.toggleButton,
              background: studyMode ? '#10b981' : (darkMode ? '#4b5563' : '#e5e7eb'),
              color: studyMode ? '#ffffff' : (darkMode ? '#ffffff' : '#374151')
            }}
          >
            {studyMode ? '📚 Study Mode ON' : '📖 Study Mode OFF'}
          </button>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Main Content */}
        <div>
          <div style={styles.card}>
            {/* Text Input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>📝 Input Text</label>
              <textarea
                style={styles.textarea}
                placeholder="✨ Paste your text, upload a file, or use voice input to get started..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = darkMode ? '#4b5563' : '#e5e7eb'}
              />
              <div style={styles.statsRow}>
                <span>📊 {wordCount} words • ⏱️ ~{readingTime} min read</span>
              </div>
            </div>

            {/* Input Methods */}
            <div style={styles.buttonRow}>
              <button
                onClick={handleSpeechInput}
                disabled={isListening}
                style={{
                  ...styles.buttonSecondary,
                  background: isListening ? '#ef4444' : styles.buttonSecondary.background,
                  color: isListening ? '#ffffff' : styles.buttonSecondary.color
                }}
              >
                🎤 {isListening ? 'Listening...' : 'Voice Input'}
              </button>
              
              <input
                type="file"
                accept=".txt,.md"
                onChange={handleFileUpload}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={styles.buttonSecondary}
              >
                📁 Upload File
              </button>

              <button onClick={clearAll} style={styles.buttonSecondary}>
                🗑️ Clear All
              </button>
            </div>

            {/* Task Selection */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>🎯 AI Task</label>
              <div style={styles.taskGrid}>
                {tasks.map((taskOption) => (
                  <button
                    key={taskOption.key}
                    onClick={() => setTask(taskOption.key)}
                    style={{
                      ...styles.taskButton,
                      borderColor: task === taskOption.key ? '#3b82f6' : (darkMode ? '#4b5563' : '#d1d5db'),
                      background: task === taskOption.key ? '#dbeafe' : 'transparent',
                      color: task === taskOption.key ? '#1d4ed8' : (darkMode ? '#ffffff' : '#374151')
                    }}
                  >
                    <span>{taskOption.icon}</span>
                    <span>{taskOption.label.replace(taskOption.icon + ' ', '')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {task === 'translate' && (
                <div style={styles.inputGroup}>
                  <label style={styles.label}>🌐 Target Language</label>
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="e.g., Hindi, Spanish, German"
                    style={styles.input}
                  />
                </div>
              )}

              {task === 'personalized_learning' && (
                <div style={styles.inputGroup}>
                  <label style={styles.label}>📊 Difficulty Level</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    style={styles.select}
                  >
                    <option value="beginner">🟢 Beginner</option>
                    <option value="intermediate">🟡 Intermediate</option>
                    <option value="advanced">🔴 Advanced</option>
                  </select>
                </div>
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={handleAnalyze}
              disabled={loading || !text.trim()}
              style={{
                ...styles.buttonPrimary,
                width: '100%',
                opacity: (loading || !text.trim()) ? 0.5 : 1,
                cursor: (loading || !text.trim()) ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? (
                <>
                  <span>⏳</span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Analyze with AI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          {/* History Panel */}
          <div style={styles.card}>
            <button
              onClick={() => setShowHistory(!showHistory)}
              style={{
                ...styles.buttonSecondary,
                width: '100%',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>📜 History ({history.length})</span>
              <span>{showHistory ? '▲' : '▼'}</span>
            </button>
            
            {showHistory && (
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {history.length === 0 ? (
                  <p style={{ textAlign: 'center', opacity: 0.5, padding: '1rem' }}>No history yet</p>
                ) : (
                  history.map((entry) => (
                    <div
                      key={entry.id}
                      onClick={() => {
                        setText(entry.input);
                        setTask(entry.task);
                        setResult(entry.output);
                        setShowHistory(false);
                      }}
                      style={{
                        ...styles.historyItem,
                        marginBottom: '0.5rem'
                      }}
                      onMouseEnter={(e) => e.target.style.background = darkMode ? '#6b7280' : '#e5e7eb'}
                      onMouseLeave={(e) => e.target.style.background = darkMode ? '#4b5563' : '#f9fafb'}
                    >
                      <div style={{ fontWeight: '600' }}>
                        {tasks.find(t => t.key === entry.task)?.icon} {entry.task.toUpperCase()}
                      </div>
                      <div style={{ opacity: 0.7, marginTop: '0.25rem' }}>
                        {entry.input}
                      </div>
                      <div style={{ opacity: 0.5, marginTop: '0.25rem', fontSize: '0.75rem' }}>
                        {entry.timestamp}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Study Tips */}
          {studyMode && (
            <div style={styles.card}>
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>💡</span>
                <span>Study Tips</span>
              </h3>
              <div>
                <div style={styles.studyTip}>
                  <span>🎯</span>
                  <span>Break complex topics into smaller chunks for better understanding</span>
                </div>
                <div style={styles.studyTip}>
                  <span>🧒</span>
                  <span>Use the ELI5 feature for difficult concepts</span>
                </div>
                <div style={styles.studyTip}>
                  <span>🔄</span>
                  <span>Review your history to reinforce learning</span>
                </div>
                <div style={styles.studyTip}>
                  <span>🎤</span>
                  <span>Try voice input for hands-free interaction</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
          <div style={styles.resultCard}>
            <div style={styles.resultHeader}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <span>{tasks.find(t => t.key === task)?.icon}</span>
                <span>AI Result</span>
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={copyToClipboard} style={styles.buttonSecondary}>
                  {copied ? '✅' : '📋'} {copied ? 'Copied!' : 'Copy'}
                </button>
                <button onClick={() => utterance && speechSynthesis.speak(utterance)} style={styles.buttonSecondary}>
                  ▶️ Speak
                </button>
                <button onClick={() => speechSynthesis.cancel()} style={styles.buttonSecondary}>
                  ⏹️ Stop
                </button>
              </div>
            </div>
            
            <div style={styles.resultContent}>
              {result}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}