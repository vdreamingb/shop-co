import Image from "next/image";

interface Props {
  authorName: string;
  comment: string;
  createdAt?: string;
}



export default function CustomersReview({ authorName, comment, createdAt}: Props) {
  const ratingList = Array.from({ length: 5 });
  return <div className="px-8 py-7 border border-[rgb(0,0,0,0.1)] rounded-[20px] max-w-100 w-full  h-full min-h-60">
    <ul className="flex gap-[6.49px] items-center mb-3.75">
      {ratingList.map((_, index) => (
        <li key={index}>
          <Image
            src="/img/full-star.png"
            alt="Star"
            width={22.58}
            height={22.58}
          />
        </li>
      ))}
    </ul>
    <div className="flex gap-1">
      <h5 className="text-xl font-bold">{authorName}</h5>
      <img src="/img/checked.svg" alt="Verified" />
    </div>
    <p className="text-black opacity-60">{comment}</p>
    <p className="mt-4">Posted on: {createdAt?.split("T")[0]}</p>
  </div>;
}
