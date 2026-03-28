export const callRealApi = async (message, userId) => {
  const BASE_URL = 'https://gen-ai-prototype-production.up.railway.app';
  
  const response = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId || "123",
      message: message
    })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};
