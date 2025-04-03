import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import NewsList from "@/components/news-list";
import Link from "next/link";
import { Suspense } from "react";

async function FilterHeader({year, month}) {
    const availableYears = await getAvailableNewsYears();
    let links = availableYears;

//aula 145, código para mostrar um erro se digitar na barra
//um ano ou mês que não exista, o + converte uma string em um num,
//mas depois ele foi retirado
if ((year && availableYears.includes(year)) ||
(month &&
!getAvailableNewsMonths(selectedYear).includes(month)))
{  throw new Error('Invalid filter') }

    //se houver ano selecionado, mas não mês
    if (year && !month) {
        links = getAvailableNewsMonths(selectedYear);
    }

    if (year && month) {
        links = []
    }
    return (
        
<header id="archive-header">
    <nav>
        <ul>
            {links.map((link) => {
                const href = year
                 ? `/archive/${year}/${link}`
                 : `/archive/${link}` ;

                return ( <li key={link}>
                <Link href={href}>{link}</Link>
            </li>);
})}
        </ul>
    </nav>
</header>
    )

}

async function FilteredNews({year, month}) {
    let news;

if (year && !month){
    news = await getNewsForYear(selectedYear);
} else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
}
//se não houver notícia para aquele ano
let newsContent = <p>No news found for that period</p>
//se houver alguma notícia, vai importar o componente que mostra
    if (news && news.length > 0) {
        newsContent = <NewsList news={news} />
    }

return newsContent;
}

export default async function FilteredNewsPage({params}) {
    const filter = params.filter;
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];

return (
    <>
<Suspense fallback={<p>Loading filter...</p>}>
    <FilterHeader year={selectedYear} month={selectedMonth} />
</Suspense>
<Suspense fallback={<p>Loading News...</p>}>
    <FilteredNews year={selectedYear} month={selectedMonth}/>
</Suspense>

</>);
}