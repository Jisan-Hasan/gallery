import styles from "./loading.module.css";

const Loading = () => {
    return (
        <div>
            <div className={styles.loader}>
                <div className={styles["loading-infinity"]}>
                    <div>
                        <span></span>
                    </div>
                    <div>
                        <span></span>
                    </div>
                    <div>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
