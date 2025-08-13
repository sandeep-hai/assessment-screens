import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  College, Subject, Chapter, Exam, ExamType, Question, QuestionType, 
  Event, EventType, Poll, Blog, Subscription, SubscriptionPlan, 
  ExamResult, AIModel 
} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  
  private collegesSubject = new BehaviorSubject<College[]>([
    {
      id: 'college1',
      name: 'Humera University',
      code: 'HU001',
      address: '123 Education Street',
      city: 'Tech City',
      state: 'Education State',
      country: 'India',
      isActive: true,
      adminId: '3',
      createdAt: new Date('2023-01-01')
    }
  ]);

  private subjectsSubject = new BehaviorSubject<Subject[]>([
    {
      id: 'subject1',
      name: 'Computer Science',
      code: 'CS101',
      description: 'Introduction to Computer Science',
      collegeId: 'college1',
      isActive: true,
      createdAt: new Date('2023-02-01')
    },
    {
      id: 'subject2',
      name: 'Mathematics',
      code: 'MATH101',
      description: 'Basic Mathematics',
      collegeId: 'college1',
      isActive: true,
      createdAt: new Date('2023-02-01')
    }
  ]);

  private chaptersSubject = new BehaviorSubject<Chapter[]>([
    {
      id: 'chapter1',
      name: 'Introduction to Programming',
      subjectId: 'subject1',
      order: 1,
      description: 'Basic programming concepts',
      isActive: true
    },
    {
      id: 'chapter2',
      name: 'Data Structures',
      subjectId: 'subject1',
      order: 2,
      description: 'Arrays, Lists, Trees',
      isActive: true
    }
  ]);

  private examsSubject = new BehaviorSubject<Exam[]>([
    {
      id: 'exam1',
      title: 'CS101 - Module 1 Test',
      description: 'Basic programming concepts test',
      subjectId: 'subject1',
      chapterId: 'chapter1',
      type: ExamType.TEST,
      totalMarks: 100,
      duration: 60,
      questions: [
        {
          id: 'q1',
          text: 'What is a variable in programming?',
          type: QuestionType.MULTIPLE_CHOICE,
          options: ['A storage location', 'A function', 'A loop', 'An operator'],
          correctAnswer: 'A storage location',
          marks: 10,
          explanation: 'A variable is a storage location with an associated name.'
        }
      ],
      isActive: true,
      createdBy: '2',
      createdAt: new Date('2023-03-01')
    }
  ]);

  private eventsSubject = new BehaviorSubject<Event[]>([
    {
      id: 'event1',
      title: 'AI in Education Webinar',
      description: 'Learn about the latest trends in AI for education',
      type: EventType.WEBINAR,
      startDate: new Date('2024-02-15T10:00:00'),
      endDate: new Date('2024-02-15T12:00:00'),
      isVirtual: true,
      virtualLink: 'https://zoom.us/j/123456789',
      createdBy: '2',
      attendees: ['1'],
      maxAttendees: 100,
      isActive: true
    }
  ]);

  private pollsSubject = new BehaviorSubject<Poll[]>([
    {
      id: 'poll1',
      question: 'Which programming language would you like to learn next?',
      options: ['Python', 'Java', 'JavaScript', 'C++'],
      votes: { 'Python': 45, 'Java': 32, 'JavaScript': 28, 'C++': 15 },
      totalVotes: 120,
      isActive: true,
      createdBy: '2',
      createdAt: new Date('2024-01-15'),
      expiresAt: new Date('2024-03-15')
    }
  ]);

  private blogsSubject = new BehaviorSubject<Blog[]>([
    {
      id: 'blog1',
      title: 'The Future of Online Assessment',
      content: 'Detailed content about online assessment trends...',
      summary: 'Exploring the latest trends in online assessment technology.',
      authorId: '2',
      tags: ['education', 'technology', 'assessment'],
      isPublished: true,
      publishedAt: new Date('2024-01-10'),
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    }
  ]);

  // Getters for observables
  get colleges$(): Observable<College[]> { return this.collegesSubject.asObservable(); }
  get subjects$(): Observable<Subject[]> { return this.subjectsSubject.asObservable(); }
  get chapters$(): Observable<Chapter[]> { return this.chaptersSubject.asObservable(); }
  get exams$(): Observable<Exam[]> { return this.examsSubject.asObservable(); }
  get events$(): Observable<Event[]> { return this.eventsSubject.asObservable(); }
  get polls$(): Observable<Poll[]> { return this.pollsSubject.asObservable(); }
  get blogs$(): Observable<Blog[]> { return this.blogsSubject.asObservable(); }

  // College operations
  createCollege(college: Omit<College, 'id' | 'createdAt'>): Observable<College> {
    const newCollege: College = {
      ...college,
      id: 'college' + Date.now(),
      createdAt: new Date()
    };
    const currentColleges = this.collegesSubject.value;
    this.collegesSubject.next([...currentColleges, newCollege]);
    return of(newCollege).pipe(delay(500));
  }

  // Subject operations
  createSubject(subject: Omit<Subject, 'id' | 'createdAt'>): Observable<Subject> {
    const newSubject: Subject = {
      ...subject,
      id: 'subject' + Date.now(),
      createdAt: new Date()
    };
    const currentSubjects = this.subjectsSubject.value;
    this.subjectsSubject.next([...currentSubjects, newSubject]);
    return of(newSubject).pipe(delay(500));
  }

  // Exam operations
  createExam(exam: Omit<Exam, 'id' | 'createdAt'>): Observable<Exam> {
    const newExam: Exam = {
      ...exam,
      id: 'exam' + Date.now(),
      createdAt: new Date()
    };
    const currentExams = this.examsSubject.value;
    this.examsSubject.next([...currentExams, newExam]);
    return of(newExam).pipe(delay(500));
  }

  // Event operations
  createEvent(event: Omit<Event, 'id'>): Observable<Event> {
    const newEvent: Event = {
      ...event,
      id: 'event' + Date.now()
    };
    const currentEvents = this.eventsSubject.value;
    this.eventsSubject.next([...currentEvents, newEvent]);
    return of(newEvent).pipe(delay(500));
  }

  updateEvent(id: string, updates: Partial<Event>): Observable<Event> {
    const events = this.eventsSubject.value;
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events[index] = { ...events[index], ...updates };
      this.eventsSubject.next([...events]);
      return of(events[index]).pipe(delay(500));
    }
    throw new Error('Event not found');
  }

  deleteEvent(id: string): Observable<boolean> {
    const events = this.eventsSubject.value;
    const filteredEvents = events.filter(e => e.id !== id);
    this.eventsSubject.next(filteredEvents);
    return of(true).pipe(delay(500));
  }

  // Dashboard statistics
  getDashboardStats(): Observable<any> {
    return of({
      totalStudents: 150,
      totalLecturers: 25,
      totalExams: 45,
      activeEvents: 8,
      completedExams: 120,
      averageScore: 78.5,
      recentActivity: [
        { type: 'exam', title: 'Math Quiz completed', time: '2 hours ago' },
        { type: 'event', title: 'New webinar scheduled', time: '5 hours ago' },
        { type: 'student', title: 'New student registered', time: '1 day ago' }
      ]
    }).pipe(delay(800));
  }

  // AI Model operations
  getAIModels(): Observable<AIModel[]> {
    return of([
      {
        id: 'ai1',
        name: 'Question Generator v2.1',
        type: 'Text Generation',
        version: '2.1.0',
        accuracy: 87.5,
        isActive: true,
        trainingData: 'Educational Content Dataset v3',
        lastTrainedAt: new Date('2024-01-20')
      },
      {
        id: 'ai2',
        name: 'Answer Evaluator v1.8',
        type: 'Text Classification',
        version: '1.8.2',
        accuracy: 92.3,
        isActive: true,
        trainingData: 'Assessment Response Dataset v2',
        lastTrainedAt: new Date('2024-01-18')
      }
    ]).pipe(delay(600));
  }

  // Subscription operations
  getSubscriptions(): Observable<Subscription[]> {
    return of([
      {
        id: 'sub1',
        collegeId: 'college1',
        plan: SubscriptionPlan.PREMIUM,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        isActive: true,
        features: ['AI Question Generation', 'Advanced Analytics', 'Custom Branding'],
        maxStudents: 1000,
        maxLecturers: 100
      }
    ]).pipe(delay(600));
  }

  // Generate mock exam results
  getExamResults(): Observable<ExamResult[]> {
    return of([
      {
        id: 'result1',
        examId: 'exam1',
        studentId: '1',
        answers: [
          {
            questionId: 'q1',
            answer: 'A storage location',
            isCorrect: true,
            marksObtained: 10
          }
        ],
        totalMarks: 100,
        obtainedMarks: 85,
        percentage: 85,
        submittedAt: new Date('2024-01-25T14:30:00'),
        evaluatedAt: new Date('2024-01-25T15:00:00'),
        feedback: 'Good performance! Focus on data structures concepts.'
      }
    ]).pipe(delay(600));
  }
}