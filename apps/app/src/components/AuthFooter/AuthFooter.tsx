import c from './AuthFooter.module.scss';

export const AuthFooter = ({
  leftMessage,
  rightMessage,
}: {
  leftMessage: string;
  rightMessage: string;
}) => {
  return (
    <div className={c.authFooter}>
      {/* TODO dodat da dodat da te rerouta na drugi page */}
      <a>{leftMessage}</a>
      <a>{rightMessage}</a>
    </div>
  );
};
