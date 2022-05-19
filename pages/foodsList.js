import Navbar from "../components/navbar"
import GradientLine from "../components/gradientLine"
import { fetcher } from "../lib/api"
import { parseCookies } from "nookies"
import ListItem from "../components/listItem"
import styles from "../styles/listStyle.module.css"

const FoodsList = ({ foods }) => {
    console.log(foods)
    
    return(<>
        <Navbar itemSelected='foods'/>
        <div className={styles.listContainer}>
            <div className={styles.titleList}>
                LIST OF FOODS
            </div>
            <GradientLine />
            <div className={styles.listDiv}>
                {foods.map(food => (
                    <div key={food.id}>
                        <ListItem item={food} />
                    </div>
                ))}
            </div>
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