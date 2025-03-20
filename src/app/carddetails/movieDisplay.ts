interface File{
    id:number;
    path:string;
}
export interface MovieDisplay{
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
   movie_trailer:string
   duration:string
}



