export const mockChatResponse = async (message, userId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    user_id: userId || "mock_user_123",
    response: "Based on your interest in AI and low risk tolerance, I've curated a few beginner-friendly reads from The Economic Times.",
    profile: {
      user_type: "student",
      risk_level: "low",
      experience_level: "beginner",
      interests: ["stocks", "AI"]
    },
    recommendations: [
      {
        service: "ET Prime",
        reason: "Get exclusive insights and in-depth analysis on the latest AI trends to understand the market without high risk.",
        url: "https://economictimes.indiatimes.com/prime"
      },
      {
        service: "ET Markets",
        reason: "Track beginner-friendly stable stocks with real-time updates.",
        url: "https://economictimes.indiatimes.com/markets"
      }
    ],
    next_action: {
      action_title: "Learn basics of investing",
      action_description: "Check out our beginner's guide to the stock market.",
      cta_text: "Read Guide",
      cta_url: "https://economictimes.indiatimes.com/markets/stocks/news"
    }
  };
};
