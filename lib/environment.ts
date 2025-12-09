// Environment variables configuration
export const env = {
  // Gemini API Key
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'AIzaSyCTGkAkIpIp6gXeQHsdK3W1FezTacMpN-0',

  // News API Key (free tier from newsdata.io)
  NEWSDATA_API_KEY: process.env.NEWSDATA_API_KEY || 'pub_61aborepoxoqjvgtx',

  // OpenWeatherMap API Key
  OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY || 'demo',
} as const;

// Validate required environment variables
if (!env.GEMINI_API_KEY || env.GEMINI_API_KEY === 'your-gemini-api-key-here') {
  console.warn('⚠️  GEMINI_API_KEY is not set. Please set it in your environment variables.');
}

export default env;
