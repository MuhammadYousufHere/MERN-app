import dashboard from '../../assets/icons/dashboard.svg';
// import datas from '../../assets/icons/datas.svg';
import lock from '../../assets/icons/lock.svg';
import project from '../../assets/icons/project.svg';
// import send from '../../assets/icons/send.svg';
import user from '../../assets/icons/user.svg';
import rocket from '../../assets/icons/rocket.svg';

export const SidebarData = [
  {
    title: 'Developers',
    icon: dashboard,
    iconLock: lock,

    link: '/developers',
  },
  {
    title: 'Register',
    icon: user,
    iconLock: lock,

    link: '/signup',
  },
  {
    title: 'Login',
    icon: rocket,
    iconLock: lock,
    link: '/signin',
  },
  // {
  //     title: 'Logout',
  //     icon: project,
  //     iconLock: lock,

  //     link: '/',
  // },
  // {
  //     title: 'Reports',
  //     icon: datas,
  //     iconLock: lock,
  //     link: '/user-screen',
  // },
  // {
  //     title: 'Messages',
  //     icon: send,
  //     iconLock: lock,
  //     link: '/admin',
  // },
];
