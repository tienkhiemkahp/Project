import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createGoiCuoc, updateGoiCuoc } from './GoiCuocServices';
import { code, convertDate } from 'src/const';
import { toast } from 'react-toastify';

export default function GoiCuocDialog({ open, handleClose, item, updateData }) {
  const [value, setValue] = React.useState({ listLoaiGoiCuoc: [] });

  const handleChange = (e, source) => {
    if (source) {
      setValue((pre) => ({ ...pre, [source]: e }));
    } else {
      let { name, value } = e.target;
      setValue((pre) => ({ ...pre, [name]: value }));
    }
  };

  React.useEffect(() => {
    setValue((pre) => ({
      ...pre,
      ...item,
      ngayCapNhat: convertDate(item?.ngayCapNhat || new Date()),
      ngayTao: convertDate(item?.ngayTao || new Date()),
    }));
  }, []);

  let convertDataSubmit = (data) => {
    return {
      gia: data?.gia,
      maGoiCuoc: data?.maGoiCuoc,
      tenGoiCuoc: data?.tenGoiCuoc,
      thoiHanSuDung: data?.thoiHanSuDung,
      moTa: data?.moTa,
      ngayCapNhat: convertDate(data?.ngayCapNhat),
      ngayTao: convertDate(data?.ngayTao),
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if (value?.maGoiCuoc) {
        await updateGoiCuoc(payload);
        toast.success('Cập nhật thành công.');
      } else {
        await createGoiCuoc(payload);
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
        <DialogTitle>{value?.maGoiCuoc ? 'Cập nhật' : 'Thêm mới'} gói cước</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="tenGoiCuoc"
            label="Tên gói cước"
            value={value?.tenGoiCuoc}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            type="number"
            name="gia"
            label="Giá cước"
            value={value?.gia}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            type="number"
            name="thoiHanSuDung"
            label="Thời hạn sử dụng"
            value={value?.thoiHanSuDung}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            type="date"
            margin="dense"
            name="ngayTao"
            label="Ngày tạo"
            value={value?.ngayTao}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            type="date"
            margin="dense"
            name="ngayCapNhat"
            label="Ngày cập nhật"
            value={value?.ngayCapNhat}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="moTa"
            label="Mô tả"
            value={value?.moTa}
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
