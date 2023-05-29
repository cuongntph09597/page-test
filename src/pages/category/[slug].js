import MainLayout from "../../components/MainLayout";
import Product from "../../components/Product";
export const runtime = 'experimental-edge';
export default function category(props) {
    return (
      <MainLayout {...props}>
        <Product {...props} />
      </MainLayout>
    )
}

export async function getServerSideProps(context) {
    const {
        query: {
            slug: categoryName
        }
    } = context

    // * call api
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
      `${process.env.DB_HOST}wp-json/wp/v2/categories/?_fields=id,slug,name,link,parent,yoast_head_json.og_type,yoast_head_json.og_title`,
      {
          method: 'GET',
      }
    )

    const [
      resPosts,
      resUsers,
      resCategories,
    ] = await Promise.all([
      resPostsPromise,
      resUsersPromise,
      resCategoriesPromise,
    ])

    const [
      listPost,
      listUser,
      listCategories,
    ] = await Promise.all([
      resPosts.json(),
      resUsers.json(),
      resCategories.json(),
    ])

    const categoryFill = (listCategories || []).find((item) => item.slug === categoryName)

    const resPostsWithCategory = await fetch(
      `${process.env.DB_HOST}wp-json/wp/v2/posts?categories=${categoryFill.id}&_fields=slug,id,meta.link_url_imgbb,title,date,categories,excerpt,author`,
      {
          method: 'GET',
      }
    )
    const listPostProductApi = await resPostsWithCategory.json()

    //list post custom
    const postsItemProduct = {
      id: categoryFill?.id ?? '',
      name: categoryFill?.name ?? '',
      slug: categoryFill?.slug ?? '',
      post: []
    };

    listPostProductApi.map((item) => {
      const authorItem = (listUser || []).find((itemAuthor) => itemAuthor.id === item.author)

      const category = (listCategories || []).find((itemCate) => item.categories.includes(itemCate.id))

      postsItemProduct.post.push({
        id: item.id,
        slug: item.slug,
        title: item?.title?.rendered,
        image: item?.meta?.link_url_imgbb ? item?.meta?.link_url_imgbb : '',
        date: item.date,
        description: item?.excerpt?.rendered,
        author: {
          id: authorItem?.id,
          name: authorItem?.name,
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

    //list recentPost custom
    const recentPost = listPost

    const metaData = {
      og_description: '',
      og_type: 'article',
      og_url: `${process.env.DB_HOST}category/${categoryFill.slug}`,
      og_locale: "en_US",
      og_title: categoryFill?.name,
      og_image: '',
    }

    const type = 'category';
    // * return data via props
    return {
      props: {
        postsItemProduct,
        recentPost,
        listCategories,
        metaData,
        type,
      }
    }
  }
  