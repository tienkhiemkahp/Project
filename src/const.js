export const code = {
  success: 200,
};
export const role = ['nguoi_dung', 'quan_tri'];
export const typeService = ['nhac_cho', 'khong_lam_phien'];
export const statusService = ['kich_hoat', 'khong_kich_hoat'];
export const typeServiceTxt = ['Nhạc chờ', 'Không làm phiền'];
export const statusServiceTxt = ['Kích hoạt', 'Không kích hoạt'];

export const convertDate = (date, isVn) => {
  const newDate = new Date(date);
  const day = String(newDate?.getDate())?.padStart(2, '0');
  const month = String(newDate?.getMonth() + 1)?.padStart(2, '0');
  const year = String(newDate?.getFullYear());
  if (date) {
    if (isVn) {
      return date ? `${day}-${month}-${year}` : '';
    } else {
      return date ? `${year}-${month}-${day}` : '';
    }
  }
  return '';
};

export const formatCost = (num) => {
  const numberFormat = new Intl.NumberFormat('en-US');
  return num ? numberFormat.format(num) : 0;
};
