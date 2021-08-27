import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDB'


class FilmItem extends React.Component {
    render() {
        const { film, displayDetailForFilm } = this.props
        return (
            <TouchableOpacity
                style={styles.main_container}
                onPress={() => displayDetailForFilm(film.id)}>
                <Image
                    style={styles.image}
                    source={{ uri: getImageFromApi(film.poster_path) }}
                />
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 275,
    },
    image: {
        width: 180,
        height: 270,
        margin: 5,
        backgroundColor: 'gray'
    }
})

export default FilmItem