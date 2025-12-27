import { apiUrl } from '../../App';

export const getBillsList = async () => {
  const res = await fetch(`${apiUrl}/posts`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
};
