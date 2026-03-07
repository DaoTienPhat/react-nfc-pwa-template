const buildVercelUrl = (path) => {
  const prefix = import.meta.env.VITE_VERCEL_BLOB_PREFIX;
  console.log(`Building Vercel URL with prefix: ${prefix} and path: ${path}`);
  return `${prefix}${path}`;
};

export { buildVercelUrl };