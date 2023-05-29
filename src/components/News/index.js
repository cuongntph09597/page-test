/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Breadcrumbs from "../Breadcrumbs";
import Link from "next/link";
import moment from "moment";
import { useEffect } from "react";

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const News = (props) => {


    let myReA = /a/g;
    let myReI = /i/g;
    let myReS = /s/g;
    let myReP = /p/g;
    let myReC = /c/g;

    const {postItem, metaData, type} = props

    const urlCate = type === 'category' ? "/category/" + postItem.categories.slug : "/category/" + postItem.categories.slug 

    const params = {
        name: postItem.categories?.name,
        url: urlCate
    }

    const paramsChild = {
        name: postItem?.title,
        url: ''
    }

    let title_api = postItem?.title.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с');
    let author_api = postItem?.author.name.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с');
    let category_api = postItem?.categories.name.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с');
    let content_api = postItem?.content.replace("/a(?!([^<]+)?>)/i","а");

    const str_rt = ['а', 'і', 'ѕ', 'р', 'с'];
    const str_se = ['a', 'i', 's', 'p', 'c'];

    for(let i = 0; i < str_se.length ; i++){
        var regEx = new RegExp("(" + str_se[i] + ")(?!([^<]+)?>)", "gi");
        content_api = content_api.replace(regEx, str_rt[i]);
    }
   
    const dayTime = moment(postItem?.date).format("DD-MM-YYYY")

    return (
        <>
            <div className="content-primary">
                <main className="site-main">
                {/* <!-- .breadcrumbs --> */}
                    <Breadcrumbs paramsChild={paramsChild} params={params} />
                    <header className="post-header">	
                        <h1 className="post-title" dangerouslySetInnerHTML={{ __html: title_api }}>
                            {/* {postItem?.title} */}
                        </h1>
                        <div className="post-meta dis-none-laptop dis-flex">
                            <span className="post-author">
                                <FontAwesomeIcon
                                    icon={faUserCircle}
                                    size={'1x'}
                                    style={{ marginRight: '6px', fontSize: '16px', lineHeight: '14px' }} 
                                />
                                <Link href={'/author/' + postItem.author.slug} title={`Posts by ${author_api}`}>By <b>{author_api}</b></Link>
                            </span> 
                            <span className="post-date">{dayTime}</span>
                        </div>
                        <div className="post-meta dis-none">
                            <span className="post-category">
                                <Link href={"/category/" + postItem.categories.slug}>{category_api}</Link> 
                            </span>		
                            <span className="post-author">
                                <Link href={'/author/' + postItem.author.slug}>
                                    {author_api}
                                </Link>
                            </span> 
                            <span className="post-date">{dayTime}</span>
                            {/* <span className="post-comment">
                                <Link href="news/pep-guardiola-angry-after-5-million-compensation-for-man-city-kansan" className="comments-link">
                                    0 Comment
                                </Link>
                            </span> */}
                        </div>
                    </header>
                    {/* <!-- .content --> */}
                    <div className="post-content">
                        <div dangerouslySetInnerHTML={{__html: content_api }} />
                    </div>
                </main>
            </div>
        </>
    );
};

export default News;
