import { Link, Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AuthForm from "../../../components/AuthForm";
import { useAuth } from "../../../context/authContext";

const SignUpScreen = () => {
  const { user, loading, register } = useAuth();

  if (!loading && user) return <Redirect href="/" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <AuthForm
        mode="signup"
        onSubmit={({ name, email, password }) =>
          register(name, email, password)
        }
      />
      <Link href="/auth/signin" style={styles.link}>
        Already have an account? Sign in
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

export default SignUpScreen;
