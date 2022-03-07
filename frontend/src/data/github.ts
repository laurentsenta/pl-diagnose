export const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const makeIssueURL = ({
  title,
  body,
}: {
  title?: string;
  body?: string;
}): string => {
  const suffixes = [];

  if (title) {
    suffixes.push(`title=${encodeURIComponent(title)}`);
  }
  if (body) {
    suffixes.push(`body=${encodeURIComponent(body)}`);
  }

  if (suffixes.length > 0) {
    return `${GITHUB_URL}/issues/new?${suffixes.join("&")}`;
  }

  return `${GITHUB_URL}/issues/new`;
};
