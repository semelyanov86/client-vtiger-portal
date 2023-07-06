import { useState } from 'react';
import { Upload } from 'react-bootstrap-icons';

import { AuthUser } from '../types';

import { UserAvatar } from './molecules/UserAvatar.tsx';

interface UserProfileImageProps {
  user: AuthUser;
  onImageUpload: (img: ImageUploadOptions) => void;
}

export interface ImageUploadOptions {
  imagename: string;
  imagetype: string;
  imagecontent: string;
}

export const UserProfileImage = ({ user, onImageUpload }: UserProfileImageProps) => {
  const [base64, setBase64] = useState('data:image/png;base64, ' + user.imagecontent);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          const base64Content = e.target?.result as string;
          setBase64(base64Content);
          onImageUpload({
            imagename: file.name,
            imagetype: file.type,
            imagecontent: base64Content,
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="position-relative d-inline-block" id="singleImageUploadExample">
      <UserAvatar alt={user.firstname + ' ' + user.lastname} base64={base64}></UserAvatar>
      <button
        className="btn btn-sm btn-icon btn-icon-only btn-separator-light rounded-xl position-absolute e-0 b-0"
        type="button"
        onClick={() => document.getElementById('uploadImageBtn')?.click()}
      >
        <Upload></Upload>
      </button>
      <input
        className="file-upload d-none"
        type="file"
        accept="image/png"
        id="uploadImageBtn"
        onChange={handleFileChange}
        data-testid="uploadImageBtn"
      />
    </div>
  );
};
