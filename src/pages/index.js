import { Fragment } from "react/cjs/react.development"
import MainLayout from '../components/MainLayout'
import HomePage from '../components/HomePage'
export const runtime = 'experimental-edge';
export default function Home(props) {
  return (
    <MainLayout {...props}>
      <HomePage {...props}/>
    </MainLayout>
  )
}
export async function getServerSideProps(context) {
  const {
    query: {
        page: pageParam
    }
  } = context
  // * call api
  const resPostsHomePromise = fetch(
    `${process.env.DB_HOST}wp-json/wp/v2/posts/?_fields=slug,id,meta.link_url_imgbb,title,date,categories,excerpt,author&page=${pageParam ? pageParam : 1}`,
    {
        method: 'GET',
    }
  )

  const resPostsPromise = fetch(
    `${process.env.DB_HOST}wp-json/wp/v2/posts/?_fields=slug,id,meta.link_url_imgbb,title,date,categories,excerpt,author`,
    {
        method: 'GET',
    }
  )
  const resUsersPromise = fetch(
    `${process.env.DB_HOST}wp-json/wp/v2/users/?_fields=id,slug,name,link`,
    {
        method: 'GET',
    }
  )
  const resCategoriesPromise = fetch(
    `${process.env.DB_HOST}wp-json/wp/v2/categories/?_fields=id,slug,name,link,parent`,
    {
        method: 'GET',
    }
  )

  const [
    resPostsHomeApi,
    resPostsApi,
    resUsersApi,
    resCategoriesApi,
  ] = await Promise.all([
    resPostsHomePromise,
    resPostsPromise,
    resUsersPromise,
    resCategoriesPromise,
  ])

  const [
    listPostsHomeApi,
    listPostApi,
    listUser,
    listCategories,
  ] = await Promise.all([
    resPostsHomeApi.json(),
    resPostsApi.json(),
    resUsersApi.json(),
    resCategoriesApi.json(),
  ])

  // * list post custom
  const listPost = [];

  // * list recentPost custom
  const recentPost = listPostApi;

  listPostsHomeApi.map((item) => {
    const authorItem = (listUser || []).find((itemAuthor) => itemAuthor.id === item.author)

    const category = (listCategories || []).find((itemCate) => item.categories.includes(itemCate.id))

    listPost.push({
      id: item?.id,
      slug: item?.slug,
      //title: item?.yoast_head_json?.og_title ?? null,
      title: item?.title?.rendered ?? null,
      image: item?.meta?.link_url_imgbb ?? null,
      date: item?.date,
      description: item?.excerpt?.rendered,
      author: {
        id: authorItem?.id,
        name: authorItem?.name ?? '',
        slug: authorItem?.slug,
      },
      categories: {
        id: category?.id ?? '',
        name: category?.name ?? '',
        slug: category?.slug ?? '',
      },
    })
    return item;
  })

  const metaData = {
    og_description: "Fav Sporting",
    og_type: "website",
    og_url: process.env.DB_HOST,
    og_locale: "en_US",
    og_title: "Fav Sporting",
    og_image: `${process.env.DB_HOST}wp-content/uploads/2022/12/skysports-lionel-messi-argentina_6000543.jpg`
  }

  // * return data via props
  return {
    props: {
      listPost,
      listCategories,
      recentPost,
      listUser,
      metaData
    }
  }
}
