
export type CardLink = {
  title: string;
  href: string;
};

export type CommonCardProps = {
  cardImg: string;
  links?: CardLink[];      
HeadingTag?: "link" | "h1" | "h2" | "h5" | "span" | "a";
  cardDesc?: string;
  cardStyle?: string;
  titleStyle?: string;
  titleSize?: string;
  isArrow?: boolean;
};
