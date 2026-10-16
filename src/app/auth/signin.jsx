import { Link, Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AuthForm from "../../../components/AuthForm";
import { useAuth } from "../../../context/authContext";

const SignInScreen = () => {
  const { user, loading, login } = useAuth();

  if (!loading && user) return <Redirect href="/" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <AuthForm
        mode="signin"
        onSubmit={({ email, password }) => login(email, password)}
      />
      <Link href="/auth/signup" style={styles.link}>
        Create an account
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 20 },
  title: {
    color: "#333",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 24,
    textAlign: "center",
  },
  link: {
    color: "#007bff",
    fontSize: 15,
    fontWeight: "600",
    padding: 16,
    textAlign: "center",
  },
});

export default SignInScreen;
