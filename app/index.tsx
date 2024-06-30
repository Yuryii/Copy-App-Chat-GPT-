import { Text, View } from "react-native";
import AnimateIntro from "@/components/AnimateIntro";
import BottomLoginScreen from "@/components/BottomLoginScreen";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AnimateIntro />
      <BottomLoginScreen />
    </View>
  );
}
