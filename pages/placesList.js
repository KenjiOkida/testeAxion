import Navbar from "../components/navbar";
import GradientLine from "../components/gradientLine";
import { parseCookies } from "nookies";
import { fetcher } from "../lib/api";
import ListItem from "../components/listItem";
import styles from "../styles/listStyle.module.css"

const PlacesList = ({ places }) => {
    return(<>
        <Navbar itemSelected='places' />
        <div className={styles.listContainer}>
            <div className={styles.titleList}>
                LIST OF PLACES
            </div>
            <GradientLine />
            <div className={styles.listDiv}>  
                {places.map(place => (
                    <div key={place.id}>
                        <ListItem item={place} />
                    </div>
                ))}
            </div> 
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