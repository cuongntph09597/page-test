/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

const RecentPosts = (props) => {
    
    const {recentPost} = props

    let myReA = /a/g;
    let myReI = /i/g;
    let myReS = /s/g;
    let myReP = /p/g;
    let myReC = /c/g;

    return (
        <>
            <aside className="content-secondary dis-none">
                <div className="widget-posts-thumbnail" style={{ height: 'auto !important' }}>
                    <h2 className="widget-title">Recent Posts</h2>
                    <ul>
                        {(recentPost || []).map((item, index) => {
                            if (index === 0) {
                                return (
                                    <li className="clear" key={item.id}>
                                        <Link href={'/news/' + item.slug}>
                                            <div className="thumbnail-wrap">
                                                {
                                                    item?.meta?.link_url_imgbb && (
                                                        <img width="300" height="150" src={item?.meta?.link_url_imgbb ? item?.meta?.link_url_imgbb : ''} className="wp-post-image" alt="post-sadsasd-title" />
                                                    )
                                                }
                                            </div>
                                            <div dangerouslySetInnerHTML={{ __html: item?.title?.rendered.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с') ?? null }}  className="entry-wrap" >   
                                            </div>
                                            <div className="gradient" style={{ display: 'block' }} />
                                        </Link>
                                    </li>
                                )
                            } 
                            return (
                                <li className="post-list post-list-1" key={item.id}>
                                    <span>{index}</span>
                                    <Link href={'/news/' + item.slug} dangerouslySetInnerHTML={{__html: item?.title?.rendered.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с') ?? null}}>
                                          
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default RecentPosts
