import styles from "../styles/listStyle.module.css"
import Image from 'next/image'

const ListItem = ({ item }) => {
    const { API_URL } = process.env
    
    return(
        <div className={styles.itemDiv}>
            <div className={styles.imageDiv}>
                <Image src={API_URL + item.link.url} width={item.link.width} height={item.link.height} />
            </div>
            <div className={styles.nameDiv}>
                <span className={styles.nameStyle}>{item.name}</span>
            </div>
        </div>
    );
}

export default ListItem;