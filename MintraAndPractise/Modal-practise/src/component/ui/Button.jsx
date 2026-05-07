export default function Button({ children, className, onClick, ...props }) {
  const cssClass = ` btn ${className}`;

  return (
    <button className={cssClass} {...props} onClick={onClick}>
      {children}
    </button>
  );
}
