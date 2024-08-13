export const truncateText = (text) => {
  if (text.length < 20) return text;

  return text.substring(0, 20) + "...";
};
export const truncateDescription = (text) => {
  if (text?.length < 300) return text;

  return text?.substring(0, 300) + ".....";
};
