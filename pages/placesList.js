import Navbar from "../components/navbar";
import GradientLine from "../components/gradientLine";

const PlacesList = () => {
    return(<>
        <Navbar />
        <div className="listContent">
            <p>LIST OF PLACES</p>
            <GradientLine />
        </div>
    </>);
}

export default PlacesList;

export async function getStaticProps() {

}