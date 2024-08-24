export const truncateText = (text) => {
  if (text.length < 20) return text;

  return text.substring(0, 20) + "...";
};
export const truncateDescription = (text) => {
  if (text?.length < 90) return text;

  return text?.substring(0, 90) + ",Read More......";
};
