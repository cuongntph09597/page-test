import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Footer = ({listCategories, recentPost}) => {

    const goTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <footer className="site-footer">
            <div className="footer-top dis-none-laptop dis-block">
                <div>
                    <h2 className="footer-h2">Recent Posts</h2>
                    <ul className="footer-menu">
                        {(recentPost || []).map((item) => {
                            return (
                                <li className="footer-item" key={item.id}>
                                    <Link href={'/news/' + item.slug}>
                                        {item.yoast_head_json?.og_title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="dis-flex">
                    <div style={{width: '50%'}}>
                        <h2 className="footer-h2">Categories</h2>
                        <ul className="footer-menu"> 
                            {(listCategories || []).map((item, index) => {
                                if (item.parent > 0 && index < 7) {
                                    return (
                                        <li key={item?.id} className="footer-item">
                                            <Link href={'/category/' + item.slug}>
                                                {item?.name}
                                            </Link>    
                                        </li>
                                    )
                                }
                                return <div key={item?.id} />
                            })}
                        </ul>
                    </div>
                    <div style={{marginLeft: '30px'}}>
                        <h2 className="footer-h2">More</h2>
                        <ul className="footer-menu">
                            <li className="footer-item">
                                <Link href="/">
                                    RSS
                                </Link>    
                            </li>
                            <li className="footer-item">
                                <Link href="/">
                                    Sitemap
                                </Link> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="site-bottom">
                <div className="container" style={{ justifyContent: 'center'}}>
                    <div className="site-info">
                        © 2022 <Link href="/">Fav Sporting</Link> - Design by <Link href="/">Fav Sporting</Link>
                    </div>
                </div>
            </div>
            <button onClick={goTop} className="btn_to_top" type="button" title="Go to top" style={{display: 'block'}}>
                <i className="fa fa-arrow-circle-up" aria-hidden="true" />
                <FontAwesomeIcon
                    icon={faArrowCircleUp}
                    size={'1x'}
                    style={{ cursor: 'pointer', color: '#fff' }} 
                />
            </button>
        </footer>
    )
}

export default Footer
