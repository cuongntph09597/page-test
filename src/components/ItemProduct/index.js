/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Fragment, useEffect, useState } from "react"
import moment from "moment"
import Link from "next/link"

const ItemProduct = (props) => {
    const { type, image, title, url, description, author, createdDate, categories, idPost } = props

    const dayTime = moment(createdDate).format("DD-MM-YYYY");

    let myReA = /a/g;
    let myReI = /i/g;
    let myReS = /s/g;
    let myReP = /p/g;
    let myReC = /c/g;

    let title_rq = title;
    let description_rq = description;
    let categories_name = categories?.name;
    let author_name = author?.name;

    title_rq = title_rq.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с');
    description_rq = description_rq.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с').replace(/<р>/g, '<p>').replace(/<\/р>/g, '<p>');
    categories_name = categories_name.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с');
    author_name = author_name.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с');

    return (
        <Fragment>
            <div className="div-post-thumbnail">
                {!type && (
                    <Link className="thumbnail-link" href={'/news/' + url}>
                        <div className="thumbnail-wrap">
                            {
                                image && (
                                    <img width="300" height="300" src={image} className="post-thumbnail" alt={title_rq} />
                                )
                            }
                        </div>
                    </Link>
                )}
                <div className="post-category dis-none">
                    {categories?.name && (
                        <Link href={'/category/' + categories?.slug}>{categories_name}</Link>
                    )}
                </div>

                <h2 className="post-title">
                    <Link dangerouslySetInnerHTML={{ __html: title_rq }} href={'/news/' + url}>
                    </Link>
                </h2>
                <div className="post-meta dis-none">
                    <span className="post-author">
                        <Link href={'/author/' + author?.slug} title={`Posts by ${author_name}`}>{author_name}</Link>
                    </span>
                    <span className="post-date">{dayTime}</span>
                    {/* <span className="post-comment">
                        <Link to="/news/following-lionel-messis-nightmare-chelsea-issued-a-transfer-warning-to-josko-gvardiol-kansan" className="comments-link">
                            0 Comment
                        </Link>
                    </span> */}
                </div>
                <div className="post-summary">
                    {/* <p>{description}</p> */}
                    <div dangerouslySetInnerHTML={{ __html: description_rq }} />
                </div>
                <div className="post-meta dis-none-laptop dis-flex">
                    <span className="post-author">
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            size={'1x'}
                            style={{ marginRight: '6px', fontSize: '16px', lineHeight: '14px' }}
                        />
                        <Link href={'/author/' + author?.slug} title={`Posts by ${author_name}`}>By <b>{author_name}</b></Link>
                    </span>
                    <span className="post-date">{dayTime}</span>
                </div>
                <div className="post-category dis-none-laptop dis-block">
                    {categories?.name && (
                        <Link href={'/category/' + categories?.slug}>{categories_name}</Link>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default ItemProduct
