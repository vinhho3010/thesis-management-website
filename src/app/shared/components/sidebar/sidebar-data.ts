export const routesInfo: RouteInfo[] = [
  {
    path: '/home',
    title: 'Trang chủ',
    icon: 'home_outline'
  },
  {
    path: '/class',
    title: 'Quản lý lớp học',
    icon: 'book_outline'
  },
  {
    path: '/students',
    title: 'Danh sách sinh viên',
    icon: 'people_outline'
  },
  {
    path: '/milestones',
    title: 'Quản lý mốc thời gian',
    icon: 'schedule_outline'
  },
  {
    path: '/register-topic',
    title: 'Đăng ký đề tài',
    icon: 'assignment'
  },
  {
    path: '/process',
    title: 'Thực hiện luận văn',
    icon: 'trending_up_outline'
  },
  {
    path: '/my-thesis',
    title: 'Luận văn của tôi',
    icon: 'assignment'
  }

];

export const routesInfoAdmin: RouteInfo[] = [
  {
    path: 'admin/manage-account',
    title: 'Quản lý tài khoản',
    icon: 'manage_accounts'
  }
]

export const routesInfoTeacher: RouteInfo[] = [
  {
    path: '/home',
    title: 'Trang chủ',
    icon: 'home_outline'
  },
  {
    path: '/class',
    title: 'Quản lý lớp học',
    icon: 'book_outline'
  },
  {
    path: '/students',
    title: 'Danh sách sinh viên',
    icon: 'people_outline'
  },
  {
    path: '/milestones',
    title: 'Quản lý mốc thời gian',
    icon: 'schedule_outline'
  },
];

export const routesInfoStudent: RouteInfo[] = [
  {
    path: '/home',
    title: 'Trang chủ',
    icon: 'home_outline'
  },
  {
    path: '/class',
    title: 'Lớp học',
    icon: 'book_outline'
  },
  {
    path: '/register-topic',
    title: 'Đăng ký đề tài',
    icon: 'assignment'
  },
  {
    path: '/process',
    title: 'Thực hiện luận văn',
    icon: 'trending_up_outline'
  },
  {
    path: '/my-thesis',
    title: 'Luận văn của tôi',
    icon: 'assignment'
  }
];

export const routesInfoMinistry: RouteInfo[] = [
  {
    path: 'ministry/class-list',
    title: 'Danh sách lớp luận văn',
    icon: 'book_outline'
  },
  {
    path: 'ministry/public-thesis',
    title: 'Luận văn công khai',
    icon: 'assignment'
  },
  {
    path: 'ministry/council',
    title: 'Danh sách hội đồng',
    icon: 'people_outline'
  }
];

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}
