// material-ui
import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// assets
import defaultColor from 'assets/scss/_themes-vars.module.scss';
import theme1 from 'assets/scss/_theme1.module.scss';
import theme2 from 'assets/scss/_theme2.module.scss';
import theme3 from 'assets/scss/_theme3.module.scss';
import theme4 from 'assets/scss/_theme4.module.scss';
import theme5 from 'assets/scss/_theme5.module.scss';
import theme6 from 'assets/scss/_theme6.module.scss';

// types
import { ColorProps } from 'types';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (navType: PaletteMode, presetColor: string) => {
    let colors: ColorProps;
    switch (presetColor) {
        case 'theme1':
            colors = theme1;
            break;
        case 'theme2':
            colors = theme2;
            break;
        case 'theme3':
            colors = theme3;
            break;
        case 'theme4':
            colors = theme4;
            break;
        case 'theme5':
            colors = theme5;
            break;
        case 'theme6':
            colors = theme6;
            break;
        case 'default':
        default:
            colors = defaultColor;
    }

    return createTheme({
        palette: {
            mode: navType,
            common: {
                black: colors.black
            },
            primary: {
                light: navType === 'dark' ? colors.darkPrimaryLight : colors.primaryLight,
                main: navType === 'dark' ? colors.darkPrimaryMain : colors.primaryMain,
                dark: navType === 'dark' ? colors.darkPrimaryDark : colors.primaryDark,
                200: navType === 'dark' ? colors.darkPrimary200 : colors.primary200,
                800: navType === 'dark' ? colors.darkPrimary800 : colors.primary800,
                100: colors.primary100,
                300: colors.primary300,
                400: colors.primary400,
                500: colors.primary500,
                600: colors.primary600,
                700: colors.primary700,
                900: colors.primary900
            },
            secondary: {
                light: navType === 'dark' ? colors.darkSecondaryLight : colors.secondaryLight,
                main: navType === 'dark' ? colors.darkSecondaryMain : colors.secondaryMain,
                dark: navType === 'dark' ? colors.darkSecondaryDark : colors.secondaryDark,
                200: navType === 'dark' ? colors.darkSecondary200 : colors.secondary200,
                800: navType === 'dark' ? colors.darkSecondary800 : colors.secondary800,
                600: colors.secondary600,
                300: colors.secondary300,
                400: colors.secondary400,
                500: colors.secondary500,
                700: colors.secondary700,
                900: colors.secondary900
            },
            error: {
                light: colors.errorLight,
                main: colors.errorMain,
                dark: colors.errorDark,
                100: colors.error100
            },
            orange: {
                light: colors.orangeLight,
                main: colors.orangeMain,
                dark: colors.orangeDark,
                100: colors.orange100,
                200: colors.orange200
            },
            warning: {
                light: colors.warningLight,
                main: colors.warningMain,
                dark: colors.warningDark
            },
            success: {
                light: colors.successLight,
                200: colors.success200,
                main: colors.successMain,
                dark: colors.successDark,
                300: colors.success300,
                100: colors.success100
            },
            grey: {
                800: colors.greyColorRich,
                50: colors.grey50,
                100: colors.grey100,
                500: colors.greyColorBorder,
                600: colors.grey600,
                700: colors.greyColorBg,
                900: colors.greyColorBgDark,
                200: colors.greyColor,
                300: colors.greyColorMain,
                400: colors.black50
            },
            dark: {
                light: colors.darkTextPrimary,
                main: colors.darkLevel1,
                dark: colors.darkLevel2,
                800: colors.darkBackground,
                900: colors.darkPaper,
                700: colors.grey300
            },
            text: {
                primary: navType === 'dark' ? colors.darkTextPrimary : colors.grey700,
                secondary: navType === 'dark' ? colors.darkTextSecondary : colors.grey500,
                dark: navType === 'dark' ? colors.darkTextPrimary : colors.grey900,
                hint: colors.grey100
            },
            divider: navType === 'dark' ? colors.darkTextPrimary : colors.grey200,
            background: {
                paper: navType === 'dark' ? colors.darkLevel2 : colors.paper,
                default: navType === 'dark' ? colors.darkPaper : colors.paper
            }
        }
    });
};

export default Palette;
