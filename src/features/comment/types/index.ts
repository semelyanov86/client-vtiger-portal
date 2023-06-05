export type Comment = {
  id: string;
  commentcontent: string;
  source: string;
  customer: string;
  userid: string;
  reasontoedit: string;
  creator: string;
  assigned_user_id: string;
  createdtime: string;
  modifiedtime: string;
  related_to: string;
  parent_comments: string;
  is_private: boolean;
  filename: string;
  related_email_id: string;
  author: CommentAuthor;
};

type CommentAuthor = {
  firstname: string;
  lastname: string;
  email: string;
  imagecontent: string;
  id: string;
};

export type CommentDTO = {
  data: {
    commentcontent: string;
  };
  parentId: string;
  rootId?: string;
};
