export const normalizePort = (value: string, defaultPort = 3000): number => {
  const port = parseInt(value, 10);
  return isNaN(port) || port < 0 || port > 65535 ? defaultPort : port;
};
