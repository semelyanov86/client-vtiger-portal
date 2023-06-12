import { useState } from 'react';

import { AuthUser } from '../types';

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
      <img
        src={
          base64 && base64 != 'data:image/png;base64, ' ? base64 : '/img/profile/profile-11.webp'
        }
        alt="alternate text"
        className="rounded-xl border border-separator-light border-4 sw-11 sh-11"
      />
      <button
        className="btn btn-sm btn-icon btn-icon-only btn-separator-light rounded-xl position-absolute e-0 b-0"
        type="button"
        onClick={() => document.getElementById('uploadImageBtn')?.click()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="acorn-icons acorn-icons-upload undefined"
        >
          <path d="M18 6V5.5C18 4.09554 18 3.39331 17.6629 2.88886C17.517 2.67048 17.3295 2.48298 17.1111 2.33706C16.6067 2 15.9045 2 14.5 2H5.5C4.09554 2 3.39331 2 2.88886 2.33706C2.67048 2.48298 2.48298 2.67048 2.33706 2.88886C2 3.39331 2 4.09554 2 5.5V6"></path>
          <path d="M6 10 9.29289 6.70711C9.68342 6.31658 10.3166 6.31658 10.7071 6.70711L14 10M10 18 10 7"></path>
        </svg>
      </button>
      <input
        className="file-upload d-none"
        type="file"
        accept="image/png"
        id="uploadImageBtn"
        onChange={handleFileChange}
      />
    </div>
  );
};
