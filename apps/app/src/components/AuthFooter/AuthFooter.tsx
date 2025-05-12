import c from './AuthFooter.module.scss';

export const AuthFooter = ({
  leftMessage,
  rightMessage,
  rightMessageOnClick,
}: {
  leftMessage: string;
  rightMessage: string;
  rightMessageOnClick?: () => void;
}) => {
  return (
    <div className={c.authFooter}>
      {/* TODO dodat da dodat da te rerouta na drugi page */}
      <a>{leftMessage}</a>
      <a onClick={rightMessageOnClick}>{rightMessage}</a>
    </div>
  );
};
