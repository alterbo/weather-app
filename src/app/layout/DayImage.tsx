import { Atmosphere } from "../weather-conditions/Atmosphere";
import { Clear } from "../weather-conditions/Clear";
import { Clouds } from "../weather-conditions/Clouds";
import { Drizzle } from "../weather-conditions/Drizzle";
import { Rain } from "../weather-conditions/Rain";
import { Snow } from "../weather-conditions/Snow";
import { Thunderstorm } from "../weather-conditions/Thunderstorm";
import styles from '../../features/week/Week.module.css';

interface Props {
    name: string;
}

export const DayImage = ({ name }: Props) => {
    const imageMap: { [key: string]: JSX.Element } = {
        200: <Thunderstorm />,
        201: <Thunderstorm />,
        202: <Thunderstorm />,
        210: <Thunderstorm />,
        211: <Thunderstorm />,
        212: <Thunderstorm />,
        221: <Thunderstorm />,
        230: <Thunderstorm />,
        231: <Thunderstorm />,
        232: <Thunderstorm />,
        300: <Drizzle />,
        301: <Drizzle />,
        302: <Drizzle />,
        310: <Drizzle />,
        311: <Drizzle />,
        312: <Drizzle />,
        313: <Drizzle />,
        314: <Drizzle />,
        321: <Drizzle />,
        500: <Rain />,
        501: <Rain />,
        502: <Rain />,
        503: <Rain />,
        504: <Rain />,
        511: <Rain />,
        520: <Rain />,
        521: <Rain />,
        522: <Rain />,
        531: <Rain />,
        600: <Snow />,
        601: <Snow />,
        602: <Snow />,
        611: <Snow />,
        612: <Snow />,
        613: <Snow />,
        615: <Snow />,
        616: <Snow />,
        620: <Snow />,
        621: <Snow />,
        622: <Snow />,
        701: <Atmosphere />,
        711: <Atmosphere />,
        731: <Atmosphere />,
        741: <Atmosphere />,
        751: <Atmosphere />,
        761: <Atmosphere />,
        762: <Atmosphere />,
        771: <Atmosphere />,
        781: <Atmosphere />,
        800: <Clear />,
        801: <Clouds />,
        802: <Clouds />,
        803: <Clouds />,
        804: <Clouds />,
    };
    return (
        <svg className={ styles.image } viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg">
            { imageMap[name] }
        </svg>
    );
}