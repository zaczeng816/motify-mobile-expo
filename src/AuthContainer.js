import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";

function AuthContainer({setAuthTrue}) {
    const AuthStack = createStackNavigator();

    return (
        <NavigationContainer>
            <AuthStack.Navigator initialRouteName="Signup">
                <AuthStack.Screen name="Login" component={LoginScreen} options={setAuthTrue} />
                <AuthStack.Screen name="Signup" component={SignUpScreen} options={setAuthTrue} />
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
