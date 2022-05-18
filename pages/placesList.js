import Navbar from "../components/navbar";
import GradientLine from "../components/gradientLine";
import { parseCookies } from "nookies";
import { fetcher } from "../lib/api";

const PlacesList = ({ places }) => {
    return(<>
        <Navbar />
        <div className="listContent">
            <p>LIST OF PLACES</p>
            <GradientLine />
            {places.map(place => (
                <div key={place.id}>
                    <h3>{place.name}</h3>
                    <p dangerouslySetInnerHTML={{ __html: place.link.url}} />
                </div>
            ))}
        </div>
    </>);
}

export default PlacesList;

export async function getServerSideProps(ctx) {
    const jwt = parseCookies(ctx).jwt
    
    const placesResponse = await fetcher('http://localhost:1337/places', {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });

    return {
        props:{
            places: placesResponse
        }
    }
}