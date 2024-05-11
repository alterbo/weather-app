import styles from './Bevel.module.css';

interface Props {
    match: boolean;
}
export const Bevel = ({ match = false }: Props) => {
    const cssName = match ? styles.circle : styles.overflowcircle;
    return (
        <>
            <div className={ cssName }></div>
            <div className={ cssName }></div>
            <div className={ cssName }></div>
            <div className={ cssName }></div>
        </>
    );
};