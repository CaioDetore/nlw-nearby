import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { s } from "./styles";
import { colors } from "@/styles/theme";

import { IconProps as TablerIconProps} from "@tabler/icons-react-native"

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean
}
function Button({ children, isLoading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={s.container} disabled={isLoading} activeOpacity={0.8} {...rest}>
      {isLoading ? (
        <ActivityIndicator color={colors.gray[100]} />
      ) : 
        children
      }
    </TouchableOpacity>
  );
}

function Title({ children }: TextProps) {
  return <Text style={s.title}>{children}</Text>;
}

type IconProps = {
  icon: React.ComponentType<TablerIconProps>
}

function Icon({icon: Icon}: IconProps) {
  return Icon
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };
