export interface LandingCardProps {
    logo: string;
    heading: string;
    subtext:string
  }


export interface SpaceTypeProps{
    imageUrl:string;
    text:string
}

export interface LandingImages{
    image:string;
}

export interface RectangularComponentProps {
    headerText: string;
    subText: string;
    images: string[];
  }

export interface TwoText{
  question:string;
  answer:string
}