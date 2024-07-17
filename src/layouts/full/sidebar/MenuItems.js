import {
  IconAddressBook,
  IconAperture,
  IconAtom,
  IconBoxPadding,
  IconBrandAsana,
  IconBuildingBank,
  IconCash,
  IconCopy,
  IconHome2,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconNotebook,
  IconRegistered,
  IconSchool,
  IconTypography,
  IconUserPlus,
  IconUsers,
  IconUserSearch,
  IconVocabulary,
} from '@tabler/icons';

import { uniqueId } from 'lodash';
import { role } from 'src/const';

const Menuitems = () => {
  let isRoleNguoiDung = JSON.parse(sessionStorage.getItem('user'))?.vaiTro === role[0];
  return [
    {
      id: uniqueId(),
      // hidden: isRoleNguoiDung,
      title: 'Dịch vụ',
      icon: IconBrandAsana,
      href: '/dich-vu',
    },
    {
      id: uniqueId(),
      hidden: isRoleNguoiDung,
      title: 'Tài khoản',
      icon: IconUserSearch,
      href: '/tai-khoan',
    },
    {
      id: uniqueId(),
      // hidden: isRoleNguoiDung,
      title: 'Gói cước',
      icon: IconUsers,
      href: '/goi-cuoc',
    },
    {
      id: uniqueId(),
      hidden: !isRoleNguoiDung,
      title: 'Lịch sử đăng ký',
      icon: IconAperture,
      href: '/lich-su-dang-ky',
    },
    {
      id: uniqueId(),
      // hidden: !isRoleNguoiDung,
      title: 'Kênh chat',
      icon: IconAperture,
      href: '/chat-page',
    },
  ];
};

export default Menuitems;
