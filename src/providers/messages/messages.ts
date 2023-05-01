// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import deMessages from './de';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import enMessages from './en';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ruMessages from './ru';

export interface Messages {
  'en-US': enMessages;
  'ru-RU': ruMessages;
  'de-DE': deMessages;
}

export const messages = {
  'en-US': enMessages,
  'ru-RU': ruMessages,
  'de-DE': deMessages,
} as Messages;
