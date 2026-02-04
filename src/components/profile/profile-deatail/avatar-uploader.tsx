import { useRef, useState } from 'react';
import { Avatar, Float, Spinner } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import uploaderIcon from '@iconify-icons/solar/upload-linear';
import { uploadImageApi } from '../../../api/uploader/uploader-services';
import { updaloerResponse } from '../../../api/uploader/uploader.types';
import editIcon from '@iconify-icons/solar/pen-outline';

export default function AvatarUploader({
  image,
  onUploaded,
  height = '72px',
  width = '72px',
  showEditIcon = true,
}: {
  height?: string;
  width?: string;
  image?: string;
  showEditIcon?: boolean;
  onUploaded: (image: updaloerResponse) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(image || '');
  const [loading, setLoading] = useState<boolean>(image ? true : false);
  // Trigger file input
  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    // Preview image

    // Upload request
    try {
      const res = await uploadImageApi(file);
      const image = res; // your Nest upload returns full URL
      onUploaded(image);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* CLICKABLE AVATAR */}
      <div onClick={triggerFilePicker} className="cursor-pointer">
        <Avatar.Root
          bg="#222"
          className="!border-1 !border-slate-100 hover:opacity-80 transition"
          width={width}
          height={height}
        >
          <Avatar.Fallback className="!w-full flex justify-center items-center !h-full">
            {!loading ? (
              <Icon icon={uploaderIcon} className="!w-full !h-5/12" />
            ) : (
              <Spinner size="md" borderWidth="2px" />
            )}
          </Avatar.Fallback>
          <Avatar.Image
            onErrorCapture={() => setLoading(false)}
            onLoadCapture={() => setLoading(false)}
            src={image || preview}
          />
          {showEditIcon && (
            <Float placement="bottom-start" offsetX="-4" offsetY="3">
              <div className="bg-slate-100 rounded-full !p-1">
                <Icon icon={editIcon} className="!text-neutral-900 !ml-1" width={'16'}></Icon>
              </div>
            </Float>
          )}
        </Avatar.Root>
      </div>

      {/* HIDDEN FILE INPUT */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
