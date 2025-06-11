import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gifs.interface';
import { GifMapper } from '../mapper/gif.mapper';


// peticion http
@Injectable({providedIn: 'root'})
export class GifService {

    private http = inject(HttpClient)

    // espacio para almacenar el estado del trending
    trendingGifs = signal<Gif[]>([])
    
    constructor(){
        this.loadTrendingGifs();
    }

    loadTrendingGifs(){
        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{
            params: {
                api_key: environment.giphyApiKey,
                limit: 20
            }
        }).subscribe((resp)=>{
            // resp.data[0].images.original.url
            // console.log(resp)


            // Si usas el mapper, puedes usar la misma función en todos lados.
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            this.trendingGifs.set(gifs)
            console.log(gifs)


        })
    }
    
}