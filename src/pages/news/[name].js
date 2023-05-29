import MainLayout from "../../components/MainLayout";
import News from "../../components/News";
export const runtime = 'experimental-edge';
export default function news(props) {
  return (
    <MainLayout {...props}>
      <News {...props} />
    </MainLayout>
  )
}

export async function getServerSideProps(context) {

  const {
    query: {
      name: slugPost
    }
  } = context

  // * call api
  const postsResponse = await fetch(
    `${process.env.DB_HOST}wp-json/wp/v2/posts/?per_page=10`,
    {
      method: 'GET',
    }
  )
  const listPost = await postsResponse.json()

  let encodedURI = decodeURIComponent(slugPost);

  const postResponse = await fetch(
    `${process.env.DB_HOST}wp-json/wp/v2/posts?slug=${encodedURI}&_fields=slug,id,meta.link_url_imgbb,title,date,categories,excerpt,author,content,link`,
    {
      method: 'GET',
    }
  )

  const postItemApi = await postResponse.json()

  const authorRes = await fetch(
    `${process.env.DB_HOST}wp-json/wp/v2/users/?_fields=id,slug,name,link`,
    {
      method: 'GET',
    }
  )
  const listUser = await authorRes.json()

  const authorItem = (listUser || []).find((item) => item.id === postItemApi[0].author)

  const cateResponse = await fetch(
    `${process.env.DB_HOST}wp-json/wp/v2/categories/?_fields=id,slug,name,link,parent`,
    {
      method: 'GET',
    }
  )
  const listCategories = await cateResponse.json()

  const categoryItem = (listCategories || []).find((item) => postItemApi[0].categories?.includes(item.id))

  //list recentPost custom
  const recentPost = listPost;

  //list post custom
  const postItem = {
    id: postItemApi[0]?.id ?? null,
    slug: postItemApi[0]?.slug ?? null,
    title: postItemApi[0]?.title?.rendered ?? null,
    image: postItemApi[0]?.meta?.link_url_imgbb ? postItemApi[0]?.meta?.link_url_imgbb : '',
    date: postItemApi[0]?.date ?? null,
    description: postItemApi[0]?.excerpt?.rendered ?? null,
    content: postItemApi[0]?.content?.rendered ?? null,
    author: {
      id: authorItem?.id ?? null,
      name: authorItem?.name ?? null,
      slug: authorItem?.slug ?? null,
    },
    categories: {
      id: categoryItem?.id ?? '',
      name: categoryItem?.name ?? '',
      slug: categoryItem?.slug ?? '',
    },
  };

  const metaData = {
    og_description: postItemApi[0]?.excerpt?.rendered ?? null,
    og_type: 'article',
    og_url: postItemApi[0]?.link ?? null,
    og_locale: "en_US",
    og_title: postItemApi[0]?.title?.rendered ?? null,
    og_image: postItemApi[0]?.meta?.link_url_imgbb ? postItemApi[0]?.meta?.link_url_imgbb : null,
  }

  // * return data via props
  return {
    props: {
      postItem,
      listCategories,
      recentPost,
      metaData
    }
  }
}
