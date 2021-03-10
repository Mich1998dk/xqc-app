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
      { fontFamily: fonts.med, fontSize: sizes.title, color: colors.white },
      props.style,
    ]}
  />
);

export const Regular = (props: Props) => (
  <Text
    {...props}
    style={[
      { fontFamily: fonts.med, fontSize: sizes.regular, color: colors.gray },
      props.style,
    ]}
  />
);
export const Button = (props: Props) => (
  <Text
    {...props}
    style={[
      { fontFamily: fonts.med, fontSize: sizes.regular, color: colors.white },
      props.style,
    ]}
  />
);

export const ButtonSecondary = (props: Props) => (
  <Text
    {...props}
    style={[
      { fontFamily: fonts.med, fontSize: sizes.regular, color: colors.accent },
      props.style,
    ]}
  />
);

export const Header = (props: Props) => (
  <Text
    {...props}
    style={[
      { fontFamily: fonts.med, fontSize: sizes.header, color: colors.white },
      props.style,
    ]}
  />
);

export const Small = (props: Props) => (
  <Text
    {...props}
    style={[
      { fontFamily: fonts.med, fontSize: sizes.base12, color: colors.white },
      props.style,
    ]}
  />
);
