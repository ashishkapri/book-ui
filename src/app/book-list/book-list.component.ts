import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookData: any;
  authorData: any;
  updatedData: any;
  sortByData = [
    {
      name: 'Sort by Name',
      id: 'sortByName'
    },
    {
      name: 'Sort by publish date ',
      id: 'sortByDate'
    }
  ];

  showBookForm: Boolean = false;
  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getBookData();
  }

  getBookData(): void {
    this.bookService.getBookList().subscribe((data: any) => {
      if (data?.data) {
        this.bookData = data.data?.books;
        this.authorData = data.data;
      }
    },
      (error: any) => {
        console.log('error is', error);
      })
  }

  onChangeFilter(data: string): void {
    const sortingOptions = {
      sortByName: (a: any, b: any) => a.title.localeCompare(b.title),
      sortByDate: (a: any, b: any) => <any>new Date(a.PublishDate) - <any>new Date(b.PublishDate),
    };

    const sortingFunction = sortingOptions[data];
    if (sortingFunction) {
      this.bookData.sort(sortingFunction);
    }
  }

  onShowBookForm(): void {
    this.showBookForm = !this.showBookForm;
    this.updatedData = [];
  }

  addedBookData(data: any): void {
    const indexToUpdate = this.bookData.findIndex((ele: any) => ele?.PublishDate === data.PublishDate);
    if (indexToUpdate == -1) {
      this.bookData.push(data);
      this.showMessage(`${data.title} is added successfully.`);
    } else {
      this.bookData[indexToUpdate] = data;
      this.showMessage(`${data.title} is updated successfully.`);
    }
  }

  onUpdate(data: any): void {
    if (!this.showBookForm) {
      this.showBookForm = true;
    }
    const updatedData = {
      modify: true,
      updatedData: data
    }
    this.updatedData = updatedData;
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  onDelete(data: any): void {
    const removeIndex = this.bookData.findIndex((ele: any) => ele.PublishDate === data.PublishDate);
    if (removeIndex !== -1) {
      this.bookData.splice(removeIndex, 1);
      this.showMessage(`${data.title} is deleted successfully.`);
    }
  }

  showMessage(data: string): void {
    alert(data);
  }
}
