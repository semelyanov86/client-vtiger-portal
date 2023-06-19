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
  mailingzip: string;
  mailingpobox: string;
  othercity: string;
  otherstreet: string;
  othercountry: string;
  otherstate: string;
  otherpobox: string;
  otherzip: string;
  image: string;
  imagecontent: string;
  assigned_user_id: string;
  phone: string;
  otp_enabled: boolean;
  otp_verified: boolean;
};

export type Token = {
  id: number;
  token: string;
  expiry: string;
  otp_enabled: boolean;
};

export type OtpData = {
  base32: string;
  otpauth_url: string;
};

export type OtpDto = {
  token: string;
};

export type UserSettings = {
  [key: string]: boolean;
};
