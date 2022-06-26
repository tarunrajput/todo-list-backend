export const isDevelopmentEnv = () => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'development';
};

export const getResponseFormat = (data, msg = '', code = 200) => ({
  meta: {
    success: true,
    code,
    msg,
  },
  data,
});

export const getResponseErrorFormat = (msg = 'Something went wrong', errCode = 500) => ({
  meta: {
    success: false,
    msg,
    code: errCode,
  },
});

export const sendError = (res, msg, code = 409) => {
  if (!res.headersSent) {
    return res.status(code).json(getResponseErrorFormat(msg, code));
  }
};
