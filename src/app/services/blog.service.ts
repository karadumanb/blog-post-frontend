import Blog from '../models/blog.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {

  api_url = 'http://localhost:3000';
  blogUrl = `${this.api_url}/api/blogs`;

  constructor(
    private http: HttpClient
  ) { }


  createBlog(blog: Blog): Observable<any>{
    console.log(blog);
    return this.http.post(`${this.blogUrl}`, blog);
  }

  getBlogs(): Observable<Blog[]>{
    return this.http.get(this.blogUrl)
    .map(res  => {
      return res["data"].docs as Blog[];
    })
  }

  editBlog(blog:Blog){
    let editUrl = `${this.blogUrl}`
    return this.http.put(editUrl, blog);
  }

  deleteBlog(id:string):any{
    let deleteUrl = `${this.blogUrl}/${id}`
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
