import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gifs.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';


// peticion http
@Injectable({providedIn: 'root'})
export class GifService {

    private http = inject(HttpClient)

    // espacio para almacenar el estado del trending
    trendingGifs = signal<Gif[]>([])
    trendingGifsLoading = signal(true)
    
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
            this.trendingGifsLoading.set(false)
            console.log(gifs)
        })
    }

    searchGifs(query: string){
        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
                q: query
            }
            // RxJS (una librería
        }).pipe(
            map(({data}) => data),
            map((items)=> GifMapper.mapGiphyItemsToGifArray(items))
        )
        // .subscribe((resp)=>{
        //     const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        //     console.log({search: gifs})
        // })
    }
    
}

// .pipe() encadena operadores para
//  transformar o manejar los datos que pasan por un Observable.

// tap es un operador de efecto secundario. No transforma los datos,
//  solo ejecuta una acción cuando los datos pasan por ahí,