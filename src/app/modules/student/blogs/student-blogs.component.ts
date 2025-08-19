import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth.service';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  imageUrl?: string;
  readCount: number;
  linkClicks: number;
  isBookmarked: boolean;
}

@Component({
  selector: 'app-student-blogs',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './student-blogs.component.html',
  styleUrls: ['./student-blogs.component.css']
})
export class StudentBlogsComponent implements OnInit {
  searchTerm = '';
  selectedTab = 0;

  blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of Artificial Intelligence in Education',
      content: 'Artificial Intelligence is revolutionizing the education sector...',
      summary: 'Exploring how AI is transforming learning experiences and educational outcomes.',
      author: 'Dr. Sarah Johnson',
      publishedAt: new Date('2024-01-15'),
      tags: ['AI', 'Education', 'Technology', 'Future'],
      imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      readCount: 1250,
      linkClicks: 89,
      isBookmarked: false
    },
    {
      id: '2',
      title: 'Effective Study Techniques for Computer Science Students',
      content: 'Mastering computer science requires specific study strategies...',
      summary: 'Proven methods to excel in programming, algorithms, and theoretical concepts.',
      author: 'Prof. Michael Chen',
      publishedAt: new Date('2024-01-12'),
      tags: ['Study Tips', 'Computer Science', 'Learning', 'Programming'],
      imageUrl: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
      readCount: 890,
      linkClicks: 67,
      isBookmarked: true
    },
    {
      id: '3',
      title: 'Building Your First Web Application: A Beginner\'s Guide',
      content: 'Creating web applications can seem daunting for beginners...',
      summary: 'Step-by-step guide to building your first web application using modern technologies.',
      author: 'Jane Smith',
      publishedAt: new Date('2024-01-10'),
      tags: ['Web Development', 'Beginner', 'Tutorial', 'JavaScript'],
      imageUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      readCount: 2100,
      linkClicks: 156,
      isBookmarked: false
    }
  ];

  myBlogs: BlogPost[] = [
    {
      id: '4',
      title: 'My Journey Learning React: Challenges and Victories',
      content: 'When I first started learning React, I was overwhelmed...',
      summary: 'Personal experience and lessons learned while mastering React development.',
      author: 'You',
      publishedAt: new Date('2024-01-08'),
      tags: ['React', 'Personal', 'Learning Journey', 'Frontend'],
      readCount: 45,
      linkClicks: 12,
      isBookmarked: false
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? `${user.firstName} ${user.lastName}` : 'Student';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getFilteredBlogs(): BlogPost[] {
    const blogs = this.selectedTab === 0 ? this.blogPosts : 
                  this.selectedTab === 1 ? this.blogPosts.filter(b => b.isBookmarked) : 
                  this.myBlogs;
    
    if (!this.searchTerm) return blogs;
    
    return blogs.filter(blog => 
      blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      blog.author.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  readBlog(blog: BlogPost): void {
    blog.readCount++;
    console.log('Reading blog:', blog.title);
    // In a real app, this would navigate to a detailed blog view
    alert(`Reading: ${blog.title}`);
  }

  toggleBookmark(blog: BlogPost): void {
    blog.isBookmarked = !blog.isBookmarked;
    console.log('Bookmark toggled for:', blog.title);
  }

  shareBlog(blog: BlogPost): void {
    console.log('Sharing blog:', blog.title);
    // In a real app, this would open share options
    alert(`Sharing: ${blog.title}`);
  }

  trackLinkClick(blog: BlogPost): void {
    blog.linkClicks++;
    console.log('Link clicked for:', blog.title);
  }

  createNewBlog(): void {
    console.log('Creating new blog...');
    alert('Blog creation feature coming soon!');
  }

  editBlog(blog: BlogPost): void {
    console.log('Editing blog:', blog.title);
    alert('Blog editing feature coming soon!');
  }

  deleteBlog(blog: BlogPost): void {
    if (confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      const index = this.myBlogs.findIndex(b => b.id === blog.id);
      if (index > -1) {
        this.myBlogs.splice(index, 1);
        console.log('Blog deleted:', blog.title);
      }
    }
  }
}