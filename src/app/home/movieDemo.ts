interface File{
    id:number;
    path:string;
}


export interface MovieDemo{
    id:number;
    director:string;
    genre:string;
    rating:number;
    releaseDate:number;
    description:string;
    file:File;
    duration:string
    title:string;

}