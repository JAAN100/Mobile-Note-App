import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

const AuthForm = ({ mode, onSubmit }) => {
  const registering = mode === "signup";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (registering && !name.trim()) {
      Alert.alert("Missing name", "Please enter your name.");
      return;
    }

    if (!email.trim() || !password) {
      Alert.alert("Missing details", "Enter your email and password.");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({ name, email, password });
    } catch (error) {
      console.error("Authentication error:", error);
      Alert.alert(
        registering ? "Sign up failed" : "Sign in failed",
        error?.message || "Please check your details and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {registering && (
          <TextInput
            autoCapitalize="words"
            onChangeText={setName}
            placeholder="Name"
            style={styles.input}
            value={name}
          />
        )}
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          value={email}
        />
        <TextInput
          autoCapitalize="none"
          autoComplete="password"
          onChangeText={setPassword}
          placeholder="Password (8+ characters)"
          secureTextEntry
          style={styles.input}
          value={password}
        />
        <Pressable
          disabled={submitting}
          onPress={submit}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
            submitting && styles.disabled,
          ]}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {registering ? "Create account" : "Sign in"}
            </Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  content: { flexGrow: 1, justifyContent: "center", padding: 24 },
  input: {
    backgroundColor: "#fff",
    borderColor: "#d7d7d7",
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#007bff",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 48,
  },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default AuthForm;
