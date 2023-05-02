import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";

function AuthContainer({setAuth}) {
    const AuthStack = createStackNavigator();
    console.log(setAuth)
    return (
        <NavigationContainer>
            <AuthStack.Navigator initialRouteName="Login">
                <AuthStack.Screen name="Login"
                                component={LoginScreen}
                                options={{ headerShown: false }}
                                  initialParams={{ setAuth }}
                />
                <AuthStack.Screen name="SignUp"
                                component={SignUpScreen}
                                options={{ headerShown: false }}
                                  initialParams={{ setAuth }}
                />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
}

export default AuthContainer;
