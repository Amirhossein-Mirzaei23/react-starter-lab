import { API_URL } from '@/App';

export const getBillsList = async () => {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
};
