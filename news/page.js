import NewsList from "@/components/news-list"
import { getAllNews } from "@/lib/news";
/**função para buscar os dados no banco de dados que
 * roda no endereço abaixo,  */
export default async function NewsPage() {
   
    /* esse código foi substituído pois o database foi retirado do 
    backend e colocado no front

    const response = await fetch('http://localhost:8080/news');
    if (!response.ok) {
        throw new Error ('Failed to fetch news.');
    }*/

    const news = getAllNews();

    return(
    <>
        <h1>News Page</h1>
        <NewsList news={news} />
    </>
    );
}