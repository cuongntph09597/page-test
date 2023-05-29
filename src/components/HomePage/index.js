/* eslint-disable react-hooks/exhaustive-deps */
// import { Pagination, Stack } from '@mui/material';
import { Pagination, Stack } from '@mui/material'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ItemProduct from '../ItemProduct'

const HomePage = (props) => {

    const {listPost} = props
    const router = useRouter()

    const initPage = router.query.page ? router.query.page : 1
    const [pageApi, setPageApi] = useState(initPage);


    const handleChangePage = (page) => {
        setPageApi(page);
        router.push(`?page=${page}`);
    } 

    return (
        <>
            <div className="content-primary">
                <main className="site-main">
                    <div className="recent-content">
                        {(listPost || []).map(
                            (item) =>
                                <ItemProduct 
                                    key={item.id} 
                                    idPost={item.id}
                                    image={item.image} 
                                    title={item?.title || ''} 
                                    url={item.slug} 
                                    author={item.author}
                                    description={item.description}
                                    categories={item?.categories}
                                    createdDate={item?.date}
                                />
                        )}
                    </div>
                </main>
                <Stack spacing={2} className="assadsadsad" sx={{ justifyContent: 'center', paddingTop: '20px' }}>
                    <Pagination 
                        count={10} 
                        page={pageApi}
                        onChange={(e, value) => handleChangePage(value)} 
                        color="primary" 
                        sx={{ justifyContent: 'center', display: 'flex' }}
                    />
                </Stack>
            </div>
        </>
    )
}

export default HomePage
