import Head from "next/head"
import { useEffect, useState } from "react"

const MetaDescription = (props) => {
    const { title, description, imageUrl, imageAlt, url, type } = props

    const [og_url, setOgUrl] = useState("")

    let myReA = /a/g;
    let myReI = /i/g;
    let myReS = /s/g;
    let myReP = /p/g;
    let myReC = /c/g;

    useEffect(() => {
        setOgUrl(window.location.href)
    }, [])

    return (
        <Head>
            <title>{title.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с')}</title>
            <meta property="title" content={title.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с')}/>
            <meta property="og:title" content={title.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с')} />
            <meta property="og:type" content={type.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с')} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:url" content={decodeURIComponent(og_url ? og_url : url)} />
            <meta property="og:description" />
            <meta property="og:site_name" content="fav-sporting.vercel.app/" />
            <meta property="og:locale" content="en_US" />
            <meta property="description" />
            <meta name="keywords" content={title.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с')} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image:alt" content={imageAlt.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с')} />
        </Head>
    )
}

export default MetaDescription
