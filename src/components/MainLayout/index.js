/* eslint-disable arrow-body-style */

// material-ui
import Footer from '../Footer';
import Header from '../Header';
import MetaDescription from '../MetaDescription';
import RecentPosts from '../RecentPosts';


const MainLayout = (props) => {
    const { listCategories, metaData } = props;

    return (
        <>
            <MetaDescription title={metaData?.og_title} description={metaData.og_description} imageUrl={metaData.og_image} url={metaData.og_url} type={metaData.og_type} imageAlt={metaData?.og_title} />
            <Header {...props} />
            <div className="container site-content">
                {props.children}
                <RecentPosts {...props} />
            </div>
            <Footer {...props} />
        </>
    );
};

export default MainLayout;
