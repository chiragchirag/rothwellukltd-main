/* eslint-disable no-useless-escape */

export const EMAIL_REGEX = /^[A-Za-z0-9._-]+@[A-Za-z]+\.[A-Za-z]{2,}$/;
export const PEOPLE_EMAIL_REGEX =
  /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const SPECIAL_CHAR_WITH_ALPHABET =
  /[~!\@\#\$%\^&\*\(\)\_+\{\}\|":<>?\.,';\[\]\=a-zA-Z]/g;
export const SPECIAL_CHAR = /[~!@#$%^&*()_+|}{:"?><,./;'[\]\\=-]/g;
export const CURRENCY_REGEX =
  /[^~!@#$%^&*()_+|}{":?><\-=[\]\\;',.\/$\u20AC؋ƒ₹៛¥₡R$₱£₾₪Z$₴]+/g;
export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
export const EVERYTHING_REGEX = /^.+$/;
export const CHARACTER_REGEX = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z\s]).+$/g;
export const POSITIVE_INTEGER = /^[0-9]\d*$/;
export const ALPHABETS_REGEX = /[^A-Za-z ]/gi;
export const ALPHABETS_NOSPACE_REGEX = /[^A-Za-z]/gi;
export const UPPERCASE_ALLOW_NO_SPACE_ALPHABETS_REGEX = /^[^A-Z\s]+$/;
export const NUMBER_REGEX = /\D/g;
export const ONLY_NUMBER_REGEX = /^[0-9]*$/;
export const NUMBER_WITH_DOTE_REGEX = /[^0-9.]+/g;
export const REFERENCE_NUMBER_REGEX = /^[A-Za-z]{3}-\d+-\d+$/;
export const POS_INPUT_REGEX = /^\d*\.?\d{0,2}$/;
export const TELEPHONE_REGEX = /(\d{6})\s(\d{6})/g;
export const ENGLISH_ALPHABETS_SPACES_NUMBERS_REGEX = /^[a-zA-Z0-9\s]+$/;
export const DOT_WITH_NUMBER = /^\d+(\.\d+)?$/;
export const ONLY_NEGATIVE_NUMBER_WITH_ZERO = /^(-\d+|0)$/;

export const REGEX = {
  EMAIL_REGEX,
  PEOPLE_EMAIL_REGEX,
  SPECIAL_CHAR_WITH_ALPHABET,
  SPECIAL_CHAR,
  PASSWORD_REGEX,
  EVERYTHING_REGEX,
  CHARACTER_REGEX,
  POSITIVE_INTEGER,
  ALPHABETS_REGEX,
  NUMBER_REGEX,
  REFERENCE_NUMBER_REGEX,
  POS_INPUT_REGEX,
  TELEPHONE_REGEX,
  ENGLISH_ALPHABETS_SPACES_NUMBERS_REGEX,
  DOT_WITH_NUMBER,
  NUMBER_WITH_DOTE_REGEX,
  ONLY_NEGATIVE_NUMBER_WITH_ZERO,
};
