import { mockChatResponse } from './mock_api';
import { callRealApi } from './real_api';

const USE_MOCK = false;

export const sendMessage = async (message, userId) => {
  if (USE_MOCK) {
    return await mockChatResponse(message, userId);
  }

  return await callRealApi(message, userId);
};
