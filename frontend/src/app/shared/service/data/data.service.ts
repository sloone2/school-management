import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { routes } from '../routes/routes';

import {
  courseList,
  courseGrid,
  allInstructorList,
  allInstructorGrid,
  instructorTicket1,
  instructorTicket4,
  instructorTicket2,
  instructorTicket3,
  latestTransaction,
  apiResultFormat,
} from 'src/app/models/model';
import { Base } from 'primeng/base';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  messages = '';
  message: BehaviorSubject<string>;
  constructor(private http: HttpClient) {
    this.message = new BehaviorSubject(this.messages);
  }
  nextmessage(data: string) {
    this.message.next(data);
  }
  public getInstructorCourseList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/instructorCourseList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInstructorAnnouncement(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/instructor-announcements.json').pipe
    (map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getInstructorAssignment(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/instructor-assignment.json').pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getInstructorGroups(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/instructor-groups.json').pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  // Backend API methods for groups
  public getGroupsFromAPI(): Observable<any> {
    return this.http.get<any>('/api/groups');
  }

  public createGroup(groupData: any): Observable<any> {
    return this.http.post<any>('/api/groups', groupData);
  }

  public updateGroup(id: string, groupData: any): Observable<any> {
    return this.http.patch<any>(`/api/groups/${id}`, groupData);
  }

  public deleteGroup(id: string): Observable<any> {
    return this.http.delete<any>(`/api/groups/${id}`);
  }

  public getGroupById(id: string): Observable<any> {
    return this.http.get<any>(`/api/groups/${id}`);
  }
  public getInstructorQuizResult(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/instructor-quiz-result.json').pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPayout(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/payouts.json').pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getStudentList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/studentList.json').pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getInstructionStatement(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/instruction-statement.json').pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getInstructionTicket(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/instructor-ticket.json').pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getInstructionPlan(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/instruction-plan.json').pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getStudentOrderHistory(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/student-order-history.json').pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getStudentRefferal(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/student-refferal.json').pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public allCourseList(): Observable<courseList> {
    return this.http.get<courseList>('assets/JSON/courseList.json').pipe(
      map((res: courseList) => {
        return res;
      })
    );
  }
  public gridCourseList(): Observable<courseGrid> {
    return this.http.get<courseGrid>('assets/JSON/courseGrid.json').pipe(
      map((res: courseGrid) => {
        return res;
      })
    );
  }
  public allInstructorList(): Observable<allInstructorList> {
    return this.http
      .get<allInstructorList>('assets/JSON/allInstructorList.json')
      .pipe(
        map((res: allInstructorList) => {
          return res;
        })
      );
  }
  public allInstructorGrid(): Observable<allInstructorGrid> {
    return this.http
      .get<allInstructorGrid>('assets/JSON/allInstructorGrid.json')
      .pipe(
        map((res: allInstructorGrid) => {
          return res;
        })
      );
  }
  public instructorTicket1(): Observable<instructorTicket1> {
    return this.http
      .get<instructorTicket1>('assets/JSON/instructorTicket1.json')
      .pipe(
        map((res: instructorTicket1) => {
          return res;
        })
      );
  }
  public instructorTicket4(): Observable<instructorTicket4> {
    return this.http
      .get<instructorTicket4>('assets/JSON/instructorTicket4.json')
      .pipe(
        map((res: instructorTicket4) => {
          return res;
        })
      );
  }
  public instructorTicket2(): Observable<instructorTicket2> {
    return this.http
      .get<instructorTicket2>('assets/JSON/instructorTicket2.json')
      .pipe(
        map((res: instructorTicket2) => {
          return res;
        })
      );
  }
  public instructorTicket3(): Observable<instructorTicket3> {
    return this.http
      .get<instructorTicket3>('assets/JSON/instructorTicket3.json')
      .pipe(
        map((res: instructorTicket3) => {
          return res;
        })
      );
  }
  public latestTransactionsList(): Observable<latestTransaction> {
    return this.http
      .get<latestTransaction>('assets/JSON/latestTransaction.json')
      .pipe(
        map((res: latestTransaction) => {
          return res;
        })
      );
  }



  public InstructorWithdraw(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/instructor-withdraw.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public welcomeLogin = [
    {
      img: 'assets/img/auth/auth-1.svg',
      content1: 'Welcome to',
      content2: 'Dreams',
      content3: 'LMS',
      content4: 'Courses.',
      paragraph: 'Platform designed to help organizations, educators, and learners manage, deliver, and track learning and training activities.',
    },
    {
      img: 'assets/img/auth/auth-1.svg',
      content1: 'Welcome to',
      content2: 'Dreams',
      content3: 'LMS',
      content4: 'Courses.',
      paragraph: 'Platform designed to help organizations, educators, and learners manage, deliver, and track learning and training activities.',
    },
    {
      img: 'assets/img/auth/auth-1.svg',
      content1: 'Welcome to',
      content2: 'Dreams',
      content3: 'LMS',
      content4: 'Courses.',
      paragraph: 'Platform designed to help organizations, educators, and learners manage, deliver, and track learning and training activities.',
    },
    
  ];


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public sideBar: Array<any> = [
    {
      tittle: 'Home',
      base: 'index',
      base2: 'index-two',
      base3: 'index-three',
      base4: 'index-four',
      base5: 'index-five',
      base6: 'index-six',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Home',
          route: routes.home,
          img:'home-01.jpg',
          hasSubRoute: false,
          showSubRoute: false,
          base: 'index',
          subMenus: [],
        },
        {
          menuValue: 'Home Two',
          route: routes.home2,
          img:'home-02.jpg',
          hasSubRoute: false,
          showSubRoute: false,
          base: 'index-two',
          subMenus: [],
        },
        {
          menuValue: 'Home Three',
          img:'home-03.jpg',
          route: routes.home3,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'index-three',
          subMenus: [],
        },
        {
          menuValue: 'Home Four',
          route: routes.home4,
          img:'home-04.jpg',
          hasSubRoute: false,
          showSubRoute: false,
          base: 'index-four',
          subMenus: [],
        },
        {
          menuValue: 'Home Five',
          img:'home-05.jpg',
          route: routes.home5,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'index-five',
          subMenus: [],
        },
        {
          menuValue: 'Home Six',
          route: routes.home6,
          img:'home-06.jpg',
          hasSubRoute: false,
          showSubRoute: false,
          base: 'index-six',
          subMenus: [],
        },
      ],
    },
    {
      tittle: "Courses",
      base: "courses",
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: "Course",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          base:'course-grid',
          base1:'course-list',
          base2:'',
          base3:'',
          base4:'',
          base5:'',
          base6:'',
          base7:'',
          subMenus: [
            {
              menuValue: "Course Grid",
              route: routes.courseGrid,
              page: 'course-grid',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Course List",
              route: routes.courseList,
              page: 'course-list',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
          ],
        },
        {
          menuValue: "Course Category",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          base:'course-category',
          base1:'course-category-2',
          base2:'course-category-3',
          base3:'',
          base4:'',
          base5:'',
          base6:'',
          base7:'',
          subMenus: [
            {
              menuValue: "Course Category",
              route: routes.courseCategory,
              page: 'course-category',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Course Category 2",
              route: routes.courseCategory2,
              page: 'course-category-2',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Course Category 3",
              route: routes.courseCategory3,
              page: 'course-category-3',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
          ],
        },
        {
          menuValue: "Course Details",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          base:'course-details',
          base1:'course-details',
          base2:'',
          base3:'',
          base4:'',
          base5:'',
          base6:'',
          base7:'',
          subMenus: [
            {
              menuValue: "Course Details",
              route: routes.courseDetails,
              page:'course-details',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Course Details 2",
              route: routes.courseDetails2,
              page:'course-details-2',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
          ],
        },
        {
          menuValue: "Course Resume",
          route: routes.courseResume,
          page:'course-resume',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Course Watch",
          route: routes.courseWatch,
          page:'course-watch',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Course Cart",
          route: routes.cart,
          page:'cart',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Course Checkout",
          route: routes.checkout,
          page:'checkout',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Add Course",
          route: routes.addCourse,
          hasSubRoute: false,
          showSubRoute: false,
          page: "courses",
          subMenus: [],
        },
      ],
    },
    {
      tittle: "Dashboard",
      base:"instructor",
      base2:"student",
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: "Instructor",
          hasSubRoute: true,
          showSubRoute: true,
          base:'instructor-dashboard',
          base1:'instructor-profile',
          base2:'instructor-course',
          base3:'instructor-announcements',
          base4:'instructor-assignment',
          base5:'students-grid',
          base6:'instructor-quiz',
          base7:'instructor-quiz-results',
          base8:'instructor-certificate',
          base9:'instructor-earnings',
          base10:'instructor-payouts',
          base11:'instructor-statements',
          base12:'instructor-tickets',
          base14:'students-list',
          base15:'students-details',
          showAsTab2: false,
          subMenus: [
            {
              menuValue: "Dashboard",
              route: routes.instructor_dashboard,
              page:'instructor-dashboard',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "My Profile",
              route: routes.instructorProfile,
              page:'instructor-profile',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Course",
              route: routes.instructorCourse,
              page:'instructor-course',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Announcements",
             route: routes.instructorAnnouncements,
             page:'instructor-announcements',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Assignment",
              route: routes.instructorAssignment,
              page:'instructor-assignment',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Student",
              hasSubRoute: true,
              showSubRoute: true,
              showAsTab2: false,
              page:'students-grid',
              page1:'students-list',
              page2:'students-details',
              subMenus: [
                {
                  menuValue: "Student Grid",
                  route: routes.studentsGrid,
                  page:"students-grid",
                  hasSubRoute: false,
                   showSubRoute: false,
                  subMenus: [],
                },
                {
                  menuValue: "Student List",
                 route: routes.studentsList,
                 page:"students-list",
                  hasSubRoute: false,
                  showSubRoute: false,
                  subMenus: [],
                },
                {
                  menuValue: "Student Details",
                 route: routes.studentsDetails,
                 page:"students-details",
                  hasSubRoute: false,
                  showSubRoute: false,
                  subMenus: [],
                },
              ],
            },
            {
              menuValue: "Quiz",
              route: routes.instructorQuiz,
              page:'instructor-quiz',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Quiz Results",
             route: routes.instructorQuizResult,
             page:'instructor-quiz-results',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Certificate",
             route: routes.instructorCertificate,
             page:'instructor-certificate',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Earning",
             route: routes.instructorEarning,
             page:'instructor-earnings',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
  
            {
              menuValue: "Payout",
             route: routes.instructor_payouts,
             page:'instructor-payouts',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Statement",
             route: routes.instructorStatements,
             page:'instructor-statements',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
  
            {
              menuValue: "Support Ticket",
              route: routes.instructorTickets,
              page:'instructor-tickets',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Settings",
              route: routes.instructorSettings,
              page:'settings',
              last:'instructor-settings', 
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
          ],
        },
        {
          menuValue: "Student",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          base:'student-dashboard',
          base1:'student-profile',
          base2:'student-courses',
          base3:'student-certificate',
          base4:'student-wishlist',
          base5:'student-reviews',
          base6:'student-quiz',
          base7:'student-order-history',
          base8:'student-referral',
          base9:'student-message',
          base10:'student-tickets',
          subMenus: [
            {
              menuValue: "Student Dashboard",
              route: routes.students_Dashboard,
              page:'student-dashboard',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "My Profile",
              route: routes.studentProfile,
              page:'student-profile',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Enrolled Course",
              route: routes.studentCourses,
              page:'student-courses',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "My Certificates",
              route: routes.student_Certificate,
              page:'student-certificate',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Wishlist",
              route: routes.student_Wishlist,
              page:'student-wishlist',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
  
            {
              menuValue: "Reviews",
              route: routes.studentReviews,
              page:'student-reviews',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "My Quiz Attempts",
              route: routes.studentQuiz,
              page:'student-quiz',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
  
            {
              menuValue: "Order History",
              route: routes.studentOrderHistory,
              page:'student-order-history',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Referrals",
              route: routes.students_referral,
              page:'student-referral',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Messages",
              route: routes.studentsMessage,
              page:'student-message',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Support Ticket",
              route: routes.students_tickets,
              page:'student-tickets',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Settings",
              route: routes.studentSettings,
              page:'settings',
              last:'student-settings',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
          ],
        },
      ],
    },
    {
      tittle: "Pages",
      showAsTab: false,
      separateRoute: false,
      base:'pages',
      base3:'about-us',
      menu: [
        {
          menuValue: "Instructors",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          base:'instructor-grid',
          base1:'instructor-list',
          base2:'instructor-details',
          base3:'',
          base4:'',
          base5:'',
          base6:'',
          base7:'',
          subMenus: [
            {
              menuValue: "Instructor Grid",
              route: routes.instructorGrid,
              page:'instructor-grid',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Instructor List",
              route: routes.instructorList,
              page:'instructor-list',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Instructor Details",
              route: routes.instructorDetails,
              page:'instructor-details',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
          ],
        },
        {
          menuValue: "About Us",
          route: routes.aboutUs,
          page:'about-us',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Contact Us",
          route: routes.contactUs,
          page:'contact-us',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Notification",
          route: routes.page_notifications,
          page:'notifications',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Become an Instructor",
          route: routes.becomeAnExpert,
          page:'become-an-expert',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Testimonials",
          route: routes.testimonial,
          page:'testimonial',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Authentication",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          base:'login',
          base1:'register',
          base2:'forgot-password',
          base3:'set-password',
          base4:'otp',
          base5:'lock-screen',
          base6:'',
          base7:'',
          subMenus: [
            {
              menuValue: "Login",
              route: routes.login,
              page:'login',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Register",
              route: routes.register,
              page:'register',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Forgot Password",
              route: routes.forgot_password,
              page:'forgot-password',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Set Password",
              route: routes.setPassword,
              page:'set-password',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "OTP",
              route: routes.otp,
              page:'otp',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Lock Screen",
              route: routes.lockScreen,
              page:'lock-screen',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
          ],
        },
        {
          menuValue: "Error",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          base:'404',
          base1:'500',
          base2:'',
          base3:'',
          base4:'',
          base5:'',
          base6:'',
          base7:'',
          subMenus: [
            {
              menuValue: "404 Error",
              route: routes.error_404,
              page:'404',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "500 Error",
              route: routes.error_500,
              page:'500',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
          ],
        },
        {
          menuValue: "Pricing Plan",
          route: routes.page_pricing_plan,
          page:'pricing-plan',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "FAQ",
          route: routes.page_faq,
          page:'faq',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Comming Soon",
          route: routes.comming_soon,
          page:'coming-soon',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Under Construction",
          route: routes.under_construction,
          page:'under-construction',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Terms & Conditions",
          route: routes.page_term_condition,
          page:'term-condition',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Privacy Policy",
          route: routes.page_privacy_policy,
          page:'privacy-policy',
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
      ],
    },
    {
      tittle: "Blog",
      showAsTab: false,
      separateRoute: false,
      base:'blog',
      menu: [
        {
          menuValue: "Blog Layouts",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          base:'blog-grid',
          base1:'blog-2-grid',
          base2:'blog-3-grid',
          base3:'blog-carousal',
          base4:'blog-masonry',
          base5:'blog-left-sidebar',
          base6:'blog-right-sidebar',
          base7:'',
          subMenus: [
            {
              menuValue: "Blog 1 Grid",
              route: routes.blog_grid,
              page:'blog-grid',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Blog 2 Grid",
              route: routes.blog_grid2,
              page:'blog-2-grid',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Blog 3 Grid",
              route: routes.blog_grid3,
              page:'blog-3-grid',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Blog Carousal",
              route: routes.blog_carousal,
              page:'blog-carousal',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Blog Mansory",
              route: routes.blog_masonry,
              page:'blog-masonry',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Blog Left Sidebar",
              route: routes.blog_left_sidebar,
              page:'blog-left-sidebar',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Blog Right Sidebar",
              route: routes.blog_right_sidebar,
              page:'blog-right-sidebar',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
          ],
        },
        {
          menuValue: "Blog Details",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          base:'blog-details',
          base1:'blog-details-left-sidebar',
          base2:'blog-details-right-sidebar',
          base3:'',
          base4:'',
          base5:'',
          base6:'',
          base7:'',
          subMenus: [
            {
              menuValue: "Blog Details",
              route: routes.blog_details,
              page:'blog-details',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Blog Details Sidebar Left",
              route: routes.blog_details_left_sidebar,
              page:'blog-details-left-sidebar',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
            {
              menuValue: "Blog Details Sidebar Right",
              route: routes.blog_details_right_sidebar,
              page:'blog-details-right-sidebar',
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
          ],
        },
      ],
    },
  ];

}
