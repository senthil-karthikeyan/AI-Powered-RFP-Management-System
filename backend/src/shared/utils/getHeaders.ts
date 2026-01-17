export const extractHeader = (
  rawEmail: string,
  headerName: string
): string | null => {
  const regex = new RegExp(`^${headerName}:\\s*(.+)$`, "im");
  const match = rawEmail.match(regex);
  return match ? match[1].trim() : null;
};
