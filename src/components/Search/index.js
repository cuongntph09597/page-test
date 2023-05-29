/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */

// import { Pagination, Stack } from "@mui/material";
import { useRouter } from "next/router";
import Breadcrumbs from "../Breadcrumbs";
import Footer from "../Footer";
import Header from "../Header";
import ItemProduct from "../ItemProduct";
import RecentPosts from "../RecentPosts";

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const Search = (props) => {
    
    const {postListSearch} = props

    const router = useRouter();

    let myReA = /a/g;
    let myReI = /i/g;
    let myReS = /s/g;
    let myReP = /p/g;
    let myReC = /c/g;

    const paramsChild = {
        name: `Search Results for "${router?.query?.value.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с')}"`,
        url: ''
    }

    const type = 'search';

    return (
        <>
            <div className="content-primary">
                <main className="site-main">
                {/* <!-- .breadcrumbs --> */}
                    <Breadcrumbs paramsChild={paramsChild} />
                    <div className="dis-none-laptop dis-block top-product">
                        <h1>Search</h1>
                        <span>{paramsChild.name}</span>
                    </div>
                    {postListSearch.length > 0 ? (
                        <div className="recent-content">
                            {postListSearch.map((item) => {
                                return <ItemProduct 
                                            type={type} 
                                            key={item.id} 
                                            idPost={item.id}
                                            image={item.image} 
                                            title={item?.title} 
                                            url={item.slug} 
                                            author={item.author}
                                            description={item.description}
                                            categories={item?.categories}
                                            createdDate={item?.date}
                                        />
                            })}
                        </div>
                    ) : (
                        <section className="no-results not-found">
                            <header className="page-header">
                                <h1 className="page-title" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>Nothing found</h1>
                            </header>
                            <div className="page-content">
                                <p>Sorry, but nothing matched your search terms. Please try again with some different keywords.</p>
                            </div>
                        </section>
                    )} 
                    {/* <Stack spacing={2} className="assadsadsad" sx={{ justifyContent: 'center', paddingTop: '20px' }}>
                        <Pagination count={10} color="primary" sx={{ justifyContent: 'center', display: 'flex' }}/>
                    </Stack> */}
                </main>
            </div>
        </>
    );
};

export default Search;
