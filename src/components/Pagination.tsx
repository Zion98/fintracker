import React from 'react'
//@ts-expect-error
const Pagination = ({requestsPerPage, totalRequests, paginate}) => {

    const pageNumbers =[];
    for(let i=1; i<=Math.ceil(totalRequests / requestsPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <div className="paginate">
            <ul className='pagination'>
                {pageNumbers.map(number=>(
                 <li key={number} className="page-item">
                   <a onClick={()=>paginate(number)} href ="#" className="page-link">{number}</a>     
                 </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination
