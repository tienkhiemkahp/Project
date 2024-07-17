import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createNguoiDung, updateNguoiDung } from './TaiKhoanServices';
import { code, convertDate, role } from 'src/const';
import { toast } from 'react-toastify';
import { Autocomplete } from '@mui/material';
import { getAllGoiCuoc } from '../goi-cuoc/GoiCuocServices';

export default function TaiKhoanDialog({ open, handleClose, item, updateData }) {
  const [value, setValue] = React.useState({ listSinhVien: [] });

  const handleChange = (e, source) => {
    if (source) {
      setValue((pre) => ({ ...pre, [source]: e }));
    } else {
      let { name, value } = e.target;
      setValue((pre) => ({ ...pre, [name]: value }));
    }
  };

  const getListOptions = async () => {
    try {
      let data = await getAllGoiCuoc();
      if (data?.status === code.success) {
        setValue((pre) => ({ ...pre, listSinhVien: data?.data }));
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    setValue((pre) => ({
      ...pre,
      ...item,
      ngayTao: convertDate(item?.ngayTao),
      ngayCapNhat: convertDate(item?.ngayCapNhat),
    }));
    getListOptions();
  }, []);

  let convertDataSubmit = (data) => {
    return {
      maNguoiDung: data?.maNguoiDung,
      soDienThoai: data?.soDienThoai,
      matKhau: data?.matKhau,
      email: data?.email,
      hoTen: data?.hoTen,
      soDu: data?.soDu,
      vaiTro: data?.vaiTro,
      ngayTao: data?.ngayTao,
      ngayCapNhat: data?.ngayCapNhat,
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if (value?.maNguoiDung) {
        let data = await updateNguoiDung(payload);
        toast.success('Cập nhật thành công.');
      } else {
        let data = await createNguoiDung(payload);
        toast.success('Thêm mới thành công.');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra.');
    } finally {
      handleClose();
      updateData();
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleFormSubmit();
          },
        }}
      >
        <DialogTitle>{value?.maNguoiDung ? 'Cập nhật' : 'Thêm mới'} tài khoản</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="hoTen"
            label="Họ tên"
            value={value?.hoTen}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="email"
            label="Email"
            value={value?.email}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            type="number"
            name="soDienThoai"
            label="Số điện thoại"
            value={value?.soDienThoai}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            type="number"
            name="soDu"
            label="Số dư"
            value={value?.soDu}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="matKhau"
            label="Mật khẩu"
            value={value?.matKhau}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <Autocomplete
            variant="standard"
            id="combo-box-demo"
            options={role}
            value={value?.vaiTro || item?.vaiTro}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'vaiTro')}
            renderInput={(params) => <TextField {...params} label="Vai trò" variant="standard" />}
          />
          <TextField
            required
            margin="dense"
            type="date"
            name="ngayTao"
            label="Ngày tạo"
            value={value?.ngayTao || new Date()}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            type="date"
            name="ngayCapNhat"
            label="Ngày cấp phát"
            value={value?.ngayCapNhat || new Date()}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Lưu</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
