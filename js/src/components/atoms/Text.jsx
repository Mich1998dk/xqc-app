import * as React from "react";
import { Text } from "react-native";
import { colors, fonts, sizes } from "../../utils/theme";
export const Title = (props) => (<Text {...props} style={[
        { fontFamily: fonts.med, fontSize: sizes.title, color: colors.white },
        props.style,
    ]}/>);
export const Regular = (props) => (<Text {...props} style={[
        { fontFamily: fonts.med, fontSize: sizes.regular, color: colors.gray },
        props.style,
    ]}/>);
export const Button = (props) => (<Text {...props} style={[
        { fontFamily: fonts.med, fontSize: sizes.regular, color: colors.white },
        props.style,
    ]}/>);
export const ButtonSecondary = (props) => (<Text {...props} style={[
        { fontFamily: fonts.med, fontSize: sizes.regular, color: colors.accent },
        props.style,
    ]}/>);
export const Header = (props) => (<Text {...props} style={[
        { fontFamily: fonts.med, fontSize: sizes.header, color: colors.white },
        props.style,
    ]}/>);
export const Small = (props) => (<Text {...props} style={[
        { fontFamily: fonts.med, fontSize: sizes.base12, color: colors.white },
        props.style,
    ]}/>);
