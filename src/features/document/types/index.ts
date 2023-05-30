import { Entity } from '../../misc/types/entity.ts';

export interface Document extends Entity {
  notes_title: string;
  filename: string;
  notecontent: string;
  filetype: string;
  filesize: string;
  filelocationtype: string;
  fileversion: string;
  filestatus: string;
  filedownloadcount: string;
  folderid: string;
  note_no: string;
  imageattachmentids: string;
}

export interface DocumentContent {
  fileid: string;
  filename: string;
  filetype: string;
  filesize: number;
  filecontents: string;
}
