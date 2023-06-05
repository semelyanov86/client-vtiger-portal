import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { ISubmitButtonProps } from 'react-dropzone-uploader';

export const SubmitButton: FC<ISubmitButtonProps> = () => {
  return <Button as="input" type="submit" value="Submit" className="mb-1" />;
};
