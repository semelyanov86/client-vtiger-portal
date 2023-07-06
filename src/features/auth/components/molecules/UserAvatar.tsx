interface UserAvatarProps {
  alt: string;
  base64?: string;
}

export const UserAvatar = ({ alt, base64 }: UserAvatarProps) => {
  return (
    <img
      src={base64 && base64 != 'data:image/png;base64, ' ? base64 : '/img/profile/profile-11.webp'}
      alt={alt}
      className="rounded-xl border border-separator-light border-4 sw-11 sh-11"
    />
  );
};
