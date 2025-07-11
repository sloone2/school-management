export class routes {
  private static Url = '';

  public static get baseUrl(): string {
    return this.Url;
  }

  // Instructor Routings

  public static get instructor(): string {
    return this.baseUrl + '/instructor/';
  }
  public static get instructor_dashboard(): string {
    return this.instructor + 'instructor-dashboard';
  }
  public static get instructor_payouts(): string {
    return this.instructor + 'instructor-payouts';
  }
  public static get instructor_tickets(): string {
    return this.instructor + 'instructor-tickets';
  }
  public static get instructorAnnouncements(): string {
    return this.instructor + 'instructor-announcements';
  }
  public static get instructorAssignment(): string {
    return this.instructor + 'instructor-assignment';
  }
  public static get instructorWishlist(): string {
    return this.instructor + 'instructor-wishlist';
  }

  public static get instructorwithdraw(): string {
    return this.instructor + 'instructor-withdraw';
  }
  public static get instructorProfile(): string {
    return this.instructor + 'instructor-profile';
  }
  public static get instructorQuizQuestion(): string {
    return this.instructor + 'instructor-quiz-questions';
  }
  public static get instructorQuiz(): string {
    return this.instructor + 'instructor-quiz';
  }
  public static get instructorCertificate(): string {
    return this.instructor + 'instructor-certificate';
  }
  public static get instructorEarning(): string {
    return this.instructor + 'instructor-earnings';
  }
  public static get instructorStatements(): string {
    return this.instructor + 'instructor-statements';
  }
  public static get instructorTickets(): string {
    return this.instructor + 'instructor-tickets';
  }
  public static get quiz(): string {
    return this.instructor + 'quiz';
  }
  public static get studentsList(): string {
    return this.instructor + 'students-list';
  }
  public static get studentsGrid(): string {
    return this.instructor + 'students-grid';
  }
  public static get studentsDetails(): string {
    return this.instructor + 'students-details';
  }
  public static get instructorQuizResult(): string {
    return this.instructor + 'instructor-quiz-results';
  }
  public static get instructorCourse(): string {
    return this.instructor + 'instructor-course';
  }
  public static get instructorCourseGrid(): string {
    return this.instructor + 'instructor-course-grid';
  }
  public static get instructorMessage(): string {
    return this.instructor + 'instructor-message';
  }
  public static get instructorQuizDetails(): string {
    return this.instructor + 'instructor-quiz-details';
  }

  //instructor settings
  public static get instructorSettingWithdraw(): string {
    return this.instructor + 'settings/instructor-setting-withdraw';
  }
  public static get instructorSettingNotifications(): string {
    return this.instructor + 'settings/instructor-setting-notifications';
  }
  public static get instructorPlans(): string {
    return this.instructor + 'settings/instructor-plans';
  }
  public static get instructorIntegrations(): string {
    return this.instructor + 'settings/instructor-integrations';
  }
  public static get instructorLinkedAccounts(): string {
    return this.instructor + 'settings/instructor-linked-accounts';
  }
  public static get instructorSocialProfiles(): string {
    return this.instructor + 'settings/instructor-social-profiles';
  }
  public static get instructorDeleteAccount(): string {
    return this.instructor + 'settings/instructor-delete-account';
  }
  public static get instructorChangePassword(): string {
    return this.instructor + 'settings/instructor-change-password';
  }
  public static get instructorSettings(): string {
    return this.instructor + 'settings/instructor-settings';
  }
  // Student Routings

  public static get students(): string {
    return this.baseUrl + '/student/';
  }
  public static get students_profile(): string {
    return this.students + 'student-profile';
  }
  public static get students_Dashboard(): string {
    return this.students + 'student-dashboard';
  }

  public static get course_student(): string {
    return this.students + 'course-student';
  }
  public static get student_Certificate(): string {
    return this.students + 'student-certificate';
  }
  public static get student_Wishlist(): string {
    return this.students + 'student-wishlist';
  }
  public static get view_invoice_student(): string {
    return this.students + 'view-invoice';
  }
  public static get transactions_student(): string {
    return this.students + 'transactions-student';
  }
  public static get students_security(): string {
    return this.students + 'setting-student-security';
  }

  public static get students_notification(): string {
    return this.students + 'setting-student-notification';
  }
  public static get students_privacy(): string {
    return this.students + 'setting-student-privacy';
  }
  public static get students_delete(): string {
    return this.students + 'setting-student-delete-profile';
  }
  public static get students_accounts(): string {
    return this.students + 'setting-student-accounts';
  }
  public static get students_referral(): string {
    return this.students + 'student-referral';
  }
  public static get students_subscription(): string {
    return this.students + 'setting-student-subscription';
  }
  public static get students_billing(): string {
    return this.students + 'setting-student-billing';
  }
  public static get students_payments(): string {
    return this.students + 'setting-student-payment';
  }
  public static get students_invoice(): string {
    return this.students + 'setting-student-invoice';
  }
  public static get students_tickets(): string {
    return this.students + 'student-tickets';
  }
  public static get studentsMessage(): string {
    return this.students + 'student-message';
  }
  public static get studentsQuizQuestion(): string {
    return this.students + 'student-quiz-questions';
  }
  public static get studentsQuiz(): string {
    return this.students + 'student-quiz';
  }
  public static get studentProfile(): string {
    return this.students + 'student-profile';
  }
  public static get studentMessages(): string {
    return this.students + 'student-message';
  }
  public static get studentOrderHistory(): string {
    return this.students + 'student-order-history';
  }
  public static get studentWishlist(): string {
    return this.students + 'student-wishlist';
  }
  public static get studentCourses(): string {
    return this.students + 'student-courses';
  }
  public static get studentReviews(): string {
    return this.students + 'student-reviews';
  }
  public static get studentQuizDetails(): string {
    return this.students + 'student-quiz-details';
  }
  public static get studentQuiz(): string {
    return this.students + 'student-quiz';
  }


  //student settings
  public static get studentLinkedAccount(): string {
    return this.students + 'settings/student-linked-accounts';
  }
  public static get studentNotification(): string {
    return this.students + 'settings/student-notifications';
  }
  public static get students_social_profile(): string {
    return this.students + 'settings/student-social-profile';
  }
  public static get studentChangePassword(): string {
    return this.students + 'settings/student-change-password';
  }
  public static get studentSettings(): string {
    return this.students + '/settings/student-settings';
  }
  public static get studentBillingAddress(): string {
    return this.students + '/settings/student-billing-address';
  }



  // Pages Routing

  public static get pages(): string {
    return this.baseUrl + '/pages/';
  }
  public static get page_notifications(): string {
    return this.pages + 'notifications';
  }
  public static get becomeAnExpert(): string {
    return this.pages + 'become-an-instructor';
  }
  public static get testimonial(): string {
    return this.pages + 'testimonial';
  }
  public static get aboutUs(): string {
    return this.pages + 'about-us';
  }
  public static get contactUs(): string {
    return this.pages + 'contact-us';
  }
  public static get page_pricing_plan(): string {
    return this.pages + 'pricing-plan';
  }
  public static get page_faq(): string {
    return this.pages + 'faq';
  }
  public static get page_term_condition(): string {
    return this.pages + 'term-condition';
  }
  public static get page_privacy_policy(): string {
    return this.pages + 'privacy-policy';
  }
  public static get instructorDetails(): string {
    return this.pages + 'instructor-details';
  }
  public static get instructorGrid(): string {
    return this.pages + 'instructor-grid';
  }
  public static get instructorList(): string {
    return this.pages + 'instructor-list';
  }

  
  // Blog routes
  
  public static get blog(): string {
    return this.baseUrl + '/blog/';
  }
  public static get blog_details_left_sidebar(): string {
    return this.blog + 'blog-details-left-sidebar';
  }
  public static get blog_details_right_sidebar(): string {
    return this.blog + 'blog-details-right-sidebar';
  }
  public static get blog_details(): string {
    return this.blog + 'blog-details';
  }
  public static get blog_masonry(): string {
    return this.blog + 'blog-masonry';
  }
  public static get blog_grid(): string {
    return this.blog + 'blog-grid';
  }
  public static get blog_grid2(): string {
    return this.blog + 'blog-2-grid';
  }
  public static get blog_grid3(): string {
    return this.blog + 'blog-3-grid';
  }
  public static get blog_carousal(): string {
    return this.blog + 'blog-carousal';
  }
  public static get blog_left_sidebar(): string {
    return this.blog + 'blog-left-sidebar';
  }
  public static get blog_right_sidebar(): string {
    return this.blog + 'blog-right-sidebar';
  }

  // Auth Routes

  public static get auth(): string {
    return this.baseUrl + '/auth/';
  }
  public static get forgot_password(): string {
    return this.auth + 'forgot-password';
  }
  public static get login(): string {
    return this.auth + 'login';
  }
  public static get register(): string {
    return this.auth + 'register';
  }
  public static get setPassword(): string {
    return this.auth + 'set-password';
  }
  public static get otp(): string {
    return this.auth + 'otp';
  }
  public static get lockScreen(): string {
    return this.auth + 'lock-screen';
  }

  // Error Routes

  public static get error(): string {
    return this.baseUrl + '/error/';
  }
  public static get under_construction(): string {
    return this.error + 'under-construction';
  }
  public static get error_500(): string {
    return this.error + '500';
  }
  public static get comming_soon(): string {
    return this.error + 'coming-soon';
  }
  public static get error_404(): string {
    return this.error + '404';
  }

  // Home Routes


  public static get home(): string {
    return this.baseUrl + '/index';
  }
  public static get home2(): string {
    return this.baseUrl + '/index-two';
  }
  public static get home3(): string {
    return this.baseUrl + '/index-three';
  }
  public static get home4(): string {
    return this.baseUrl + '/index-four';
  }
  public static get home5(): string {
    return this.baseUrl + '/index-five';
  }
  public static get home6(): string {
    return this.baseUrl + '/index-six';
  }


  //courses
  public static get courses(): string {
    return this.baseUrl + '/courses';
  }
  public static get courseGrid(): string {
    return this.courses + '/course-grid';
  }
  public static get courseList(): string {
    return this.courses + '/course-list';
  }
  public static get courseCategory(): string {
    return this.courses + '/course-category';
  }
  public static get courseCategory2(): string {
    return this.courses + '/course-category-2';
  }
  public static get courseCategory3(): string {
    return this.courses + '/course-category-3';
  }
  public static get courseResume(): string {
    return this.courses + '/course-resume';
  }
  public static get courseWatch(): string {
    return this.courses + '/course-watch';
  }
  public static get cart(): string {
    return this.courses + '/cart';
  }
  public static get checkout(): string {
    return this.courses + '/checkout';
  }
  public static get courseDetails(): string {
    return this.courses + '/course-details';
  }
  public static get courseDetails2(): string {
    return this.courses + '/course-details-2';
  }
  public static get addCourse(): string {
    return this.courses + '/add-course';
  }
}


