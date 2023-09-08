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
    path: '/process',
    title: 'Quản lý tiến độ',
    icon: 'trending_up_outline'
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
    path: '/topics',
    title: 'Quản lý đề tài',
    icon: 'info'
  },

];

export const routesInfoAdmin: RouteInfo[] = [
  {
    path: 'admin/manage-account',
    title: 'Quản lý tài khoản',
    icon: 'manage_accounts'
  }
]

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}
