export type CardLink = {
    title: string;
    href: string;
    link?: string;
};

export type CommonCardProps = {
    cardImg: string;
    cardTitle?: string;
    HeadingTag?: "link" | "h1" | "h2" | "h5" | "span" | "a";
    titleLink?: string;
    links?: CardLink[];
    cardStyle?: string;
    titleStyle?: string;
    titleSize?: string;
    cardDesc?: string;
    isArrow?: boolean;
    children?: React.ReactNode;
};
