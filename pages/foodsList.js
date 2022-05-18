import Navbar from "../components/navbar";
import GradientLine from "../components/gradientLine";
import { fetcher } from "../lib/api";
import { parseCookies } from "nookies";

const FoodsList = ({ foods }) => {
    console.log(foods)
    
    return(<>
        <Navbar />
        <div className="listContent">
            <p>LIST OF FOODS</p>
            <GradientLine />
            {foods.map(food => (
                <div key={food.id}>
                    <h3>{food.name}</h3>
                    <p dangerouslySetInnerHTML={{ __html: food.link.formats.thumbnail.name}} />
                </div>
            ))}
        </div>
    </>);
}

export default FoodsList;

export async function getServerSideProps(ctx) {
    const jwt = parseCookies(ctx).jwt
    
    const foodsResponse = await fetcher('http://localhost:1337/foods', {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });

    return {
        props:{
            foods: foodsResponse
        }
    }
}