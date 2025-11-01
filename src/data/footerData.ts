
export type LinkItem = {
  label: string
  to: string
}

export type LinkGroup = {
  title: string
  to: string
  items: LinkItem[]
}
export const defaultLinks: LinkGroup[] = [
  {
    title: "Home",
    to: "/",
    items: [
      { label: "Hero Section", to: "/#hero" },
      { label: "Features", to: "/#features" },
      { label: "Properties", to: "/#properties" },
      { label: "Testimonials", to: "/#testimonials" },
      { label: "FAQ's", to: "/#faqs" },
    ],
  },
  {
    title: "About Us",
    to: "/about",
    items: [
      { label: "Our Story", to: "/about#story" },
      { label: "Our Works", to: "/about#works" },
      { label: "How It Works", to: "/about#steps" },
      { label: "Our Team", to: "/about#team" },
      { label: "Our Clients", to: "/about#clients" },
    ],
  },
  {
    title: "Properties",
    to: "/properties",
    items: [
      { label: "Portfolio", to: "/properties#properties" },
      { label: "Categories", to: "/properties#find" },
    ],
  },
  {
    title: "Services",
    to: "/services",
    items: [
      { label: "Valuation Mastery", to: "/services#property" },
      { label: "Strategic Marketing", to: "/services#property" },
      { label: "Negotiation Wizardry", to: "/services#property" },
      { label: "Closing Success", to: "/services#property" },
      { label: "Property Management", to: "/services#management" },
    ],
  },
  {
    title: "Contact Us",
    to: "/contact",
    items: [
      { label: "Contact Form", to: "/contact#form" },
      { label: "Our Offices", to: "/contact#office" },
    ],
  },
]