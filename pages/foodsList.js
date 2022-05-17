import Navbar from "../components/navbar";
import GradientLine from "../components/gradientLine";
import { fetcher } from "../lib/api";

const FoodsList = () => {
    return(<>
        <Navbar />
        <div className="listContent">
            <p>LIST OF FOODS</p>
            <GradientLine />
        </div>
    </>);
}

export default FoodsList;

export async function getStaticProps() {
    const foodsResponse = await fetcher('http://localhost:1337/foods');
    console.log(foodsResponse);
    return {
        props:{
            foods: foodsResponse
        }
    }
}