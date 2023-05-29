/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

// ==============================|| MAIN LAYOUT ||============================== //

const Breadcrumbs = ({params, paramsChild}) => {

    let myReA = /a/g;
    let myReI = /i/g;
    let myReS = /s/g;
    let myReP = /p/g;
    let myReC = /c/g;
    
    return (
        <>
            <div className="breadcrumbs clear dis-none">
                <span className="breadcrumbs-nav">
                    <Link href="/">Home</Link>
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        size={'1x'}
                        style={{ marginRight: '6px' }} 
                    />
                    {
                        params && (
                            <>
                                <span>
                                    <Link  dangerouslySetInnerHTML={{ __html: params?.name.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с') }}  href={params?.url}>
                                    </Link> 
                                </span>
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    size={'1x'}
                                    style={{ marginRight: '6px' }} 
                                />
                            </>
                        )
                    }
                    <span dangerouslySetInnerHTML={{ __html: paramsChild?.name.replace(myReA, 'а').replace(myReI, 'і').replace(myReS, 'ѕ').replace(myReP, 'р').replace(myReC, 'с')}} className="post-category"></span>
                </span>	
                {
                    !params && (
                        <h1>
                            {paramsChild?.name}				
                        </h1>
                    )
                }			
            </div>
        </>
    );
};
export default Breadcrumbs;
