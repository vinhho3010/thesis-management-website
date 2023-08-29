export const routesInfo: RouteInfo[] = [
  {
    path: '/class',
    title: 'Trang chủ',
    icon: 'home_outline'
  },
  {
    path: '/class',
    title: 'Lớp học',
    icon: 'book_outline'
  },
  {
    path: '/process',
    title: 'Tiến độ thực hiện',
    icon: 'trending_up_outline'
  },
  {
    path: '/students',
    title: 'Danh sách sinh viên',
    icon: 'people_outline'
  },
  {
    path: '/milestone',
    title: 'Mốc thời gian',
    icon: 'schedule_outline'
  },
  {
    path: '/topics',
    title: 'Danh sách đề tài',
    icon: 'info'
  },

];

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}
