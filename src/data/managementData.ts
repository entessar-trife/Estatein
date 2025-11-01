import type { unlockCardComponentProps } from "../components/cards/UnlockCardComponent";
import type { TitleProps } from "../components/shared/Title";
import type { CommonCardProps } from "../types/CommonCard";

export const managementData: CommonCardProps[] = [
    {
        cardImg: "/assets/icons/EffortlessProperty/Tenant.svg",
        cardTitle: "Tenant Harmony",
        cardDesc: "Our Tenant Management services ensure that your tenants have a smooth and reducing vacancies."
    },
    {
        cardImg: "/assets/icons/EffortlessProperty/maintenance.svg",
        cardTitle: "Maintenance Ease",
        cardDesc: "Say goodbye to property maintenance headaches. We handle all aspects of property upkeep."
    },
    {
        cardImg: "/assets/icons/EffortlessProperty/financial.svg",
        cardTitle: "Financial Peace of Mind",
        cardDesc: "Managing property finances can be complex. Our financial experts take care of rent collection"
    },
    {
        cardImg: "/assets/icons/EffortlessProperty/legal.svg",
        cardTitle: "Legal Guardian",
        cardDesc: "Stay compliant with property laws and regulations effortlessly."
    },
]

export const managementTitleData: TitleProps = {
    titleStyle: "pb-10 lg-custom:pb-[60px] 2xl:pb-20",
    heading: "Effortless Property Management",
    paragraph: "Owning a property should be a pleasure, not a hassle. Estatein's Property Management Service takes the stress out of property ownership, offering comprehensive solutions tailored to your needs. Explore the categories below to see how we can make property management effortless for you",
    paragraphStyle: "w-[81.203%]",
}

export const unlockCardManagementData: unlockCardComponentProps =
{
    title: "Experience Effortless Property Management",
    desc: "Ready to experience hassle-free property management? Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership.",
}