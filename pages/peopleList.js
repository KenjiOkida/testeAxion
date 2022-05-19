import Navbar from "../components/navbar";
import GradientLine from "../components/gradientLine";
import { parseCookies } from "nookies";
import { fetcher } from "../lib/api";
import ListItem from "../components/listItem";
import styles from "../styles/listStyle.module.css"

const PeopleList = ({ people }) => {
    return(<>
        <Navbar itemSelected='people' />
        <div className={styles.listContainer}>
            <div className={styles.titleList}>
                LIST OF PEOPLE
            </div>
            <GradientLine />
            <div className={styles.listDiv}>
                {people.map(person => (
                    <div key={person.id}>
                        <ListItem item={person} />
                    </div>
                ))}
            </div>
        </div>
    </>);
}

export default PeopleList;

export async function getServerSideProps(ctx) {
    const jwt = parseCookies(ctx).jwt
    
    const peopleResponse = await fetcher('http://localhost:1337/people', {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });

    return {
        props:{
            people: peopleResponse
        }
    }
}