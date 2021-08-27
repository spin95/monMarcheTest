import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'

function MovieItem({ id, poster_path }) {

    return (
        <Card key={id} style={{ width: '180', height: '270' }}>
            <img src={"https://image.tmdb.org/t/p/w300" + poster_path} width="180" height="270"  alt=""/>
        </Card>
    )
}

export default MovieItem