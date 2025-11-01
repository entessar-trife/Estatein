import type { unlockCardComponentProps } from "../components/cards/UnlockCardComponent";
import type { TitleProps } from "../components/shared/Title";
import type { CommonCardProps } from "../types/CommonCard";


export const propertyValueData: CommonCardProps[] = [
    {
        cardImg: "/assets/icons/PropertyValue/closing.svg",
        cardTitle: "Valuation Mastery",
        cardDesc: "Discover the true worth of your property with our expert valuation services.",
    },
    {
        cardImg: "/assets/icons/PropertyValue/strategic.svg",
        cardTitle: "Strategic Marketing",
        cardDesc: "Selling a property requires more than just a listing; it demands a strategic marketing approach.",
    },
    {
        cardImg: "/assets/icons/PropertyValue/negotiation.svg",
        cardTitle: "Negotiation Wizardry",
        cardDesc: "Negotiating the best deal is an art, and our negotiation experts are masters of it.",
    },
    {
        cardImg: "/assets/icons/PropertyValue/closing.svg",
        cardTitle: "Closing Success",
        cardDesc: "A successful sale is not complete until the closing. We guide you through the intricate closing process.",
    },
]


export const propertyValueTitleData: TitleProps = {
    titleStyle: "pb-10 lg-custom:pb-[60px] 2xl:pb-20",
    heading: "Unlock Property Value",
    paragraph: "Selling your property should be a rewarding experience, and at Estatein, we make sure it is. Our Property Selling Service is designed to maximize the value of your property, ensuring you get the best deal possible. Explore the categories below to see how we can help you at every step of your selling journey",
    paragraphStyle: "w-full md:w-[81.203%]",
    anamation: "fade-up",
}

export const UnlockCardPropertyData: unlockCardComponentProps =
{
    title: "Unlock the Value of Your Property Today",
    desc: "Ready to unlock the true value of your property? Explore our Property Selling Service categories and let us help you achieve the best deal possible for your valuable asset.",
}