import { Mountain } from './Mountain';
import { Center } from './Center';
import { Beach } from './Beach';
import styles from './Location.module.css';

interface Props {
    name: string;
}

export const LocationImage = ({ name }: Props) => {
    const imageMap: { [key: string]: JSX.Element } = {
        beach: <Beach />,
        center: <Center />,
        mountain: <Mountain />
    };
    return (
        <svg className={ styles.image } preserveAspectRatio="xMinYMid slice" viewBox="0 0 844 390" xmlns="http://www.w3.org/2000/svg">
            <g className={ styles.imagegroup }>
                { imageMap[name] }
            </g>
        </svg>
    );
}
