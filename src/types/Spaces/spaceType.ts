export interface SpaceType{
    createdAt:string;
    _id?:string;
    spaceTypeName: string;
    description: string;
    peopleAllowed: boolean;
    availableSpace: boolean;
}

export interface SpaceTypes {
    imageSrc: string;
    heading: string;
    paragraph: string;
   
  }