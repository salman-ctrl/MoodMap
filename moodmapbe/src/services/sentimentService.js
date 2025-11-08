const axios = require('axios');
const sentimentConfig = require('../config/sentiment');

class SentimentService {
  async analyzeSentiment(text) {
    try {
      // This is a placeholder. In production, you would call a real NLP API
      // For now, we'll return a simple score based on keywords
      
      const positiveWords = ['happy', 'great', 'amazing', 'wonderful', 'excellent', 'good', 'love', 'joy'];
      const negativeWords = ['sad', 'terrible', 'awful', 'bad', 'hate', 'angry', 'depressed', 'anxious'];
      
      const lowerText = text.toLowerCase();
      let score = 0;
      
      positiveWords.forEach(word => {
        if (lowerText.includes(word)) score += 0.1;
      });
      
      negativeWords.forEach(word => {
        if (lowerText.includes(word)) score -= 0.1;
      });
      
      // Normalize to -1 to 1 range
      return Math.max(-1, Math.min(1, score));
      
      // Uncomment this when you have a real sentiment API:
      /*
      const response = await axios.post(
        sentimentConfig.apiUrl,
        { text },
        { timeout: sentimentConfig.timeout }
      );
      return response.data.sentiment_score;
      */
    } catch (error) {
      console.error('Sentiment analysis failed:', error.message);
      return null;
    }
  }
}

module.exports = new SentimentService();