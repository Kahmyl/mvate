import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config, { AccessTokenMaxAge, RefreshTokenMaxAge } from 'src/config';

// type TokenKeys = {
//   user_refresh_key: string;
//   user_access_key: string;
// };

// type TokenKey = keyof typeof tokenKeys;

// const tokenKeys: TokenKeys = {
//   user_access_key: config.config().keys.ACCESS_KEY,
//   user_refresh_key: config.config().keys.REFRESH_KEY,
// };

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

// export const generateAccessToken = (
//   id: string,
//   domain: TokenKey = 'user_access_key',
// ) => {
//   return jwt.sign({ id }, tokenKeys[domain], {
//     expiresIn: AccessTokenMaxAge / 1000,
//   });
// };

// export const generateAccessTokenForSignUp = (
//   data: {},
//   domain: TokenKey = 'user_access_key',
// ) => {
//   return jwt.sign(data, tokenKeys[domain], {
//     expiresIn: AccessTokenMaxAge / 1000,
//   });
// };

// export const verifySignUpToken = async (token: string) => {
//   const resp = verifyJWT(token, config.config().keys.ACCESS_KEY);
//   if (resp) {
//     return resp;
//   }
//   return false;
// };

// export const generateRefreshToken = (
//   id: string,
//   domain: TokenKey = 'user_refresh_key',
// ) => {
//   console.log(tokenKeys[domain]);
//   return jwt.sign({ id }, tokenKeys[domain], {
//     expiresIn: RefreshTokenMaxAge / 1000,
//   });
// };

// export const verifyJWT = (token: string, key: string): any | boolean => {
//   try {
//     const resp: any = jwt.verify(token, key);
//     return resp;
//   } catch {
//     return false;
//   }
// };

// export const verifyAccessToken = (token: string) => {
//   const resp = verifyJWT(token, config.config().keys.ACCESS_KEY);
//   if (resp) {
//     return resp;
//   }
//   return false;
// };

// export const verifyRefreshToken = (
//   token: string,
//   domain: TokenKey = 'user_refresh_key',
// ) => {
//   const resp = verifyJWT(token, tokenKeys[domain]);
//   if (resp) {
//     return resp;
//   }
//   return false;
// };
