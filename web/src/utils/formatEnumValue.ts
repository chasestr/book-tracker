export const formatEnumValue = (value: string): string => {
  const words = value.split("_");
  const titleCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  return titleCaseWords.join(" ");
};
