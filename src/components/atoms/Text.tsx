import * as React from "react";
import { Text, TextProps } from "react-native";
import { colors, fonts, sizes } from "../../utils/theme";

interface Props extends TextProps {
  children?: any;
}

export const Title = (props: Props) => (
  <Text
    {...props}
    style={[
      { fontFamily: fonts.med, fontSize: sizes.title, color: colors.dark },
      props.style,
    ]}
  />
);

export const Regular = (props: Props) => (
  <Text
    {...props}
    style={[
      { fontFamily: fonts.med, fontSize: sizes.regular, color: colors.dark },
      props.style,
    ]}
  />
);

export const Header = (props: Props) => (
  <Text
    {...props}
    style={[
      { fontFamily: fonts.med, fontSize: sizes.header, color: colors.dark },
      props.style,
    ]}
  />
);

export const Small = (props: Props) => (
  <Text
    {...props}
    style={[
      { fontFamily: fonts.med, fontSize: sizes.small, color: colors.dark },
      props.style,
    ]}
  />
);

export const RegularWhite = (props: Props) => (
  <Text
    {...props}
    style={[
      {
        fontFamily: fonts.med,
        fontSize: sizes.regular,
        color: colors.background,
      },
      props.style,
    ]}
  />
);

export const RegularDarkGray = (props: Props) => (
  <Text
    {...props}
    style={[
      {
        fontFamily: fonts.med,
        fontSize: sizes.regular,
        color: colors.darkGray,
      },
      props.style,
    ]}
  />
);

export const RegularLightGray = (props: Props) => (
  <Text
    {...props}
    style={[
      {
        fontFamily: fonts.med,
        fontSize: sizes.regular,
        color: colors.gray,
      },
      props.style,
    ]}
  />
);
