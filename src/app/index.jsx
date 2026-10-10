import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import postItImage from "@/assets/images/post-it.png"
const HomeScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={postItImage} style={styles.image}></Image>
      <Text style={styles.title}>Welcome to Notes App</Text>
      <Text style={styles.subTitle}>Capture your thoughts anytime anywhere.</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => router.push("/notes")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa"
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#333",
    textAlign: "center"
  },
  subTitle: {
    fontSize: 16,
    color: "#666",
    textAlign: 'center',
    marginBottom: 20
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold'
  }
});


export default HomeScreen;