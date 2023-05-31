type SVGIconProps = {
  style?: React.CSSProperties;
};

export const HeartIcon = ({ style }: SVGIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="FavoriteIcon"
      aria-label="fontSize small"
      style={style}
    >
      <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
    </svg>
  );
};
