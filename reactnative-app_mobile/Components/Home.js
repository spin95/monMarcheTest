import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText, getPopularFilms } from '../API/TMDB'

class Home extends React.Component {

    constructor(props) {
        super(props)


        this.state = {
            page: 0,
            totalPages: 0,
            films: [],
            search: "",
            isLoading: false
        }
    }

    componentDidMount() {
        getPopularFilms(this.state.page + 1).then(data => {
            this.state.page = data.page
            this.state.totalPages = data.total_pages
            this.setState({
                films: [...this.state.films, ...data.results],
                isLoading: false
            })
        })
    }

    searchFilms() {
        this.state.page = 0
        this.state.totalPages = 0
        this.setState({
            films: [],
        }, () => {
            this.loadFilms()
        })
    }

    loadFilms() {
        if (this.state.search.length != 0) {
            this.setState({ isLoading: true })
            getFilmsFromApiWithSearchedText(this.state.search, this.state.page + 1).then(data => {
                this.state.page = data.page
                this.state.totalPages = data.total_pages
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                })
            })
        } else {
            this.componentDidMount()
        }
    }

    closeSearch() {
        this.setState({
            isLoading: true,
            films: [],
            search: ""
        })
        this.state.page = 0
        this.state.totalPages = 0
        this.componentDidMount()
    }

    displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    displayFilmDetail = (idFilm) => {
        console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.searchBar}>
                    <SearchBar
                        containerStyle={styles.searchBar}
                        inputContainerStyle={styles.searchBarInput}
                        inputStyle={styles.searchBarText}
                        searchIcon={<TouchableOpacity onPress={() => this.searchFilms()}><Image source={require('../assets/search.png')} style={styles.searchIcon} /></TouchableOpacity>}
                        clearIcon={<TouchableOpacity onPress={() => this.closeSearch()}><Image source={require('../assets/searchClear.png')} style={styles.searchIcon} /></TouchableOpacity>}
                        placeholder="Rechercher un film"
                        onChangeText={data => this.setState({ search: data })}
                        value={this.state.search}
                        lightTheme={true}
                        onBlur={() => this.searchFilms()}
                    />
                </View>
                <FlatList
                    contentContainerStyle={{ justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }}
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <FilmItem film={item} displayDetailForFilm={this.displayFilmDetail} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.state.page < this.state.totalPages) {
                            this.loadFilms()
                        }
                    }}
                />
                {this.displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    searchBar: {
        height: 32,
        padding: 0,
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 20,
        borderRadius: 5,
    },
    searchBarInput: {
        height: 20,
        borderRadius: 5,
    },
    searchBarText: {
        marginTop: 4,
        fontSize: 16,
    },
    searchIcon: {
        height: 20,
        width: 20,
        opacity: 0.4,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Home