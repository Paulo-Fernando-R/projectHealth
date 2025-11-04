import { FaSpinner } from "react-icons/fa6";
import cssColors from "../../utils/cssColors";
import styles from "./spinner.module.css";

export type SpinnerProps = {
    size?: number;
    color?: string;
};

export default function Spinner({ size = 24, color = cssColors.primary200 }: SpinnerProps) {
    return (
        <span
            className={styles.spinner}
            style={{
                width: size,
                height: size,
            }}
        >
            <FaSpinner size={size} color={color} />
        </span>
    );
}
