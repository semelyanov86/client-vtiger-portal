import classNames from 'classnames';

interface UserAvatarProps {
  alt: string;
  base64?: string;
  extra?: string[];
}

export const UserAvatar = ({ alt, base64, extra = [] }: UserAvatarProps) => {
  let classes = ['rounded-xl', 'border', 'border-separator-light', 'border-4', 'sw-11', 'sh-11'];
  if (extra.length > 0) {
    classes = extra;
    classes.push('rounded-xl');
  }
  return (
    <img
      src={base64 && base64 != 'data:image/png;base64, ' ? base64 : '/img/profile/profile-11.webp'}
      alt={alt}
      className={classNames(classes)}
    />
  );
};
