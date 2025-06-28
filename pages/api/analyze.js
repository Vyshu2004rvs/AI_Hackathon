export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { text, task, language = 'French', difficulty = 'beginner' } = req.body;

  const prompts = {
    summarize: `Summarize the following text in a clear and concise manner:\n\n${text}`,
    translate: `Translate the following text to ${language}:\n\n${text}`,
    eli5: `Explain the following like I'm 5 years old using simple words and fun examples:\n\n${text}`,
    personalized_learning: `Act as a personalized tutor for a ${difficulty} level student. Adjust your explanation complexity accordingly:
    - Beginner: Use simple language, basic concepts, and many examples
    - Intermediate: Use moderate complexity with some technical terms
    - Advanced: Use sophisticated language and in-depth analysis
    
    Text to explain:\n\n${text}`,
    instant_explanation: `Provide a quick, clear, and comprehensive explanation for:\n\n${text}`
  };

  const prompt = prompts[task] || prompts.summarize;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful AI tutor assistant. Provide clear, educational responses tailored to the user\'s learning level.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq API Error:', data);
      return res.status(500).json({ 
        result: `Groq Error: ${data.error?.message || 'Unknown error'}` 
      });
    }

    // Add some formatting to the response
    const formattedResult = data.choices[0].message.content.trim();
    
    res.status(200).json({ 
      result: formattedResult,
      metadata: {
        task,
        language: task === 'translate' ? language : null,
        difficulty: task === 'personalized_learning' ? difficulty : null,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ 
      result: `Server Error: ${err.message}` 
    });
  }
}