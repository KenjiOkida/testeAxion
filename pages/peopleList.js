import Navbar from "../components/navbar";
import GradientLine from "../components/gradientLine";
import { parseCookies } from "nookies";
import { fetcher } from "../lib/api";

const PeopleList = ({ people }) => {
    return(<>
        <Navbar />
        <div className="listContent">
            <p>LIST OF PEOPLE</p>
            <GradientLine />
            {people.map(person => (
                <div key={person.id}>
                    <h3>{person.name}</h3>
                    <p dangerouslySetInnerHTML={{ __html: person.link.url}} />
                </div>
            ))}
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