import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useMemo } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  const maxDisplayedPages = 5;
  const halfMaxDisplayedPages = Math.floor(maxDisplayedPages / 2);

  const pages = useMemo(() => {
    const startPage = Math.max(currentPage - halfMaxDisplayedPages, 1);
    const endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages);

    return [...Array(endPage - startPage + 1).keys()].map((page) => startPage + page);
  }, [currentPage, totalPages, maxDisplayedPages, halfMaxDisplayedPages]);

  return (
    <div className="flex items-center gap-3 order-1 md:order-2 md:mt-0 mb-5">
      <div
        className={`border-[1px] rounded-[5px] p-1 ${currentPage !== 1 ? 'cursor-pointer' : 'cursor-arrow'} border-[#D9D9D9]`}
        onClick={() => { currentPage !== 1 && onPageChange(currentPage - 1)}}
      >
        <ChevronLeft
          sx={{
            color: currentPage !== 1 ? "black" : "#D9D9D9"
          }}
        />
      </div>
      {pages.map((page) => (
        <div
          key={page}
          className={`border-[1px] rounded-[5px] cursor-pointer px-3 py-1 border-[#D9D9D9] ${
            page === currentPage ? 'font-bold bg-[#05CC7E] text-[white]' : ''
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </div>
      ))}
    <div
        className={`border-[1px] rounded-[5px] p-1 ${currentPage !== totalPages ? 'cursor-pointer' : 'cursor-arrow'} border-[#D9D9D9]`}
        onClick={() => currentPage !== totalPages && onPageChange(currentPage + 1)}
      >
        <ChevronRight
          sx={{
            color: currentPage !== totalPages ? "black" : "#D9D9D9"
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;


// const Pagination = ({ currentPage, totalPages, onPageChange }: any) => { 

//   const pages = [...Array(totalPages).keys()].map((page) => page + 1);

//   // Define how many page numbers to display on either side of the current page
//   const maxDisplayedPages = 5;
//   const halfMaxDisplayedPages = Math.floor(maxDisplayedPages / 2);

//   // Calculate the range of page numbers to display around the current page
//   const startPage = Math.max(currentPage - halfMaxDisplayedPages, 1);
//   const endPage = Math.min(currentPage + halfMaxDisplayedPages, totalPages);

//   return (
//     <div>
//        <div className="flex items-center gap-3 order-1 md:order-2 md:mt-0 mb-5">
//         <div className={`border-[1px] rounded-[5px] p-3 ${currentPage !== 1 ? 'cursor-pointer' : 'cursor-arrow'}
//           border-[#D9D9D9]`}
//           onClick={() => { currentPage !== 1 && onPageChange(currentPage - 1)}}
//         >
//           <ChevronLeft 
//             sx={{
//               color: currentPage !== 1 ? "black" : "#D9D9D9"
//             }}
//           />
//         </div>
//         {startPage > 1 && (
//           <span className="" key="start-ellipsis">...</span>
//         )}
//         {pages.length && pages.map((page) => {
//           if (page >= startPage && page <= endPage) {
//             return (
//               <div key={page} className={`border-[1px] rounded-[5px] cursor-pointer
//               px-5 py-2 border-[#D9D9D9] ${page === currentPage ? 'font-bold bg-[#faa21b] text-[white]' : ''}`}
//                 onClick={() => onPageChange(page)}
//               >
//                 {page}
//               </div>
//             );
//             }
//           return null;
//         })}
//         {endPage < totalPages && (
//           <span className="ellipsis" key="end-ellipsis">...</span>
//         )}
//         <div className={`border-[1px] rounded-[5px] p-3 
//           border-[#D9D9D9] ${currentPage !== totalPages ? 'cursor-pointer' : 'cursor-arrow'}`}
//           onClick={() => currentPage !== totalPages && onPageChange(currentPage + 1)}
//         >
//           <ChevronRight 
//             sx={{
//               color: currentPage !== totalPages ? "black" : "#D9D9D9"
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
