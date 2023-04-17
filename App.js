import React, {useState} from 'react';
import MainContainer from './src/MainContainer';
import AuthContainer from './src/AuthContainer';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    if (!isAuthenticated){
        return <AuthContainer />;
    }
    else{
        return <MainContainer />;
    }
}

export default App;
