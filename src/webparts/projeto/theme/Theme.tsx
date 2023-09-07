import {createLightTheme, createDarkTheme} from "@fluentui/react-components"
import type { BrandVariants, Theme } from "@fluentui/react-components";

const azulzim: BrandVariants = { 
    10: "#020304",
    20: "#12191C",
    30: "#1A2930",
    40: "#203540",
    50: "#254250",
    60: "#2B5061",
    70: "#305E72",
    80: "#366C84",
    90: "#3B7B97",
    100: "#408AA9",
    110: "#4599BC",
    120: "#53A8CD",
    130: "#73B5D4",
    140: "#8FC2DC",
    150: "#A9D0E4",
    160: "#C2DEEC"
    };
    
     const lightTheme: Theme = {
       ...createLightTheme(azulzim), 
    };
    
     const darkTheme: Theme = {
       ...createDarkTheme(azulzim), 
    };
     
    
     darkTheme.colorBrandForeground1 = azulzim[110];
     darkTheme.colorBrandForeground2 = azulzim[120];

     export {lightTheme, darkTheme}