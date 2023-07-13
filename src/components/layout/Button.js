const Button = (props) => {
  return (
    <button
      className={`btn d-flex align-items-center ${props.className}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
