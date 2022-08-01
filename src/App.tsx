// routing
import Routes from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import Snackbar from 'ui-component/extended/Snackbar';
import ThemeCustomization from 'themes';

// auth provider
import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';

import { ApolloProvider } from '@apollo/client';
import { client } from 'services/graphQL';
// ==============================|| APP ||============================== //

const App = () => (
    <ApolloProvider client={client}>
        <ThemeCustomization>
            <Locales>
                <NavigationScroll>
                    <AuthProvider>
                        <>
                            <Routes />
                            <Snackbar />
                        </>
                    </AuthProvider>
                </NavigationScroll>
            </Locales>
        </ThemeCustomization>
    </ApolloProvider>
);

export default App;
