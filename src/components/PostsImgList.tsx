import Image from "next/image";
import React from "react";

export default function PostsImgList() {
  const Images = [
    "https://teal-changing-fox-855.mypinata.cloud/files/bafkreibf7atf6s6eyobzib5er6l4glj2bxdcmcqnigzcwlabnr7fpomdyu",
    "https://teal-changing-fox-855.mypinata.cloud/files/bafkreibf7atf6s6eyobzib5er6l4glj2bxdcmcqnigzcwlabnr7fpomdyu",
    "https://teal-changing-fox-855.mypinata.cloud/files/bafkreibf7atf6s6eyobzib5er6l4glj2bxdcmcqnigzcwlabnr7fpomdyu",
    "https://teal-changing-fox-855.mypinata.cloud/files/bafkreibf7atf6s6eyobzib5er6l4glj2bxdcmcqnigzcwlabnr7fpomdyu",
    "https://teal-changing-fox-855.mypinata.cloud/files/bafkreibf7atf6s6eyobzib5er6l4glj2bxdcmcqnigzcwlabnr7fpomdyu",
  ];
  return (
    <div className="flex items-center gap-2 flex-wrap mt-2">
      {[...Images,...Images].map((img,index) => (
        <div key={index} className="aspect-square overflow-hidden bg-gray-100 cursor-pointer hover:scale-95 hover:opacity-80 transition-all ease-in-out">
          <Image className="size-60 object-cover" src={img} alt="post" width={300} height={300} />
        </div>
      ))}
    </div>
  );
}
