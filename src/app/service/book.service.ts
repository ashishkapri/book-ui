import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BookService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getBookList(): any {
        return this.httpClient.get('https://s3.amazonaws.com/api-fun/books.json');
    }
}
