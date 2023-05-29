import MainLayout from "../../components/MainLayout";
import Search from "../../components/Search";
export const runtime = 'experimental-edge';
export default function search(props) {
    return (
      <MainLayout {...props}>
        <Search {...props} />
      </MainLayout>
    )
}

export async function getServerSideProps(context) {
    const {
        query: {
            value: valueSearch
        }
    } = context

    // * call api
    const postResponse = await fetch(
      `${process.env.DB_HOST}wp-json/wp/v2/posts/?_fields=slug,id,meta.link_url_imgbb,title,date,categories,excerpt,author`,
      {
          method: 'GET',
      }
    )
    const listPost = await postResponse.json()


    const postSearchResponse = await fetch(
      `${process.env.DB_HOST}wp-json/wp/v2/posts?search=${valueSearch}&_fields=slug,id,meta.link_url_imgbb,title,date,categories,excerpt,author`,
      {
          method: 'GET',
      }
    )
    const postListSearchApi = await postSearchResponse.json()

    const res = await fetch(
      `${process.env.DB_HOST}wp-json/wp/v2/users/?_fields=id,slug,name,link`,
      {
          method: 'GET',
      }
    )
    const listUser = await res.json()

    const categoriesResponse = await fetch(
      `${process.env.DB_HOST}wp-json/wp/v2/categories/?_fields=id,slug,name,link,parent`,
      {
          method: 'GET',
      }
    )
    const listCategories = await categoriesResponse.json()

    //list recentPost custom
    const recentPost = listPost;

    //list post custom
    const postListSearch = [];

    postListSearchApi.map((item) => {
      const authorItemUser = (listUser || []).find((itemAuthor) => itemAuthor.id === item.author)

      const category = (listCategories || []).find((itemCate) => item.categories.includes(itemCate.id))

      postListSearch.push({
        id: item.id,
        slug: item.slug,
        title: item?.title?.rendered,
        image: item?.meta.link_url_imgbb ? item?.meta.link_url_imgbb : '',
        date: item.date,
        description: item?.excerpt?.rendered,
        author: {
          id: authorItemUser?.id,
          name: authorItemUser?.name,
          slug: authorItemUser?.slug,
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
        postListSearch,
        recentPost,
        listCategories,
        metaData
      }
    }
  }
  