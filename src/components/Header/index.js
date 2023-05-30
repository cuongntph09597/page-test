import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Fragment, useEffect, useState } from 'react'
import MetaDescription from '../MetaDescription'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = (props) => {

    const {listCategories, metaData} = props;

    const [searchValue, setSearchValue] = useState('')

    const handleChangeSearch = (e) => {
        setSearchValue(e.target.value)
    }

    const router = useRouter();

    const listCategory = listCategories.filter((item, index) => {
        return item.parent > 0 && index < 5;
    })

    return (
        <Fragment>
            <header className="site-header ">
                {/* <div className="container dis-block padd-0">
                    <div className="logo">
                        <h1>
                            <Link href="/">Fav Sporting</Link>
                        </h1>
                    </div>
                    <div className="menu">
                        <ul className="primary-menu">
                            {(listCategory || []).map((item) => {
                                return (
                                    <li key={item?.id} className={item.slug === router.query?.slug ? 'menu-item active-menu' : 'menu-item' }>
                                        <Link href={'/category/' + item?.slug}>
                                            <span className="menu-text">{item?.name}</span>
                                        </Link>    
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="header-search">
                        <div className="div-search">
                            <input type="text" value={searchValue} name="search" onChange={handleChangeSearch} className="search-input" placeholder="Search" />
                            <Link href={`/search/${searchValue}`} className="search-submit">
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    size={'1x'}
                                    style={{ cursor: 'pointer', color: '#fff', fontSize: '14px', marginTop: '12px' }} 
                                />
                            </Link>
                        </div>
                    </div>
                </div> */}
            </header>
        </Fragment>
    )
}

export default Header
