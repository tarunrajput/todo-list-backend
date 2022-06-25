export const isDevelopmentEnv = () => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'development';
}