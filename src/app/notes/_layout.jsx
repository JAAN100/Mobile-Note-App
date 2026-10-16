import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../../../context/authContext";

const NoteLayout = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    if (!user) {
        return <Redirect href="/auth/signin" />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        />

    );
}

export default NoteLayout;