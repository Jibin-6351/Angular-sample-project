interface File{
    id:number;
    name:string;
    path:string;
}
export interface Movie{
    id: number;
    title: string;
    director: string;
    releaseDate: string;
    rating: string;
    description: string;
    genre: string;
    views:number;
    likemovie:number;
    dislikemovie:number;
   file:File
}



