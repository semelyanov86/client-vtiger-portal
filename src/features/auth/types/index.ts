export type AuthUser = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  crmid: string;
  description: string;
  account_id: string;
  account_name: string;
  title: string;
  department: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  mailingcity: string;
  mailingstreet: string;
  mailingcountry: string;
  mailingstate: string;
  image: string;
  imagecontent: string;
  assigned_user_id: string;
  phone: string;
};

export type Token = {
  id: number;
  token: string;
  expiry: string;
};
