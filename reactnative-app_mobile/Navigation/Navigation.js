
import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"
import Home from '../Components/Home'
import FilmDetail from '../Components/FilmDetail'

const HomeStackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Movies',
            headerStyle: {
                backgroundColor: "#60A5FA",
            },
            headerTitleStyle: {
                color: "white",
                textAlign: "center",
            }
        }
    },
    FilmDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
        screen: FilmDetail,
        navigationOptions: {
            title: 'Movies',
            headerStyle: {
                backgroundColor: "#60A5FA",
            },
            headerTitleStyle: {
                color: "white",
                textAlign: "center",
            }
        }
    }
})

export default createAppContainer(HomeStackNavigator)