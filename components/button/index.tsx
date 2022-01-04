import styles from  "../../styles/_button.module.scss";

const ButtonComponent = (props) => {
  const yel_btn = ["/", "x", "-", "+", "="];
  const brown_btn = ["AC", "+/-", "%"];
  return (
    <button
      key={props.children}
      className={`${styles["button-style"]} ${yel_btn.includes(props.children) && styles["yel_btn"]} ${brown_btn.includes(props.children) && styles["btn_brown"]} ${props.children == 0 && styles["grow"]}`}
      onClick={() => props.handleClick(props.children)}
    >
      {props.children}
    </button>
  );
};

export default ButtonComponent;
