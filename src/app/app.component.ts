import { Response } from '@angular/http';
import { BlogService } from './services/blog.service';
import Blog from './models/blog.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private blogService: BlogService
  ) { }

  public newBlog: Blog = new Blog()

  blogsList: Blog[];
  editBlogs: Blog[] = [];

  ngOnInit(): void {
    this.blogService.getBlogs()
      .subscribe(blogs => {
        this.blogsList = blogs
        console.log(blogs)
      })
  }


  create() {
    this.blogService.createBlog(this.newBlog)
      .subscribe((res) => {
        this.blogsList.push(res.data)
        this.newBlog = new Blog()
      })
  }

  editBlog(blog: Blog) {
    console.log(blog)
    if(this.blogsList.includes(blog)){
      if(!this.editBlogs.includes(blog)){
        this.editBlogs.push(blog)
      }else{
        this.editBlogs.splice(this.editBlogs.indexOf(blog), 1)
        this.blogService.editBlog(blog).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editBlog(blog)
          console.error('Update Unsuccesful')
        })
      }
    }
  }

  doneBlog(blog:Blog){
    blog.status = 'Done'
    this.blogService.editBlog(blog).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.editBlog(blog)
      console.error('Update Unsuccesful')
    })
  }

  submitBlog(event, blog:Blog){
    if(event.keyCode ==13){
      this.editBlog(blog)
    }
  }

  deleteBlog(blog: Blog) {
    this.blogService.deleteBlog(blog._id).subscribe(res => {
      this.blogsList.splice(this.blogsList.indexOf(blog), 1);
    })
  }


  title = 'app';


}
