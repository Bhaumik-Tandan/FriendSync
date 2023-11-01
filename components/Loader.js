import { ActivityIndicator, View, StyleSheet } from "react-native";

function Loader({ style = {} }) {
  return (
    <View style={{ ...styles.container, ...style }}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
}

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
