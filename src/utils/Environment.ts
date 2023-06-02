export const GetGoogleMapApiKey = () => {
  if (process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY) {
    return process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  }
  return "";
};
