import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";

function AuthContainer() {
    const AuthStack = createStackNavigator();

    return (
        <NavigationContainer>
            <AuthStack.Navigator initialRouteName="Login">
                <AuthStack.Screen name="Login" component={LoginScreen} />
                <AuthStack.Screen name="SignUp" component={SignUpScreen} />
                {/* <AuthStack.Screen
              name="Main"
              component={MainContainer}
              options={{ headerShown: false }}
            /> */}
            </AuthStack.Navigator>
        </NavigationContainer>
    );
}

export default AuthContainer;
