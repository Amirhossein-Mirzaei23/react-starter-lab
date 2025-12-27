import { apiUrl } from '../../App';
import { apiClient } from '../http';
import { updaloerResponse } from './uploader.types';

export async function uploadImageApi(file: File): Promise<updaloerResponse> {
  const formData = new FormData();
  console.log('file', file);

  formData.append('file', file);

  const res = await fetch(`${apiUrl}/upload/image`, {
    method: 'POST',
    body: formData,
  });

  return await res.json();
}
