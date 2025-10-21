
import styles from "./actionButton.module.css";

export type ActionButtonProps = {
    text: string;
    onClick: VoidFunction;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
};

export default function ActionButton({
    onClick,
    text,
    disabled,
    loading,
    icon,
    iconPosition = "left",
}: ActionButtonProps) {
    return (
        <button className={styles.actionButton} onClick={onClick} disabled={disabled || loading}>
            {iconPosition === "left" && icon}
            <span className={"titleh3 " + styles.text}> {text}</span>
            {iconPosition === "right" && icon}
        </button>
    );
}
