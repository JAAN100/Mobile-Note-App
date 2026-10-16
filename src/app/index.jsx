import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import postItImage from "@/assets/images/post-it.png";
import { useAuth } from "../../context/authContext";

const HomeScreen = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#007bff" />;
  }

  return (
    <View style={styles.container}>
      <Image source={postItImage} style={styles.image}></Image>
      <Text style={styles.title}>Welcome to Notes App</Text>
      <Text style={styles.subTitle}>Capture your thoughts anytime anywhere.</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push(user ? "/notes" : "/auth/signin")}
      >
        <Text style={styles.buttonText}>{user ? "My Notes" : "Get Started"}</Text>
      </Pressable>
    </View>
  );
};

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
    textAlign: "center",
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
  },
  loader: {
    flex: 1,
  },
});


export default HomeScreen;