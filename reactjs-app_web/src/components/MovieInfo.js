import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/MovieInfo.css'

function MovieInfo({ filmInfo }) {

    return (
        <div>
            <div className="row">
                <div className="col-8">
                    <div className="title">
                        {filmInfo[0]}
                    </div>
                    <div className="description">
                        {filmInfo[1]}
                    </div>
                    <div className="rate">
                        {filmInfo[2]}/10
                    </div>
                </div>
                <div className="col-4">
                    <div className="image">
                        <img src={"https://image.tmdb.org/t/p/w300" + filmInfo[3]} width="180" height="270" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieInfo