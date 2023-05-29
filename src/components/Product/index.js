/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
// import { Pagination, Stack } from "@mui/material";

import { useRouter } from "next/router";
import Breadcrumbs from "../Breadcrumbs";
import ItemProduct from "../ItemProduct";
import RecentPosts from "../RecentPosts";

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const Product = (props) => {
    const { postsItemProduct } = props;

    const type = 'product';

    const paramsChild = {
        name: postsItemProduct?.name,
        params: ''
    }
    
    return (
        <>
            <div className="content-primary">
                <main className="site-main">
                {/* <!-- .breadcrumbs --> */}
                    <Breadcrumbs paramsChild={paramsChild} />
                    <div className="dis-none-laptop dis-block top-product">
                        <h1 dangerouslySetInnerHTML={{ __html: paramsChild?.name }}></h1>
                        <span>Read 10 posts from {paramsChild?.name}</span>
                    </div>
                    <div className="recent-content">
                        {
                            postsItemProduct.post.map((item) => {
                                return (
                                    <ItemProduct 
                                        key={item.id} 
                                        idPost={item.id}
                                        image={item.image} 
                                        title={item?.title} 
                                        url={item.slug} 
                                        author={item.author}
                                        description={item.description}
                                        categories={item?.categories}
                                        createdDate={item?.date}
                                        type={type} 
                                    />
                                )
                            }) 
                        }
                    </div>
                    {/* <Stack spacing={2} className="assadsadsad" sx={{ justifyContent: 'center', paddingTop: '20px' }}>
                        <Pagination count={10} color="primary" sx={{ justifyContent: 'center', display: 'flex' }}/>
                    </Stack> */}
                </main>
            </div>
        </>
    );
};

export default Product;
