import MainLayout from "../../components/MainLayout";
import Product from "../../components/Product";
export const runtime = 'experimental-edge';
export default function author(props) {
    return (
      <MainLayout {...props}>
        <Product {...props} />
      </MainLayout>
    )
}
export async function getServerSideProps(context) {
    const {
        query: {
            slug: authorName
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

    const categoriesResponse = await fetch(
      `${process.env.DB_HOST}wp-json/wp/v2/categories/?_fields=id,slug,name,link,parent`,
      {
          method: 'GET',
      }
    )
    const listCategories = await categoriesResponse.json()

    const res = await fetch(
      `${process.env.DB_HOST}wp-json/wp/v2/users/?_fields=id,slug,name,link,yoast_head_json.og_type,yoast_head_json.og_title`,
      {
          method: 'GET',
      }
    )
    const listUser = await res.json()

    const authorItem = (listUser || []).find((item) => item.slug === authorName)

    const postsResponse = await fetch(
      `${process.env.DB_HOST}wp-json/wp/v2/posts?author=${authorItem.id}&_fields=slug,id,meta.link_url_imgbb,title,date,categories,excerpt,author`,
      {
          method: 'GET',
      }
    )
    const listPostProductApi = await postsResponse.json()

    //list recentPost custom
    const recentPost = listPost;

    //list post custom
    const postsItemProduct = {
      id: authorItem?.id ?? '',
      name: authorItem?.name ?? '',
      slug: authorItem?.slug ?? '',
      post: []
    };

    listPostProductApi.map((item) => {
      const authorItemUser = (listUser || []).find((itemAuthor) => itemAuthor.id === item.author)

      const category = (listCategories || []).find((itemCate) => item.categories.includes(itemCate.id))

      postsItemProduct.post.push({
        id: item.id,
        slug: item.slug,
        title: item?.title?.rendered,
        image: item?.meta?.link_url_imgbb ? item?.meta?.link_url_imgbb : null,
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
      og_description: '',
      og_type: 'profile',
      og_url: `${process.env.DB_HOST}author/${authorItem.slug}`,
      og_locale: "en_US",
      og_title: authorItem?.name,
      og_image: '',
    }

    const type = 'author';
    // * return data via props
    return {
      props: {
        postsItemProduct,
        listCategories,
        recentPost,
        metaData,
        type
      }
    }
  }
  