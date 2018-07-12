import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';
import { createNavigationPropConstructor, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import DetailComponent from '../components/DetailComponent/DetailComponent'
import Home from '../components/Home/Home'


// const middleware = createReactNavigationReduxMiddleware(
//     "Home",
//     state => state.nav,
//   );

// const navigationPropConstructor = createNavigationPropConstructor("Home")


export const AppNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home'
        }
    },
    DetailComponent: {
        screen: DetailComponent,//({navigation})  => <DetailComponent lat={navigation.state.params.lat} lng={navigation.state.params.lng} navigation={navigation}/>,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.name.toUpperCase()}`
        })
    }
},
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    },
    {
        initialRouteName: 'Home',

    }
)

// const AppWithNavigationState = ({ dispatch, nav }) => (

//   <AppNavigator
//     navigation={navigationPropConstructor( dispatch, nav )}
//   />
// );

// const mapStateToProps = state => ({
//   nav: state.nav,
// });

// export default connect(mapStateToProps)(AppWithNavigationState);

