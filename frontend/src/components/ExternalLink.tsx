export const ExternalLink: React.FC<{ href: string; title: string }> = ({
  title,
  href,
}) => {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {title}
    </a>
  );
};
