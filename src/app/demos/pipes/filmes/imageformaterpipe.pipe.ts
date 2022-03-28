import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'imageFormater'})
export class ImageFormaterPipe implements PipeTransform {
    transform(imagem: string, caminho:string, substituir: boolean): any {
        if(caminho === 'default')
            caminho = 'assets'
        if(imagem.length === 0 && substituir){
            imagem = 'semCapa.jpg'
        }

        return "/" + caminho + "/" + imagem;

    }
}