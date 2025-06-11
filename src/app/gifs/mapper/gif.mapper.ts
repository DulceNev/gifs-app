import { Gif } from "../interfaces/gifs.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";

// Tienes objetos que vienen de la API de Giphy (GiphyItem), 
// que son grandes, con muchos datos.
// Y tú solo necesitas unos datos simples: id, title, y url.
// Así que creas una clase GifMapper para transformar eso:

export class GifMapper {
    static mapGiphyItemToGif(item: GiphyItem): Gif {
        return {
            id:item.id,
            title: item.title,
            url: item.images.original.url
        }
    }
    static mapGiphyItemsToGifArray( items: GiphyItem[]):Gif[]{
        return items.map(this.mapGiphyItemToGif)
    }
}