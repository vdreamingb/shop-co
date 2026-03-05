interface IFooterNestedList {
  id: number;
  text: string;
}

interface IFooterList {
  listTitle: string;
  content: IFooterNestedList[];
}

export const footerLists: IFooterList[] = [
  {
    listTitle: "Company",
    content: [
      { id: 1, text: "About" },
      { id: 2, text: "Features" },
      { id: 3, text: "Works" },
      { id: 4, text: "Career" },
    ],
  },
  {
    listTitle: "Help",
    content: [
      { id: 5, text: "Customer Support" },
      { id: 6, text: "Delivery Details" },
      { id: 7, text: "Terms & Conditions" },
      { id: 8, text: "Privacy Policy" },
    ],
  },
  {
    listTitle: "FAQ",
    content: [
      { id: 9, text: "Account" },
      { id: 10, text: "Manage Deliveries" },
      { id: 11, text: "Orders" },
      { id: 12, text: "Payments" },
    ],
  },
  {
    listTitle: "Resources",
    content: [
      { id: 13, text: "Free eBooks" },
      { id: 14, text: "Development Tutorial" },
      { id: 15, text: "How to - Blog" },
      { id: 16, text: "Youtube Playlist" },
    ],
  },
];
