import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import MovieItem from './MovieItem'
import MovieInfo from './MovieInfo'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/Movies.css'
import imgBack from '../assets/back.png'
import imgSearch from '../assets/search.png'

// styles for popover
const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

function Movies() {

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [films, setFilms] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        getFilms()
    }, [])

    // get popular films
    function getFilms() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=2975d5e3816692c1a4a98e0d9429ee85&page=" + page)
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setFilms(data.results)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    // get films from search
    const [searchedText, setSearchedText] = useState("")
    function search(searchedText) {
        if (!searchedText) {
            setSearchedText(null)
            getFilms()
        } else {
            setSearchedText(searchedText)
            fetch("https://api.themoviedb.org/3/search/movie?api_key=2975d5e3816692c1a4a98e0d9429ee85&query=" + searchedText)
                .then(res => res.json())
                .then(
                    (data) => {
                        setIsLoaded(true)
                        setFilms(data.results)
                    },
                    (error) => {
                        setIsLoaded(true)
                        setError(error)
                    }
                )
        }
    }

    // Display/Close film informations on click
    const [displayInfo, setDisplayInfo] = useState(false)
    const [filmInfo, setFilmInfo] = useState([])
    function displayFilmInfo(title, description, rate, image) {
        setDisplayInfo(true)
        setFilmInfo([title, description, rate, image])
    }
    function closeFilmInfo() {
        setDisplayInfo(false)
    }

    // Display/Close popover on hover
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const [title, setTitle] = useState(null)
    const displayPopover = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const closePopover = () => {
        setAnchorEl(null)
    }

    if (error) {
        return <div>Erreur : {error.message}</div>
    } else if (!isLoaded) {
        return <div>Chargement...</div>
    } else {
        return (
            <div className="container">
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    onClose={closePopover}
                    disableRestoreFocus>
                    <Typography>{title}</Typography>
                </Popover>
                {displayInfo ?
                    <div>
                        <br/><br/><br/>
                        <img src={imgBack} className="pointer" width="50px" height="50px" onClick={() => closeFilmInfo()} alt=""/>
                        <MovieInfo
                            filmInfo={filmInfo}
                        />
                    </div>
                    :
                    <div>
                        <Form>
                            <div className="searchBar">
                                <div className="searchImg">
                                    <img src={imgSearch} width="20px" alt=""/>
                                </div>
                                <div className="searchInput">
                                    <Form.Control type="text" placeholder="Rechercher un film" onChange={e => search(e.target.value)} />
                                </div>
                            </div>
                        </Form>
                        <div className="movies">
                            {films.map(item => (
                                <div className="pointer"
                                    key={item.id}
                                    onClick={() => displayFilmInfo(item.title, item.overview, item.vote_average, item.poster_path)}
                                    onMouseEnter={() => setTitle(item.title)}
                                    onMouseLeave={() => setTitle(null)}>
                                    <Typography
                                        aria-owns={open ? 'mouse-over-popover' : undefined}
                                        aria-haspopup="true"
                                        onMouseEnter={displayPopover}
                                        onMouseLeave={closePopover}
                                    >
                                        <MovieItem
                                            id={item.id}
                                            title={item.title}
                                            poster_path={item.poster_path}
                                        />
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Movies